import React from "react";
import styles from "./itemBlock.module.scss";

const ItemBlock = ({
  make,
  model,
  modelYear,
  body,
  trim,
  series,
  drive,
  engineDisplacement,
  fuelTypePrimary,
  manufacturer,
  manufacturerAddress,
  plantCompany,
  plantCountry,
  plantState,
  numberOfDoors,
  maxWeight,
  price,
  photoPaths,
}) => {
  if (!photoPaths || photoPaths.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.noPhoto}>Фото відсутнє</div>
        <div className={styles.info}>
          <h2 className={styles.title}>
            {make} {model} <span>({modelYear})</span>
          </h2>
        </div>
      </div>
    );
  }

  const isValidPhoto = photoPaths[0]?.match(/^\/uploads\/.+\.(jpg|png|jpeg|webp)$/i);

  return (
    <div className={styles.card}>
      {isValidPhoto ? (
        <img className={styles.noPhoto} src={`http://localhost:5158${photoPaths[0]}`} alt="car" />
      ) : (
        <div className={styles.noPhoto}>Неприпустиме фото</div>
      )}
      <div className={styles.info}>
        <h2 className={styles.title}>
          {make} {model} <span>({modelYear})</span>
        </h2>
        <div className={styles.details}>
          <p><strong>Body:</strong> {body}</p>
          <p><strong>Trim:</strong> {trim}</p>
          <p><strong>Series:</strong> {series}</p>
          <p><strong>Drive:</strong> {drive}</p>
          <p><strong>Engine:</strong> {engineDisplacement} L</p>
          <p><strong>Fuel Type:</strong> {fuelTypePrimary}</p>
          <p><strong>Manufacturer:</strong> {manufacturer}</p>
          <p><strong>Address:</strong> {manufacturerAddress}</p>
          <p><strong>Plant:</strong> {plantCompany}, {plantCountry}, {plantState}</p>
          <p><strong>Doors:</strong> {numberOfDoors}</p>
          <p><strong>Max Weight:</strong> {maxWeight} kg</p>
          <p className={styles.price}><strong>Price:</strong> ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemBlock;
