import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { message } from 'antd';

import { auth } from '../../firebase';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!password || !email) {
      toast.error('Email and password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log('user', user, 'idTokenResult', idTokenResult);
        // redirect
        message.info({
          content: 'Registration Completed',
          onClose: function () {
            history.push('/');
          },
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Complete registration form
  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <p>
        Email : <strong>{email}</strong>
      </p>
      <input
        type="password"
        className="form-control mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder=" Enter your password"
      />
      <button className="btn btn-raised mt-3">Complete</button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Complete Registration</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
