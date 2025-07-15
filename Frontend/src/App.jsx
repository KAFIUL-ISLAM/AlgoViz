import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SortingChart from "./components/SortingChart";
import SortingProvider from "./contexts/SortingContext";
import SignIn from "./components/SignIn";
import PracticePage from "./components/PracticePage";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import ForgotPassword from "./components/ForgotPassword";

import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [data, setData] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <SortingProvider>
          <div className="container mx-auto px-4">
            <Routes>
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/" element={<SortingChart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/PracticePage" element={<PracticePage />} />
              <Route path="/signout" element={<SignOut />} />
            </Routes>
          </div>
        </SortingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
