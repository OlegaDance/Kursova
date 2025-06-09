import React, { useEffect, useState } from "react";
import ItemBlock from "../../component/ItemBlock/itemBlock.jsx";
import VinCoder from "../../component/VinCoder/VinCoder";
import { Link } from "react-router-dom";
import styles from "./Main.module.scss";

export const Main = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [plantCompany, setPlantCompany] = useState("");

  const validateInputs = () => {
    if (
      modelYear &&
      (modelYear < 1900 || modelYear > new Date().getFullYear())
    ) {
      setError(`Рік має бути від 1900 до ${new Date().getFullYear()}`);
      return false;
    }
    if (minPrice && minPrice < 0) {
      setError("Ціна від не може бути від'ємною");
      return false;
    }
    if (maxPrice && maxPrice < 0) {
      setError("Ціна до не може бути від'ємною");
      return false;
    }
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError("Ціна від не може бути більшою за ціну до");
      return false;
    }
    setError(null);
    return true;
  };

  const fetchCars = () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    if (make.trim()) params.append("make", make.trim());
    if (model.trim()) params.append("model", model.trim());
    if (modelYear.trim()) params.append("modelYear", modelYear.trim());
    if (minPrice.trim()) params.append("minPrice", minPrice.trim());
    if (maxPrice.trim()) params.append("maxPrice", maxPrice.trim());
    if (plantCompany.trim()) params.append("plantCompany", plantCompany.trim());

    // Додаємо фільтр на верифіковані авто
    params.append("verifiedVin", "true");

    fetch(`http://localhost:5158/api/cars/search?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження авто");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data && Array.isArray(data.$values)) {
          setCars(data.$values);
        } else {
          setCars([]);
          console.warn("Очікували масив авто, отримали:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <div className={styles.searchForm}>
        <h3>Пошук автомобілів</h3>
        <div className={styles.searchInputs}>
          <input
            type="text"
            placeholder="Марка"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Рік"
            value={modelYear}
            onChange={(e) => setModelYear(e.target.value)}
            min="1900"
            max={new Date().getFullYear()}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Ціна від ($)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Ціна до ($)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Завод виробник"
            value={plantCompany}
            onChange={(e) => setPlantCompany(e.target.value)}
            className={styles.input}
          />
        </div>
        <button onClick={fetchCars} className={styles.searchButton}>
          Пошук
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {loading && <div className={styles.loading}>Завантаження...</div>}

      <div className={styles.carsList}>
        {cars.length === 0 && !loading && <p>Автомобілі не знайдені</p>}
        {cars.map((car) => (
          <Link to={`/car/${car.Id}`} key={car.Id} className={styles.link}>
            <ItemBlock
              id={car.Id}
              make={car.Make}
              model={car.Model}
              modelYear={car.ModelYear}
              body={car.Body}
              trim={car.Trim}
              series={car.Series}
              drive={car.Drive}
              engineDisplacement={car.EngineDisplacement}
              fuelTypePrimary={car.FuelTypePrimary}
              manufacturer={car.Manufacturer}
              manufacturerAddress={car.ManufacturerAddress}
              plantCompany={car.PlantCompany}
              plantCountry={car.PlantCountry}
              plantState={car.PlantState}
              numberOfDoors={car.NumberOfDoors}
              maxWeight={car.MaxWeight}
              price={car.Price}
              photoPaths={car.PhotoPaths || []}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
