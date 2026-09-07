import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import AddApplication from "./pages/AddApplication.jsx";
import ApplicationDetails from "./pages/ApplicationDetails.jsx";
import EditApplication from "./pages/EditApplication.jsx";
import Applications from "./pages/Applications.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/applications" element={<Applications />}></Route>

          <Route path="/add" element={<AddApplication />}></Route>
          <Route
            path="/application/:id"
            element={<ApplicationDetails />}
          ></Route>
          <Route path="/edit/:id" element={<EditApplication />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
