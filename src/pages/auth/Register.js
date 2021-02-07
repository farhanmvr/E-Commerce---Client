import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user,history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!email) {
      toast.error('Please enter email to register');
      return;
    }

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your regristration`
    );
    // save user email in local starage
    window.localStorage.setItem('emailForRegistration', email);
    // clear state
    setEmail('');
  };

  const registerFrom = () => (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Enter your email</label>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-raised mt-3">Register</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="d-flex justify-content-center mb-5">
            Register to continue
          </h4>
          {registerFrom()}
        </div>
      </div>
    </div>
  );
};

export default Register;
