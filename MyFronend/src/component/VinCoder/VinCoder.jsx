import React, { useState } from "react";
import axios from "axios";
import "./VinCoder.css";

const VinCoder = () => {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "ec3bfd80a222";
  const secretKey = "951063f779";
  const apiPrefix = "https://api.vindecoder.eu/3.2";

  const handleCheckVin = async () => {
    const formattedVin = vin.trim().toUpperCase();
    const id = "decode";
    const toHash = `${formattedVin}|${id}|${apiKey}|${secretKey}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(toHash);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const controlSum = hashHex.substring(0, 10);

    const url = `${apiPrefix}/${apiKey}/${controlSum}/decode/${formattedVin}.json`;

    try {
      const response = await axios.get(url);
      setResult(response.data);
      setError("");
    } catch (err) {
      setError("Помилка при запиті або VIN недійсний");
      setResult(null);
    }
  };

  const renderDecodeData = (data) => {
    return data.map((item, index) => (
      <div key={index} className="decode-item">
        <div className="label">{item.label}:</div>
        <div className="value">
          {Array.isArray(item.value) ? item.value.join(", ") : item.value}
        </div>
      </div>
    ));
  };

  return (
    <div className="vin-coder-container">
      <div>
        <input
          type="text"
          placeholder="Введіть VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button onClick={handleCheckVin}>Провірити VIN</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result-container">
          <h3>Результат:</h3>

          <div className="result-section">
            <div className="section-title">Price Information</div>
            <div className="result-item">
              <div className="label">Price:</div>
              <div className="value">
                {result.price} {result.price_currency}
              </div>
            </div>
          </div>

          <div className="result-section">
            <div className="section-title">Balance</div>
            {Object.keys(result.balance).map((key, index) => (
              <div key={index} className="result-item">
                <div className="label">{key}:</div>
                <div className="value">{result.balance[key]}</div>
              </div>
            ))}
          </div>

          <div className="result-section">
            <div className="section-title">Vehicle Information</div>
            {renderDecodeData(result.decode)}
          </div>
        </div>
      )}
    </div>
  );
};

export default VinCoder;
