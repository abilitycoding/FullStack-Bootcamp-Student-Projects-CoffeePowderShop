import Aboutpg from "./components/pages/about";
import Gallerypg from "./components/pages/gallery";
import Homepg from "./components/pages/homepg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ourmenu from "./components/pages/ourmenu";
import Contact from "./components/pages/contact";
import Adminpg from "./components/pages/admin";
import Signin from "./components/pages/signin";

function App() {
  return (
    <div className="Main_div">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Homepg />} />
          <Route path="/About" element={<Aboutpg />} />
          <Route path="/Ourmenu" element={<Ourmenu />} />
          <Route path="/Gallery" element={<Gallerypg />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Admin" element={<Adminpg />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
