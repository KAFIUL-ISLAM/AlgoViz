import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SortingChart from "./components/SortingChart";
import SortingProvider from "./contexts/SortingContext";
import SignIn from './components/SignIn';
import PracticePage from "./components/PracticePage";
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import { useEffect, useState } from 'react';
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/hello/')
          .then(res => res.json())
          .then(data => setData(data.message));
      }, []);
    return (
        <Router>
            <AuthProvider>
            <SortingProvider>
                <div className="container mx-auto px-4">
                {data && (
                    <div className="bg-blue-100 text-blue-800 text-center py-2 rounded mb-4">
                        {data}
                    </div>
                )}
                    <Routes>
                        <Route path="/" element={<SortingChart />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                           <Route path="/PracticePage" element={<PracticePage />} />                              
                        <Route path="/signout" element={<SignOut />} />
                            {/* <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <YourDashboardComponent />  {/* Replace with actual dashboard component }
    </PrivateRoute>
  }
/> */}
                    </Routes>
                </div>
                </SortingProvider>
                </AuthProvider>
        </Router>
    );
}

export default App;
