import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import './SignIn.scss';
import Services from '../../ApiService';
import SpinErr from '../SpinErr/SpinErr';

function SignIn({ get_user }) {
  
  const [status, setStatus] = useState(false);

  
  const token = localStorage.getItem('token');

  const apiService = new Services();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    apiService
      .sendUserInfo(email, password)
      .then((result) => {
        localStorage.setItem('token', JSON.stringify(result.user.token));
        get_user(result.user);
        setStatus(true);
      })
      .catch(() => SpinErr());;
  };

  
  if (token || status) return <Redirect to="/articles" />;

  return (
    <div className="form_sign">
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

        <input
          htmlFor="creat_form"
          value="Login"
          type="submit"
          className="btn_form"
        />
        <span className="text_bottom_form">
          Already have an account? <span className="link_text_bottom_form">Sign Up.</span>
        </span>
      </form>
    </div>
  );
}

export default connect(null, action)(SignIn);

SignIn.defaultProps = {
  get_user: () => {},
};

SignIn.propTypes = {
  get_user: PropTypes.func,
};