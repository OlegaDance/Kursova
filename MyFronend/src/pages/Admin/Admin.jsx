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
  Collapse,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [editData, setEditData] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCars = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5158/api/cars")
      .then((res) => {
        if (!res.ok) throw new Error("Помилка завантаження авто");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data);
        } else if (data && Array.isArray(data.$values)) {
          const mappedCars = data.$values.map((car) => ({
            id: car.Id,
            vinCode: car.VinCode,
            vehicleId: car.VehicleId,
            make: car.Make,
            model: car.Model,
            modelYear: car.ModelYear,
            verifiedVin: car.VerifiedVin,
            productType: car.ProductType,
            body: car.Body,
            drive: car.Drive,
            engineDisplacement: car.EngineDisplacement,
            fuelTypePrimary: car.FuelTypePrimary,
            engineModel: car.EngineModel,
            manufacturer: car.Manufacturer,
            manufacturerAddress: car.ManufacturerAddress,
            plantCompany: car.PlantCompany,
            plantCountry: car.PlantCountry,
            plantState: car.PlantState,
            fuelConsumptionExtraUrban: car.FuelConsumptionExtraUrban,
            fuelConsumptionUrban: car.FuelConsumptionUrban,
            numberOfDoors: car.NumberOfDoors,
            maxWeight: car.MaxWeight,
            checkDigit: car.CheckDigit,
            sequentialNumber: car.SequentialNumber,
            price: car.Price,
          }));
          setCars(mappedCars);
        } else {
          setCars([]);
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

  const verifyCar = async (id) => {
    setUpdatingId(id);
    try {
      await axios.patch(`http://localhost:5158/api/cars/${id}/verify`, {
        verifiedVin: true,
      });
      await fetchCars();
    } catch {
      alert("Помилка верифікації");
    }
    setUpdatingId(null);
  };

  const handleRowClick = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      setEditData({});
    } else {
      setExpandedId(id);
      const car = cars.find((c) => c.id === id);
      setEditData(car ? { ...car } : {});
      setSavingId(null);
    }
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = async (id) => {
    setSavingId(id);
    try {
      const updatePayload = { ...editData };
      await axios.patch(`http://localhost:5158/api/cars/${id}`, updatePayload);
      await fetchCars();
      setExpandedId(null);
      setEditData({});
    } catch {
      alert("Помилка збереження змін");
    }
    setSavingId(null);
  };

  const deleteCar = async (id) => {
    if (!window.confirm("Ви впевнені, що хочете видалити авто?")) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5158/api/cars/${id}`);
      await fetchCars();
    } catch {
      alert("Помилка видалення авто");
    }
    setDeletingId(null);
  };

  const fields = [
    { label: "Марка автомобіля", field: "make", type: "text", xs: 6 },
    { label: "Модель", field: "model", type: "text", xs: 6 },
    { label: "Рік випуску", field: "modelYear", type: "number", xs: 6 },
    { label: "Тип продукту", field: "productType", type: "text", xs: 6 },
    { label: "Тип кузова", field: "body", type: "text", xs: 6 },
    { label: "Привід", field: "drive", type: "text", xs: 6 },
    {
      label: "Об’єм двигуна (л)",
      field: "engineDisplacement",
      type: "number",
      xs: 6,
    },
    { label: "Тип палива", field: "fuelTypePrimary", type: "text", xs: 6 },
    { label: "Модель двигуна", field: "engineModel", type: "text", xs: 12 },
    { label: "Виробник", field: "manufacturer", type: "text", xs: 6 },
    {
      label: "Адреса виробника",
      field: "manufacturerAddress",
      type: "text",
      xs: 12,
    },
    { label: "Компанія заводу", field: "plantCompany", type: "text", xs: 6 },
    { label: "Країна заводу", field: "plantCountry", type: "text", xs: 6 },
    { label: "Штат заводу", field: "plantState", type: "text", xs: 6 },
    {
      label: "Витрата палива поза містом (л/100км)",
      field: "fuelConsumptionExtraUrban",
      type: "number",
      xs: 6,
    },
    {
      label: "Витрата палива в місті (л/100км)",
      field: "fuelConsumptionUrban",
      type: "number",
      xs: 6,
    },
    {
      label: "Кількість дверей",
      field: "numberOfDoors",
      type: "number",
      xs: 6,
    },
    {
      label: "Максимальна вага (кг)",
      field: "maxWeight",
      type: "number",
      xs: 6,
    },
    { label: "Контрольна цифра VIN", field: "checkDigit", type: "text", xs: 6 },
    {
      label: "Порядковий номер VIN",
      field: "sequentialNumber",
      type: "text",
      xs: 6,
    },
    { label: "Ціна (₴)", field: "price", type: "number", xs: 6 },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Адмінка: Верифікація, редагування та видалення авто
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="cars table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>VIN</TableCell>
                <TableCell>Марка</TableCell>
                <TableCell>Модель</TableCell>
                <TableCell>Рік</TableCell>
                <TableCell>Верифіковано</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <React.Fragment key={car.id}>
                  <TableRow
                    hover
                    onClick={() => handleRowClick(car.id)}
                    sx={{ cursor: "pointer" }}
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
                          sx={{ mr: 1 }}
                        >
                          {updatingId === car.id
                            ? "Верифікація..."
                            : "Верифікувати"}
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCar(car.id);
                        }}
                        disabled={deletingId === car.id}
                      >
                        {deletingId === car.id ? "Видалення..." : "Видалити"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedId === car.id && (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <Collapse in timeout="auto" unmountOnExit>
                          <Box
                            sx={{
                              p: 3,
                              backgroundColor: "#f0f0f0",
                              borderRadius: 2,
                              border: "1px solid #ddd",
                              mb: 2,
                            }}
                          >
                            <Grid container spacing={2}>
                              {fields.map(({ label, field, type, xs }) => (
                                <Grid item xs={12} sm={xs} key={field}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      mb: 0.5,
                                      fontWeight: 500,
                                      color: "#444",
                                    }}
                                  >
                                    {label}
                                  </Typography>
                                  <TextField
                                    fullWidth
                                    type={type}
                                    value={editData[field] ?? ""}
                                    onChange={(e) =>
                                      handleChange(
                                        field,
                                        type === "number"
                                          ? e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                          : e.target.value
                                      )
                                    }
                                    variant="outlined"
                                    size="small"
                                  />
                                </Grid>
                              ))}

                              <Grid item xs={12}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={!!editData.verifiedVin}
                                      onChange={() =>
                                        handleChange(
                                          "verifiedVin",
                                          !editData.verifiedVin
                                        )
                                      }
                                      color="success"
                                    />
                                  }
                                  label="Верифіковано"
                                />
                              </Grid>

                              <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => saveChanges(car.id)}
                                  disabled={savingId === car.id}
                                  sx={{ mr: 2 }}
                                >
                                  {savingId === car.id
                                    ? "Збереження..."
                                    : "Зберегти"}
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    setExpandedId(null);
                                    setEditData({});
                                  }}
                                >
                                  Відмінити
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
