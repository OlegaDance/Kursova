import React, { useState } from "react";
import styles from "./CarPage.module.scss";

const CarSearch = () => {
  const [searchParams, setSearchParams] = useState({
    make: "",
    model: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    plantCompany: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    // Формуємо query string, пропускаючи пусті значення
    const query = Object.entries(searchParams)
      .filter(([_, v]) => v !== "")
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    fetch(`http://localhost:5158/api/cars/search?${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка при пошуку авто");
        return res.json();
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className={styles.carSearch}>
      <h2>Пошук авто</h2>
      <div className={styles.searchForm}>
        <input
          type="text"
          name="make"
          placeholder="Марка"
          value={searchParams.make}
          onChange={handleChange}
        />
        <input
          type="text"
          name="model"
          placeholder="Модель"
          value={searchParams.model}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Рік"
          value={searchParams.year}
          onChange={handleChange}
          min="1900"
          max="2100"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Мін. ціна"
          value={searchParams.minPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Макс. ціна"
          value={searchParams.maxPrice}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
        <input
          type="text"
          name="plantCompany"
          placeholder="Завод виробник"
          value={searchParams.plantCompany}
          onChange={handleChange}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Пошук..." : "Пошук"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.searchResults}>
        {results.length > 0 ? (
          results.map((car) => (
            <div key={car.id} className={styles.carItem}>
              <h3>
                {car.make} {car.model} ({car.modelYear})
              </h3>
              <p>Ціна: {car.price} $</p>
              <p>Завод: {car.plantCompany}</p>
            </div>
          ))
        ) : (
          <p>Результатів немає</p>
        )}
      </div>
    </div>
  );
};

export default CarSearch;
