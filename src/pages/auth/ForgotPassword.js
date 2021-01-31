import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { auth } from '../../firebase';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const ref = useRef(null);

  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    ref.current.continuousStart(60);
    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      };
      await auth.sendPasswordResetEmail(email, config);
      ref.current.complete();
      setEmail('');
      toast.success('Check your email for password email link');
    } catch (err) {
      ref.current.complete();
      toast.error(err.message);
    }
  };

  return (
    <>
      <LoadingBar color="#80f" ref={ref} />
      <div className="container">
        <div className="col-md-6 offset-md-3 p-5">
          <h4 className="d-flex justify-content-center mb-5">
            Forgot Password
          </h4>
          <form onSubmit={handleSubmit}>
            <label className="form-label">Enter your email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button className="btn btn-raised" disabled={!email}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
