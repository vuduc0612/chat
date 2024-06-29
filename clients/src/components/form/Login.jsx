import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    console.log('Email:', email);
    console.log('Password:', password);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/signin', {
                email,
                password
            });
            console.log('Server response:', response.data.access_token);
            setMessage(response.data.message); // Thông báo từ server
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);// lưu token vào localStorage

                Swal.fire({
                    title: 'Thành công',
                    icon: 'success',
                    text: 'Đăng nhập thành công!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Chuyển hướng về trang chủ sau khi ấn OK
                        window.location.href = './home';
                    }
                })
            }
            else {
                Swal.fire({
                    title: 'Thất bại!',
                    text: 'Sai thông tin hoặc mật khẩu',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
            Swal.fire({
                title: 'Thất bại!',
                text: 'Sai thông tin hoặc mật khẩu',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    };

    return (
        <div className="container-fluid position-relative d-flex p-0">
            <div className="container-fluid">
                <div
                    className="row h-100 align-items-center justify-content-center"
                    style={{ minHeight: '100vh' }}
                >
                    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                        <div
                            className="bg-light rounded border border-dark p-4 p-sm-5 my-4 mx-3"
                        >
                            <div
                                className="d-flex align-items-center justify-content-center mb-3"
                            >
                                <h3>Đăng nhập</h3>
                            </div>
                            <form onSubmit={handleSignup}>
                                <div className="form-floating mb-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Tên tài khoản"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    
                                </div>
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Ghi nhớ</label>
                                    </div>
                                    <a href="#" className="forgot-password-link">Quên mật khẩu</a>
                                </div>
                                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                                    Đăng nhập
                                </button>
                                <div className="text-center">
                                    <span className="text-muted">Chưa có tài khoản?</span>
                                    <a href="/register" className="forgot-password-link">Đăng ký</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;