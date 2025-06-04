import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SubdomainShop from "./components/SubdomainShop";
import PathShop from "./components/PathShop";

const App = () => {
  const host = window.location.hostname;
  const isLocalhost = host === "localhost" || host.endsWith(".localhost");

  if (isLocalhost && host.includes(".")) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<SubdomainShop />} />
        </Routes>
      </Router>
    );
  }

  return (
      <div className="w-full flex justify-center mt-24">
     <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shop/:shopName" element={<PathShop />} />
        <Route path="*" element={<h3 className="text-red-500 font-semibold">(404) - Not Found</h3>} />
      </Routes>
    </Router>
   </div>
  );
};

export default App;
