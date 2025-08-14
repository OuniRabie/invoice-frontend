import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Drivers from "./pages/Drivers";

function App() {
  return (
    <>
      <NavBar />
      <div className="pt-4">
        <Routes>
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/products" element={<Products />} />
          <Route path="/drivers" element={<Drivers />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
