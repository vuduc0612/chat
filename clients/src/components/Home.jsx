import React from "react";
import Sidebar from "./SideBar";
import Message from "./Message";

function Home() {
    console.log(localStorage.getItem('token'));
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            <Message />
        </div>
    );
}

export default Home;