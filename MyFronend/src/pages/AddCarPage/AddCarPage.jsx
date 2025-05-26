import React, { useState } from "react";
import styles from "./AddCarPage.module.scss";

export default function AddCarPage() {
  const [form, setForm] = useState({
    vinCode: "",
    vehicleId: "",
    make: "",
    model: "",
    modelYear: "",
    productType: "",
    body: "",
    trim: "",
    series: "",
    drive: "",
    engineDisplacement: "",
    fuelTypePrimary: "",
    engineModel: "",
    manufacturer: "",
    manufacturerAddress: "",
    plantCompany: "",
    plantCountry: "",
    plantState: "",
    fuelConsumptionExtraUrban: "",
    fuelConsumptionUrban: "",
    numberOfDoors: "",
    maxWeight: "",
    checkDigit: "",
    sequentialNumber: "",
    price: "",
    photoPaths: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, photoPaths: [...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "photoPaths") {
        value.forEach((file) => formData.append("PhotoPaths", file));
      } else {
        formData.append(
          key.charAt(0).toUpperCase() + key.slice(1),
          value.toString()
        );
      }
    });

    try {
      const response = await fetch("http://localhost:5158/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Помилка: " + JSON.stringify(err.errors));
        return;
      }

      const data = await response.json();
      alert("Автомобіль додано! ID: " + data.id);

      setForm({
        vinCode: "",
        vehicleId: "",
        make: "",
        model: "",
        modelYear: "",
        productType: "",
        body: "",
        trim: "",
        series: "",
        drive: "",
        engineDisplacement: "",
        fuelTypePrimary: "",
        engineModel: "",
        manufacturer: "",
        manufacturerAddress: "",
        plantCompany: "",
        plantCountry: "",
        plantState: "",
        fuelConsumptionExtraUrban: "",
        fuelConsumptionUrban: "",
        numberOfDoors: "",
        maxWeight: "",
        checkDigit: "",
        sequentialNumber: "",
        price: "",
        photoPaths: [],
      });
    } catch (error) {
      alert("Помилка мережі: " + error.message);
    }
  };

  const fieldLabels = {
    vinCode: "VIN-код",
    vehicleId: "Ідентифікатор транспортного засобу",
    make: "Марка",
    model: "Модель",
    modelYear: "Рік випуску",
    productType: "Тип продукту",
    body: "Кузов",
    trim: "Комплектація",
    series: "Серія",
    drive: "Привід",
    engineDisplacement: "Об'єм двигуна (л)",
    fuelTypePrimary: "Тип палива",
    engineModel: "Модель двигуна",
    manufacturer: "Виробник",
    manufacturerAddress: "Адреса виробника",
    plantCompany: "Компанія заводу",
    plantCountry: "Країна заводу",
    plantState: "Штат/Область заводу",
    fuelConsumptionExtraUrban: "Витрата палива (поза містом)",
    fuelConsumptionUrban: "Витрата палива (місто)",
    numberOfDoors: "Кількість дверей",
    maxWeight: "Максимальна вага (кг)",
    checkDigit: "Контрольна цифра",
    sequentialNumber: "Послідовний номер",
    price: "Ціна (у валюті)",
  };

  const numberFields = [
    "modelYear",
    "engineDisplacement",
    "fuelConsumptionExtraUrban",
    "fuelConsumptionUrban",
    "numberOfDoors",
    "maxWeight",
    "price",
  ];

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Додати автомобіль</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(fieldLabels).map(([field, label]) => (
          <React.Fragment key={field}>
            <label htmlFor={field}>
              {label}
              {numberFields.includes(field) ? " (число)" : ""}
              :
            </label>
            <input
              type={numberFields.includes(field) ? "number" : "text"}
              id={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </React.Fragment>
        ))}

        <label htmlFor="photoPaths">Фото (можна кілька):</label>
        <input
          type="file"
          id="photoPaths"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />

        <button className={styles.btn} type="submit">Додати автомобіль</button>
      </form>
    </div>
  );
}
