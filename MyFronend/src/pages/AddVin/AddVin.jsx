import React, { useState } from 'react';
import axios from 'axios';

const AddVin = () => {
  const [vin, setVin] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [price, setPrice] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [modelYear, setModelYear] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const apiKey = "ec3bfd80a222";
  const secretKey = "951063f779";
  const apiPrefix = "https://api.vindecoder.eu/3.2";

  // Функція для отримання value за label з result.decode
  const getValue = (label) => result?.decode?.find(i => i.label === label)?.value || null;

  // Функція для заміни пустих значень на "1" (для тексту) або 1 (для чисел)
  const normalizeValue = (value, isNumber = false) => {
    if (value === null || value === undefined || value === "") {
      return isNumber ? 1 : "1";
    }
    return value;
  };

  const handleCheckVin = async () => {
    if (!vin.trim()) {
      setError("Введіть VIN");
      return;
    }

    const formattedVin = vin.trim().toUpperCase();
    const id = "decode";
    const toHash = `${formattedVin}|${id}|${apiKey}|${secretKey}`;

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(toHash);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const controlSum = hashHex.substring(0, 10);

      const url = `${apiPrefix}/${apiKey}/${controlSum}/decode/${formattedVin}.json`;

      const response = await axios.get(url);
      console.log("Отримані дані result:", response.data);
      setResult(response.data);
      setError('');
      setSubmitMessage('');
    } catch (err) {
      setError('Помилка при запиті або VIN недійсний');
      setResult(null);
    }
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!result) {
      setError("Спочатку перевірте VIN");
      return;
    }
    if (!price) {
      setError("Введіть ціну");
      return;
    }
    if (!photoFile) {
      setError("Оберіть фото");
      return;
    }
    if (!modelYear) {
      setError("Введіть Model Year");
      return;
    }

    setError('');

    const carData = {
      VinCode: normalizeValue(vin.trim().toUpperCase()),
      VehicleId: normalizeValue(getValue('Vehicle ID')),
      Make: normalizeValue(getValue('Make')),
      Model: normalizeValue(getValue('Model')),
      ModelYear: parseInt(modelYear, 10) || 1,
      ProductType: normalizeValue(getValue('Product Type')),
      Body: normalizeValue(getValue('Body Style')),
      Trim: normalizeValue(getValue('Trim')),
      Series: normalizeValue(getValue('Series')),
      Drive: normalizeValue(getValue('Drive Type')),
      EngineDisplacement: parseFloat(getValue('Engine Displacement')) || 1,
      FuelTypePrimary: normalizeValue(getValue('Fuel Type Primary')),
      EngineModel: normalizeValue(getValue('Engine Model')),
      Manufacturer: normalizeValue(getValue('Manufacturer')),
      ManufacturerAddress: normalizeValue(getValue('Manufacturer Address')),
      PlantCompany: normalizeValue(getValue('Plant Company')),
      PlantCountry: normalizeValue(getValue('Plant Country')),
      PlantState: normalizeValue(getValue('Plant State')),
      FuelConsumptionExtraUrban: parseFloat(getValue('Fuel Consumption Extra Urban')) || 1,
      FuelConsumptionUrban: parseFloat(getValue('Fuel Consumption Urban')) || 1,
      NumberOfDoors: parseInt(getValue('Number of Doors'), 10) || 1,
      MaxWeight: parseInt(getValue('Max Weight'), 10) || 1,
      CheckDigit: normalizeValue(getValue('Check Digit')),
      SequentialNumber: normalizeValue(getValue('Sequential Number')),
      Price: parseFloat(price) || 1,
      VerifiedVin: true,
    };

    try {
      const formData = new FormData();
      formData.append('photo', photoFile);

      console.log("Дані, що відправляються у базу:", carData);

      Object.entries(carData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const response = await axios.post('http://localhost:5158/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitMessage('Дані успішно відправлено!');
      setError('');
      console.log('Відповідь сервера:', response.data);
    } catch (err) {
      setError('Помилка при відправці даних');
      setSubmitMessage('');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Перевірка VIN і додавання авто</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Введіть VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
        <button onClick={handleCheckVin} style={{ marginTop: 8 }}>
          Перевірити VIN
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginBottom: 20 }}>
          <h3>VIN-дані отримані (записані у console.log)</h3>
          <p><b>Марка:</b> {getValue("Make") || 'немає даних'}</p>
          <p><b>Модель:</b> {getValue("Model") || 'немає даних'}</p>
          <p><b>Рік випуску:</b> {getValue("Model Year") || 'немає даних'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>
            Ціна (грн):
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Рік моделі (Model Year):
            <input
              type="text"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              style={{ width: '100%', padding: 8, marginTop: 4 }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>
            Фото авто:
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'block', marginTop: 4 }}
              required
            />
          </label>
        </div>

        <button type="submit">Відправити дані</button>
      </form>

      {submitMessage && <p style={{ color: 'green' }}>{submitMessage}</p>}
    </div>
  );
};

export default AddVin;
