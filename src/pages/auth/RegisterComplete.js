import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

import { auth } from '../../firebase';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef(null);

  const dispatch = useDispatch();

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
      ref.current.continuousStart(60);
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      ref.current.complete();
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        const firebaseUser = auth.currentUser;
        await firebaseUser.updatePassword(password);
        completeAuth(firebaseUser);
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

  const completeAuth = async (firebaseUser) => {
    try {
      const idTokenResult = await firebaseUser.getIdTokenResult();
      const response = await createOrUpdateUser(idTokenResult.token);
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          name: response.data.user.name,
          picture: response.data.user.picture,
          email: response.data.user.email,
          token: idTokenResult.token,
          role: response.data.user.role,
          _id: response.data.user._id,
        },
      });
      history.push('/');
    } catch (err) {
      ref.current.complete();
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
        placeholder="Enter your password"
      />
      <button className="btn btn-raised mt-3">Complete</button>
    </form>
  );

  return (
    <>
      <LoadingBar color="#80f" ref={ref} />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Complete Registration</h4>
            {completeRegistrationForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplete;
