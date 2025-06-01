import "./App.css";
import { Main } from "./pages/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import { ProfilePage } from "./pages/Profile/profilePage";
import AddCarPage  from "./pages/AddCarPage/AddCarPage";
import AddVin from "./pages/AddVin/AddVin";
import Admin from "./pages/Admin/Admin";
import TestVin from "./pages/TestVin/TestVin";
import CarPage from "./pages/CarPage/CarPage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/AddCarPage" element={<AddCarPage />} />
          <Route path="/AddVin" element={<AddVin />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/TestVin" element={<TestVin />} />
          <Route path="/car/:id" element={<CarPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
