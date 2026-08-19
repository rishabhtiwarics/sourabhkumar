import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}