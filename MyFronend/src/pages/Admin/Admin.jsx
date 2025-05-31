import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Collapse,
  TextField,
} from "@mui/material";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editData, setEditData] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // режим редагування в розгорнутому блоці

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5158/api/cars");
      setCars(res.data);
    } catch (error) {
      alert("Помилка при завантаженні машин");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const verifyCar = async (id) => {
    setUpdatingId(id);
    try {
      await axios.patch(`http://localhost:5158/api/cars/${id}/verify`, {
        verifiedVin: true,
      });
      fetchCars();
    } catch (error) {
      alert("Помилка верифікації");
    }
    setUpdatingId(null);
  };

  const handleRowClick = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setIsEditing(false);
      setEditData({});
    } else {
      setExpandedId(id);
      const car = cars.find((c) => c.id === id);
      setEditData(car ? { ...car } : {});
      setIsEditing(false);
    }
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async (id) => {
    setSavingId(id);
    try {
      await axios.patch(`http://localhost:5158/api/cars/${id}`, editData);
      await fetchCars();
      setExpandedId(null);
      setEditData({});
      setIsEditing(false);
    } catch (error) {
      alert("Помилка збереження змін");
    }
    setSavingId(null);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Адмінка: Верифікація та редагування авто
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="cars table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>Марка</TableCell>
                <TableCell>Модель</TableCell>
                <TableCell>Рік</TableCell>
                <TableCell>Верифіковано</TableCell>
                <TableCell>Дія</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <React.Fragment key={car.id}>
                  <TableRow
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(car.id)}
                    selected={expandedId === car.id}
                  >
                    <TableCell>{car.id}</TableCell>
                    <TableCell>{car.vinCode}</TableCell>
                    <TableCell>{car.make}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.modelYear}</TableCell>
                    <TableCell>{car.verifiedVin ? "Так" : "Ні"}</TableCell>
                    <TableCell>
                      {!car.verifiedVin && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            verifyCar(car.id);
                          }}
                          disabled={updatingId === car.id}
                        >
                          {updatingId === car.id
                            ? "Верифікація..."
                            : "Верифікувати"}
                        </Button>
                      )}
                      {car.verifiedVin && <Typography>✔️</Typography>}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse
                        in={expandedId === car.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box
                          margin={2}
                          sx={{ bgcolor: "#f9f9f9", borderRadius: 1, p: 2 }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              {isEditing ? (
                                <>
                                  <TextField
                                    label="VIN код"
                                    fullWidth
                                    margin="dense"
                                    value={editData.vinCode || ""}
                                    onChange={(e) =>
                                      handleChange("vinCode", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Марка"
                                    fullWidth
                                    margin="dense"
                                    value={editData.make || ""}
                                    onChange={(e) =>
                                      handleChange("make", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Модель"
                                    fullWidth
                                    margin="dense"
                                    value={editData.model || ""}
                                    onChange={(e) =>
                                      handleChange("model", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Рік"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    value={editData.modelYear || ""}
                                    onChange={(e) =>
                                      handleChange("modelYear", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Тип продукту"
                                    fullWidth
                                    margin="dense"
                                    value={editData.productType || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        "productType",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <TextField
                                    label="Кузов"
                                    fullWidth
                                    margin="dense"
                                    value={editData.body || ""}
                                    onChange={(e) =>
                                      handleChange("body", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Привід"
                                    fullWidth
                                    margin="dense"
                                    value={editData.drive || ""}
                                    onChange={(e) =>
                                      handleChange("drive", e.target.value)
                                    }
                                  />
                                  <TextField
                                    label="Двигун"
                                    fullWidth
                                    margin="dense"
                                    value={editData.engineModel || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        "engineModel",
                                        e.target.value
                                      )
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Typography>
                                    <strong>VIN код:</strong> {car.vinCode}
                                  </Typography>
                                  <Typography>
                                    <strong>Марка:</strong> {car.make}
                                  </Typography>
                                  <Typography>
                                    <strong>Модель:</strong> {car.model}
                                  </Typography>
                                  <Typography>
                                    <strong>Рік:</strong> {car.modelYear}
                                  </Typography>
                                  <Typography>
                                    <strong>Тип продукту:</strong>{" "}
                                    {car.productType}
                                  </Typography>
                                  <Typography>
                                    <strong>Кузов:</strong> {car.body}
                                  </Typography>
                                  <Typography>
                                    <strong>Привід:</strong> {car.drive}
                                  </Typography>
                                  <Typography>
                                    <strong>Двигун:</strong> {car.engineModel}
                                  </Typography>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              {isEditing ? (
                                <>
                                  <TextField
                                    label="Виробник"
                                    fullWidth
                                    margin="dense"
                                    value={editData.manufacturer || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        "manufacturer",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <TextField
                                    label="Адреса виробника"
                                    fullWidth
                                    margin="dense"
                                    value={editData.manufacturerAddress || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        "manufacturerAddress",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <TextField
                                    label="Кількість дверей"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    value={editData.numberOfDoors || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        "numberOfDoors",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <TextField
                                    label="Ціна"
                                    type="number"
                                    fullWidth
                                    margin="dense"
                                    value={editData.price || ""}
                                    onChange={(e) =>
                                      handleChange("price", e.target.value)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <Typography>
                                    <strong>Виробник:</strong>{" "}
                                    {car.manufacturer}
                                  </Typography>
                                  <Typography>
                                    <strong>Адреса виробника:</strong>{" "}
                                    {car.manufacturerAddress}
                                  </Typography>
                                  <Typography>
                                    <strong>Кількість дверей:</strong>{" "}
                                    {car.numberOfDoors}
                                  </Typography>
                                  <Typography>
                                    <strong>Ціна:</strong> {car.price}
                                  </Typography>
                                </>
                              )}
                              <Box mt={2}>
                                <Typography variant="subtitle1">
                                  Фото:
                                </Typography>
                                {car.photoPaths && car.photoPaths.length > 0 ? (
                                  car.photoPaths.map((p, i) => (
                                    <img
                                      key={i}
                                      src={`http://localhost:5158${p}`}
                                      alt={`car-${car.id}-${i}`}
                                      style={{
                                        maxWidth: "100%",
                                        maxHeight: 200,
                                        marginTop: 10,
                                      }}
                                    />
                                  ))
                                ) : (
                                  <Typography>Немає фото</Typography>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                          <Box mt={2} textAlign="right">
                            {isEditing ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => saveChanges(car.id)}
                                  disabled={savingId === car.id}
                                  sx={{ mr: 1 }}
                                >
                                  {savingId === car.id
                                    ? "Збереження..."
                                    : "Зберегти"}
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => {
                                    setIsEditing(false);
                                    setEditData(car); // відкат змін
                                  }}
                                >
                                  Відмінити
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={() => setIsEditing(true)}
                              >
                                Редагувати
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}

              {cars.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Машини не знайдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
