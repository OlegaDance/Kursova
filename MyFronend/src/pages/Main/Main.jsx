import React, { useEffect, useState } from "react";
import ItemBlock from "../../component/ItemBlock/itemBlock.jsx"; 
import VinCoder from "../../component/VinCoder/VinCoder";
import styles from "./Main.module.scss";

export const Main = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5158/api/cars?verifiedVin=1")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження авто");
        return res.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div>
      <VinCoder />

      <div className={styles.carsList}>
        {cars.length === 0 && <p>Автомобілі не знайдені</p>}
        {cars.map((car) => (
          <ItemBlock
            key={car.id}
            id={car.id}
            make={car.make}
            model={car.model}
            modelYear={car.modelYear}
            body={car.body}
            trim={car.trim}
            series={car.series}
            drive={car.drive}
            engineDisplacement={car.engineDisplacement}
            fuelTypePrimary={car.fuelTypePrimary}
            manufacturer={car.manufacturer}
            manufacturerAddress={car.manufacturerAddress}
            plantCompany={car.plantCompany}
            plantCountry={car.plantCountry}
            plantState={car.plantState}
            numberOfDoors={car.numberOfDoors}
            maxWeight={car.maxWeight}
            price={car.price}
            photoPaths={car.photoPaths || []}
          />
        ))}
      </div>
    </div>
  );
};
