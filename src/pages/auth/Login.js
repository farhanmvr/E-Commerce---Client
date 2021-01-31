import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, message } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';

import { auth, googleAuthProvider } from '../../firebase';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ref = useRef(null);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    ref.current.continuousStart(60);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      message.success("You're Logged In Successfully");
      const { user } = result;
      const idTokenResult = await await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      ref.current.complete();
      history.push('/');
    } catch (err) {
      toast.error(err.message);
      ref.current.complete();
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      ref.current.continuousStart(60);
      const { user } = result;
      const idTokenResult = await await user.getIdTokenResult();
      message.success("You're Logged In Successfully");
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      ref.current.complete();
      history.push('/');
    } catch (err) {
      ref.current.complete();
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="form-label mt-3">Password</label>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Link to="/forgot/password" className="float-right text-primary mt-2">
        Forgot Password?
      </Link>
      <Button
        onClick={handleSubmit}
        shape="round"
        type="primary"
        className="mt-3"
        block
        size="large"
        disabled={!email || password.length < 6}
        icon={<MailOutlined />}
      >
        Login with Email
      </Button>
      <Button
        onClick={googleLogin}
        shape="round"
        type="ghost"
        className="mt-3"
        block
        size="large"
        icon={<GoogleOutlined />}
      >
        Login with Google
      </Button>
    </form>
  );

  return (
    <>
      <LoadingBar color="#80f" ref={ref} />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="d-flex justify-content-center mb-5">
              Login to your account
            </h4>
            {loginForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
