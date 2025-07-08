import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SortingChart from "./components/SortingChart";
import SortingProvider from "./contexts/SortingContext";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';

function App() {
    return (
        <Router>
            <SortingProvider>
                <div className="container mx-auto px-4">
                    <Routes>
                        <Route path="/" element={<SortingChart />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signout" element={<SignOut />} />
                    </Routes>
                </div>
            </SortingProvider>
        </Router>
    );
}

export default App;
