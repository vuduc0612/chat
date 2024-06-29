import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './SideBar';
import Home from './Home';
import Login from './form/Login';
import PrivateRoute from './PrivateRoute';
import Register from './form/Register';
import User from './User';

function App() {
    return (
        <Router>
            <div className="d-flex" style={{ height: '100vh' }}>
                <Sidebar />
                <main className="content flex-grow-1">
                    <div className="container-fluid h-100 p-0">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/home" element={<PrivateRoute component={Home} />} />
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/user/profile" element={<PrivateRoute component={User} />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;