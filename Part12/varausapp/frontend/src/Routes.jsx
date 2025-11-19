import { Route, Routes as Router } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyReservations from "./pages/myreservations/MyReservations";
import MapPopup from "./components/roommap/MapPopup";
import LogoutConfirmation from "./components/logout/LogoutConfirmation";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="/map" element={<MapPopup />} />
      <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
    </Router>
  );
};

export default Routes;

