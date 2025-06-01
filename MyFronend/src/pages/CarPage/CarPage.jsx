import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CarPage.module.scss";

const CarPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5158/api/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалося завантажити авто");
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div className={styles.carPage}>
      <h1>
        {car.make} {car.model} ({car.modelYear})
      </h1>

      <div className={styles.infoGrid}>
        <p>
          <strong>Кузов:</strong> {car.body}
        </p>
        <p>
          <strong>Комплектація (trim):</strong> {car.trim}
        </p>
        <p>
          <strong>Серія:</strong> {car.series}
        </p>
        <p>
          <strong>Привід:</strong> {car.drive}
        </p>
        <p>
          <strong>Об'єм двигуна:</strong> {car.engineDisplacement} л
        </p>
        <p>
          <strong>Тип пального:</strong> {car.fuelTypePrimary}
        </p>
        <p>
          <strong>Кількість дверей:</strong> {car.numberOfDoors}
        </p>
        <p>
          <strong>Макс. вага:</strong> {car.maxWeight} кг
        </p>
        <p>
          <strong>Виробник:</strong> {car.manufacturer}
        </p>
        <p>
          <strong>Адреса виробника:</strong> {car.manufacturerAddress}
        </p>
        <p>
          <strong>Завод:</strong> {car.plantCompany}
        </p>
        <p>
          <strong>Країна заводу:</strong> {car.plantCountry}
        </p>
        <p>
          <strong>Штат заводу:</strong> {car.plantState}
        </p>
        <p>
          <strong>Ціна:</strong> {car.price} $
        </p>
      </div>

      <div className={styles.photos}>
        {car.photoPaths?.length > 0 ? (
          car.photoPaths.map((path, index) => (
            <img
              key={index}
              src={`http://localhost:5158${path}`}
              alt={`Фото ${index + 1}`}
              className={styles.photo}
            />
          ))
        ) : (
          <p>Фото відсутні</p>
        )}
      </div>

      <div className={styles.comments}>
        <h2>Коментарі</h2>

        {/* Поле для введення коментаря */}
        <div className={styles.commentForm}>
          <textarea
            className={styles.commentInput}
            placeholder="Напишіть ваш коментар..."
            rows={3}
          />
          <button className={styles.commentButton}>Надіслати</button>
        </div>

        {/* Заготовка для виводу коментарів */}
        <div className={styles.commentList}>
          <div className={styles.comment}>
            <strong>Іван:</strong>
            <p>Справжня ракета, а не машина! 🔥</p>
          </div>
          <div className={styles.comment}>
            <strong>Олена:</strong>
            <p>Дуже крута комплектація, хотіла б собі таку!</p>
          </div>
          {/* Тут будуть інші коментарі */}
        </div>
      </div>
    </div>
  );
};

export default CarPage;
