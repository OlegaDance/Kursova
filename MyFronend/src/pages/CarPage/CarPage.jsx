import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CarPage.module.scss";
import { useAuth0 } from "@auth0/auth0-react";

const CarPage = () => {
  const { id } = useParams();
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const [car, setCar] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  // Витягуємо userId з user.sub, якщо є
  const userId = React.useMemo(() => {
    if (!user || !user.sub) return null;
    const parts = user.sub.split("|");
    const idStr = parts[1] || null;
    return idStr ? parseInt(idStr, 10) : null;
  }, [user]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Завантаження авто
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

    // Завантаження коментарів
    fetch(`http://localhost:5158/api/comments/car/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалося завантажити коментарі");
        return res.json();
      })
      .then((data) => {
        const commentsArray = Array.isArray(data.$values) ? data.$values : [];
        setComments(commentsArray);
      })
      .catch((err) => {
        console.error("Помилка при завантаженні коментарів:", err);
      });
  }, [id]);

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    if (!isAuthenticated || !userId) return;

    

    setSending(true);
    setSendError(null);

    const commentToSend = {
      UserId: userId,
      Text: newComment.trim(),
      CarId: parseInt(id, 10), // Ось тут обов’язково CarId!
    };

    fetch(`http://localhost:5158/api/comments/car/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToSend),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не вдалося додати коментар");
        return res.json();
      })
      .then((addedComment) => {
        setComments((prev) => [...prev, addedComment]);
        setNewComment("");
        setSending(false);
      })
      .catch((err) => {
        setSendError(err.message);
        setSending(false);
      });

      console.log("Відправляю коментар:", commentToSend);
  };

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  const photos = Array.isArray(car?.PhotoPaths)
    ? car.PhotoPaths
    : car?.PhotoPaths && Array.isArray(car.PhotoPaths.$values)
    ? car.PhotoPaths.$values
    : [];

  return (
    <div className={styles.carPage}>
      <h1>
        {car.Make} {car.Model} ({car.ModelYear})
      </h1>

      <div className={styles.infoGrid}>
        <p>
          <strong>Кузов:</strong> {car.Body}
        </p>
        <p>
          <strong>Комплектація (trim):</strong> {car.Trim}
        </p>
        <p>
          <strong>Серія:</strong> {car.Series}
        </p>
        <p>
          <strong>Привід:</strong> {car.Drive}
        </p>
        <p>
          <strong>Об'єм двигуна:</strong> {car.EngineDisplacement} л
        </p>
        <p>
          <strong>Тип пального:</strong> {car.FuelTypePrimary}
        </p>
        <p>
          <strong>Кількість дверей:</strong> {car.NumberOfDoors}
        </p>
        <p>
          <strong>Макс. вага:</strong> {car.MaxWeight} кг
        </p>
        <p>
          <strong>Виробник:</strong> {car.Manufacturer}
        </p>
        <p>
          <strong>Адреса виробника:</strong> {car.ManufacturerAddress}
        </p>
        <p>
          <strong>Завод:</strong> {car.PlantCompany}
        </p>
        <p>
          <strong>Країна заводу:</strong> {car.PlantCountry}
        </p>
        <p>
          <strong>Штат заводу:</strong> {car.PlantState}
        </p>
        <p>
          <strong>Телефон продавця:</strong>{" "}
          {car.UserPhoneNumber || "Не вказано"}
        </p>
        <p>
          <strong>Ціна:</strong> {car.Price} $
        </p>
      </div>

      <div className={styles.photos}>
        {photos.length > 0 ? (
          photos.map((path, index) => (
            <img
              key={index}
              src={`http://localhost:5158${
                path.startsWith("/") ? "" : "/"
              }${path}`}
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

        {isAuthenticated ? (
          <div className={styles.commentForm}>
            <textarea
              className={styles.commentInput}
              placeholder="Напишіть ваш коментар..."
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={sending}
            />
            <button
              className={styles.commentButton}
              onClick={handleSendComment}
              disabled={sending || !newComment.trim()}
            >
              {sending ? "Надсилання..." : "Надіслати"}
            </button>
            {sendError && <p style={{ color: "red" }}>Помилка: {sendError}</p>}
          </div>
        ) : (
          <p>
            Щоб залишити коментар, будь ласка,{" "}
            <button
              onClick={() => loginWithRedirect()}
              className={styles.loginBtn}
            >
              увійдіть
            </button>
            .
          </p>
        )}

        <div className={styles.commentList}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.Id} className={styles.comment}>
                <strong>{comment.UserName}:</strong>
                <p>{comment.Text}</p>
                <small>{new Date(comment.CreatedAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>Коментарів ще немає</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarPage;
