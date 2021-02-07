import { Button, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import LoadingBar from 'react-top-loading-bar';

const WishList = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error('Password is not match');
      return;
    }
    if (!password || !confirmPassword) {
      message.error('Enter password');
      return;
    }
    if (password.length < 6) {
      message.error('Password should be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      ref.current.continuousStart(60);
      await auth.currentUser.updatePassword(password);
      ref.current.complete();
      message.success('Password changed successfully');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      ref.current.complete();
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const paswordUpdateForm = (
    <form onSubmit={handleSubmit} className="form-group">
      <label className="form-label mt-2">Enter password</label>
      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="form-label mt-3">Confirm password </label>
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        disabled={loading}
        className="mt-3"
        onClick={handleSubmit}
        size="large"
      >
        Change Password
      </Button>
    </form>
  );

  return (
    <>
      <LoadingBar color="#80f" ref={ref} />
      <div className="row">
        <div className="col-md-3">
          <UserNav selectKey="password" />
        </div>
        <div className=" col-md-3 mt-2">
          <h4 className="mt-md-3">Password Update</h4>
          {paswordUpdateForm}
        </div>
      </div>
    </>
  );
};

export default WishList;
