import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddApplication from "./pages/AddApplication.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<AddApplication />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
