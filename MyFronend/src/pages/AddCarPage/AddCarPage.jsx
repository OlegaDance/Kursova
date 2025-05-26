import React, { useState } from "react";
import axios from "axios";
import "./AddCarPage.css";

const AddCarForm = () => {
  const [vinCode, setVinCode] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [productType, setProductType] = useState("");
  const [body, setBody] = useState("");
  const [trim, setTrim] = useState("");
  const [series, setSeries] = useState("");
  const [drive, setDrive] = useState("");
  const [engineDisplacement, setEngineDisplacement] = useState("");
  const [fuelTypePrimary, setFuelTypePrimary] = useState("");
  const [engineModel, setEngineModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [plantCompany, setPlantCompany] = useState("");
  const [plantCountry, setPlantCountry] = useState("");
  const [plantState, setPlantState] = useState("");
  const [fuelConsumptionExtraUrban, setFuelConsumptionExtraUrban] = useState("");
  const [fuelConsumptionUrban, setFuelConsumptionUrban] = useState("");
  const [numberOfDoors, setNumberOfDoors] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [checkDigit, setCheckDigit] = useState("");
  const [sequentialNumber, setSequentialNumber] = useState("");
  const [price, setPrice] = useState("");
  const [photoPaths, setPhotoPaths] = useState([]);
  const [error, setError] = useState("");
  const [isVinCode, setIsVinCode] = useState(false);
  const [result, setResult] = useState(null);

  const apiKey = "ec3bfd80a222";
  const secretKey = "951063f779";
  const apiPrefix = "https://api.vindecoder.eu/3.2";

  const handleCheckVin = async () => {
    const formattedVin = vinCode.trim().toUpperCase();
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

  const handleSubmit = async (e) => {
    e.preventDefault();  // Запобігаємо стандартній поведінці форми
    
    const formData = new FormData();
  
    // Додаємо поля з форми
    formData.append("vinCode", vinCode);
    formData.append("vehicleId", vehicleId);
    formData.append("make", result?.make || make);
    formData.append("model", result?.model || model);
    formData.append("modelYear", result?.year || modelYear);
    formData.append("productType", productType);
    formData.append("body", body);
    formData.append("trim", trim);
    formData.append("series", series);
    formData.append("drive", drive);
    formData.append("engineDisplacement", engineDisplacement);
    formData.append("fuelTypePrimary", fuelTypePrimary);
    formData.append("engineModel", engineModel);
    formData.append("manufacturer", manufacturer);
    formData.append("manufacturerAddress", manufacturerAddress);
    formData.append("plantCompany", plantCompany);
    formData.append("plantCountry", plantCountry);
    formData.append("plantState", plantState);
    formData.append("fuelConsumptionExtraUrban", fuelConsumptionExtraUrban);
    formData.append("fuelConsumptionUrban", fuelConsumptionUrban);
    formData.append("numberOfDoors", numberOfDoors);
    formData.append("maxWeight", maxWeight);
    formData.append("checkDigit", checkDigit);
    formData.append("sequentialNumber", sequentialNumber);
    formData.append("price", price);
  
    // Перетворення FileList на масив і додавання файлів
    Array.from(photoPaths).forEach((file) => {
        formData.append("photoPaths", file);
    });
  
    try {
		const response = await fetch("http://localhost:5158/api/cars", {
			method: "POST",
			body: formData,
			headers: {},
		  });

        if (response.ok) {
            alert("Автомобіль успішно додано!");
        } else {
            alert("Помилка при додаванні автомобіля");
        }
    } catch (error) {
        console.error("Помилка при запиті:", error);
    }
};
  

  return (
    <div className="add-car-form">
      <h2>Додати автомобіль</h2>

      <div>
        <label>
          <input
            type="radio"
            checked={isVinCode}
            onChange={() => setIsVinCode(true)}
          />
          Додати через VIN
        </label>
        <label>
          <input
            type="radio"
            checked={!isVinCode}
            onChange={() => setIsVinCode(false)}
          />
          Додати вручну
        </label>
      </div>

      {isVinCode && (
        <div>
          <input
            type="text"
            placeholder="Введіть VIN"
            value={vinCode}
            onChange={(e) => setVinCode(e.target.value)}
          />
          <button onClick={handleCheckVin}>Додати через VIN</button>
        </div>
      )}

      {result && isVinCode && (
        <div className="vin-result">
          <h3>Результат декодування VIN:</h3>
          <div>Марка: {result.make}</div>
          <div>Модель: {result.model}</div>
          <div>Рік: {result.year}</div>
          <div>Тип палива: {result.fuel_type}</div>
          <div>Об'єм двигуна: {result.engine_displacement}</div>
          <div>
            Ціна: {result.price} {result.price_currency}
          </div>
        </div>
      )}

      {!isVinCode && (
        <div>
          <input
            type="text"
            placeholder="Марка"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <input
            type="text"
            placeholder="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            type="number"
            placeholder="Рік"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
          />
          <input
            type="text"
            placeholder="Тип продукту"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Тип кузова"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            type="text"
            placeholder="Трим"
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
          />
          <input
            type="text"
            placeholder="Серія"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          />
          <input
            type="text"
            placeholder="Привід"
            value={drive}
            onChange={(e) => setDrive(e.target.value)}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Об'єм двигуна"
            value={engineDisplacement}
            onChange={(e) => setEngineDisplacement(e.target.value)}
          />
          <input
            type="text"
            placeholder="Тип палива"
            value={fuelTypePrimary}
            onChange={(e) => setFuelTypePrimary(e.target.value)}
          />
          <input
            type="text"
            placeholder="Модель двигуна"
            value={engineModel}
            onChange={(e) => setEngineModel(e.target.value)}
          />
          <input
            type="text"
            placeholder="Виробник"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Адреса виробника"
            value={manufacturerAddress}
            onChange={(e) => setManufacturerAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Компанія заводу"
            value={plantCompany}
            onChange={(e) => setPlantCompany(e.target.value)}
          />
          <input
            type="text"
            placeholder="Країна заводу"
            value={plantCountry}
            onChange={(e) => setPlantCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Штат заводу"
            value={plantState}
            onChange={(e) => setPlantState(e.target.value)}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Розхід палива (місто)"
            value={fuelConsumptionUrban}
            onChange={(e) => setFuelConsumptionUrban(e.target.value)}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Розхід палива (за містом)"
            value={fuelConsumptionExtraUrban}
            onChange={(e) => setFuelConsumptionExtraUrban(e.target.value)}
          />
          <input
            type="number"
            placeholder="Кількість дверей"
            value={numberOfDoors}
            onChange={(e) => setNumberOfDoors(e.target.value)}
          />
          <input
            type="number"
            placeholder="Максимальна вага"
            value={maxWeight}
            onChange={(e) => setMaxWeight(e.target.value)}
          />
          <input
            type="text"
            placeholder="Контрольна цифра"
            value={checkDigit}
            onChange={(e) => setCheckDigit(e.target.value)}
          />
          <input
            type="text"
            placeholder="Послідовний номер"
            value={sequentialNumber}
            onChange={(e) => setSequentialNumber(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      )}

      <div>
        <label htmlFor="photoPaths">Фото автомобіля:</label>
        <input
          id="photoPaths"
          type="file"
          multiple
          onChange={(e) => setPhotoPaths(e.target.files)}
        />
      </div>

      <button onClick={handleSubmit}>Додати автомобіль</button>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default AddCarForm;
