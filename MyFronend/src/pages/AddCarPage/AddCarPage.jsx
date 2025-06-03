import React, { useState, useEffect } from "react";
import styles from "./AddCarPage.module.scss";
import { Link } from "react-router-dom";

export default function AddCarPage() {
  // Ініціалізація стейту з localStorage
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
    VerifiedVin: false,
    userPhoneNumber: localStorage.getItem("phoneNumber") || "", // беремо phoneNumber
    photoPaths: [],
  });

  // Якщо localStorage зміниться в іншому вкладці/вікні - оновлюємо телефон тут
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "phoneNumber") {
        setForm((prev) => ({ ...prev, userPhoneNumber: event.newValue || "" }));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
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
      } else if (typeof value === "boolean") {
        formData.append(
          key.charAt(0).toUpperCase() + key.slice(1),
          value ? "true" : "false"
        );
      } else {
        formData.append(
          key.charAt(0).toUpperCase() + key.slice(1),
          value.toString()
        );
      }
    });

    const userId = localStorage.getItem("userId");
    formData.append("UserId", userId || "");

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

      alert("Автомобіль додано!");

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
        VerifiedVin: false,
        userPhoneNumber: "", // очищаємо після відправки
        photoPaths: [],
      });
    } catch (error) {
      alert("Помилка мережі: " + error.message);
    }
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

  const fieldLabels = {
    vinCode: "VIN код",
    vehicleId: "Ідентифікатор транспортного засобу",
    make: "Марка",
    model: "Модель",
    modelYear: "Рік моделі",
    productType: "Тип продукту",
    body: "Кузов",
    trim: "Комплектація",
    series: "Серія",
    drive: "Привід",
    engineDisplacement: "Об’єм двигуна",
    fuelTypePrimary: "Тип палива",
    engineModel: "Модель двигуна",
    manufacturer: "Виробник",
    manufacturerAddress: "Адреса виробника",
    plantCompany: "Завод компанії",
    plantCountry: "Країна заводу",
    plantState: "Штат заводу",
    fuelConsumptionExtraUrban: "Витрата палива поза містом",
    fuelConsumptionUrban: "Витрата палива в місті",
    numberOfDoors: "Кількість дверей",
    maxWeight: "Максимальна вага",
    checkDigit: "Контрольна цифра",
    sequentialNumber: "Порядковий номер",
    price: "Ціна",
    userPhoneNumber: "Номер телефону користувача (не обов’язково)",
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Додати автомобіль</h2>
      <Link to={"/AddVin"}>Головна</Link>
      <form onSubmit={handleSubmit}>
        {Object.entries(fieldLabels).map(([field, label]) => (
          <React.Fragment key={field}>
            <label htmlFor={field}>
              {label}
              {numberFields.includes(field) ? " (число)" : ""}:
            </label>

            {field === "VerifiedVin" ? (
              <input
                type="checkbox"
                id={field}
                checked={form[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={numberFields.includes(field) ? "number" : "text"}
                id={field}
                value={form[field]}
                onChange={handleChange}
                required={field !== "userPhoneNumber"} // телефон — необов’язковий
              />
            )}
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

        <button className={styles.btn} type="submit">
          Додати автомобіль
        </button>
      </form>
    </div>
  );
}
