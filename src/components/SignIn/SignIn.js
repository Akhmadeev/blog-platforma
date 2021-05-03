import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './SignIn.scss';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';
import { articles, loginUp } from '../../routeType';
import { getToken } from '../../localStorageServices';
import { get_user, authentication_user } from '../../reduxToolkit/toolkitSlice';

function SignIn() {
  const [status, setStatus] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const dispatch = useDispatch();

  const token = getToken();
  const classes = ['form_sign'];

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setSendLoading(true);
    const { email, password } = data;
    Services.sendUserInfo(email, password)
      .then((result) => {
        localStorage.setItem('token', JSON.stringify(result.user.token));
        dispatch(get_user(result.user));
        setStatus(true);
        dispatch(authentication_user(true));
      })
      .catch(() => {
        SpinErr();
        setSendLoading(false);
      });
  };

  if (sendLoading) classes.push('form_disabled');

  if (token || status) return <Redirect to={articles} />;

  return (
    <div className={classes.join(' ')}>
      <form className="form_sign_in" id="creat_form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form_title">Sign In</h3>

        <div>
          <label htmlFor="email" className="form_label">
            <span className="label_input_name">Email address</span>
            <input
              ref={register}
              type="text"
              name="email"
              required
              placeholder="Email address"
              className="form_input"
            />
          </label>
          <label htmlFor="pass1" className="form_label">
            <span className="label_input_name">Password</span>
            <input
              ref={register}
              type="password"
              name="password"
              required
              placeholder="Password"
              className="form_input"
            />
          </label>
        </div>

        <input htmlFor="creat_form" value="Login" type="submit" disabled={sendLoading} className="btn_form" />
        <span className="text_bottom_form">
          Already have an account?{' '}
          <Link to={loginUp} className="link_text_bottom_form">
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignIn;
