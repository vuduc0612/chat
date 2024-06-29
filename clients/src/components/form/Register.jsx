import React from 'react';

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
  };

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-light rounded border border-dark p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <h3>Đăng ký</h3>
              </div>
              <form onSubmit={handleSubmit}>
              
                <div className="form-floating  mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    placeholder="Tên"
                  />
                  
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                  />
                 
                </div>
                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                  Đăng ký
                </button>
              </form>
              <div className="text-center">
                <span className="text-muted">Bạn đã có tài khoản?</span>
                <a href="/login" className="forgot-password-link">Đăng nhập</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;