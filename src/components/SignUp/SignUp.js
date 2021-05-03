import React, { useRef, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './SignUp.scss';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';
import { articles, loginIn } from '../../routeType';
import { setToken } from '../../localStorageServices';
import { get_user, authentication_user } from '../../reduxToolkit/toolkitSlice';

function SignUp() {
  const user = useSelector((state) => state.toolkit.user);
  const dispatch = useDispatch();

  const [isloading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const { username, email, password } = data;

    Services.sendRequestAuthorization(username, email, password)
      .then((result) => {
        // localStorage.setItem('token', JSON.stringify(result.user.token));
        setToken(JSON.stringify(result.user.token));
        dispatch(get_user(result.user));
        dispatch(authentication_user(true));
      })
      .catch(() => {
        SpinErr();
      });
  };

  const password = useRef({});
  password.current = watch('password', '');

  const classes = ['form_sign'];

  if (isloading) {
    classes.push('form_disabled');
  }

  if (user.id) return <Redirect to={articles} />;

  return (
    <div className={classes.join(' ')}>
      <form className="form_sign_up" id="creat_form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isloading}>
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
                    value: 8,
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
              {errors.password && <p className="error">password error</p>}
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
              {errors.password_repeat && <p className="error">password error</p>}
            </label>
          </div>
          <label htmlFor="pass2" className="form_label_bottom ">
            <input type="checkbox" id="pass2" required className="form_input form_label_checkbox" />
            <span className="input_checkbox_text">I agree to the processing of my personal information</span>
          </label>
          <input htmlFor="creat_form" value="Create" type="submit" disabled={isloading} className="btn_form" />
          <span className="text_bottom_form">
            Already have an account?{' '}
            <Link to={loginIn} className="link_text_bottom_form">
              Sign In.
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  );
}

export default SignUp;
