import "./App.css";
import { Main } from "./pages/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import { ProfilePage } from "./pages/Profile/profilePage";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
