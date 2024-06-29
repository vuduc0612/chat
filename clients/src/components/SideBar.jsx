import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserFriends, faCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        if (localStorage.getItem('token') === null) {
            console.log('Token đã được xóa.');
        } else {
            console.log('Token chưa được xóa.');
        }
        history('/login');
    };
    return (
        <div className="bg-primary text-white p-3" style={{ width: '60px', height: '100vh' }}>
            <div className="d-flex flex-column align-items-center">
                <Link to="/user/profile" className="mb-4 text-white"> {/* Thay đổi này */}
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </Link>
                <Link to="/home" className="mb-4 text-white">
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </Link>
                <Link to="/home/notifications" className="mb-4 text-white">
                    <FontAwesomeIcon icon={faBell} size="2x" />
                </Link>
                <div onClick={handleLogout} className="mb-4 text-white" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faCog} size="2x" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
