import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import './SignUp.scss';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';

function SignUp({ get_user }) {
  const [logUp, setlogUp] = useState(false);
  const apiService = new Services();

  const token = localStorage.getItem('token');

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const { username, email, password } = data;

    apiService
      .sendRequestAuthorization(username, email, password)
      .then((result) => {
        console.log(result);
        localStorage.setItem('token', JSON.stringify(result.user.token));

        get_user(result.user);
        setlogUp(true);
      })
      .catch(() => SpinErr());
  };
  const password = useRef({});
  password.current = watch('password', '');

  if (token || logUp) return <Redirect to="/articles" />;

  return (
    <div className="form_sign">
      <form className="form_sign_up" id="creat_form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form_title">Create new account </h3>

        <div className="block_input">
          <label htmlFor="name" className="form_label">
            <span className="label_input_name">Username</span>
            <input
              ref={register({
                maxLength: 20,
                minLength: 3,
              })}
              type="text"
              name="username"
              required
              placeholder="Username"
              className="form_input"
            />
          </label>
          <label htmlFor="email" className="form_label">
            <span className="label_input_name">Email address</span>
            <input
              ref={register}
              type="email"
              name="email"
              required
              placeholder="Email address"
              className="form_input"
            />
          </label>
          <label htmlFor="pass1" className="form_label">
            <span className="label_input_name">Password</span>
            <input
              ref={register({
                required: 'You must specify a password',
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters',
                },
                maxLength: 40,
              })}
              type="password"
              name="password"
              required
              placeholder="Password"
              className="form_input"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </label>
          <label htmlFor="pass2" className="form_label">
            <span className="label_input_name">Repeat password</span>
            <input
              ref={register({
                validate: (value) => value === password.current || 'The passwords do not match',
              })}
              type="password"
              name="password_repeat"
              required
              placeholder="Repeat password"
              className="form_input"
            />
            {errors.password_repeat && <p className="error">{errors.password_repeat.message}</p>}
          </label>
        </div>
        <label htmlFor="pass2" className="form_label_bottom ">
          <input type="checkbox" id="pass2" required className="form_input form_label_checkbox" />
          <span className="input_checkbox_text">I agree to the processing of my personal information</span>
        </label>
        <input htmlFor="creat_form" value="Create" type="submit" className="btn_form" />
        <span className="text_bottom_form">
          Already have an account? <span className="link_text_bottom_form">Sign In.</span>
        </span>
      </form>
    </div>
  );
}

export default connect(null, action)(SignUp);

SignUp.defaultProps = {
  get_user: () => {},
};

SignUp.propTypes = {
  get_user: PropTypes.func,
};
