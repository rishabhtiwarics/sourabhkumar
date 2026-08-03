import { Route, Routes } from "react-router-dom";
import ScrollProgressIndicator from "./components/common/ScrollProgressIndicator.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";
import FloatingContactWidget from "./components/common/FloatingContactWidget.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressIndicator />
      <FloatingContactWidget />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
