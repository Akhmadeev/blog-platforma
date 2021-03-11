import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import './EditProfile.scss';
import Services from '../../ApiService';

function EditProfile({get_user}) {

  const [status, setStatus] = useState(false)

  const apiService = new Services();

  const token = localStorage.getItem('token');

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const { username, email, image } = data;
    apiService.sendEditProfile(email, token, username, image).then((res) => {
      setStatus(true);
      get_user(res)
    });

  };

  if (status) {
    return <Redirect to="/articles" />;
  }

  return (
    <div className="form_sign">
      <form className="form_sign_up" id="creat_form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form_title">Edit Profile</h3>

        <div>
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
            <span className="label_input_name">New password</span>
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
              placeholder="New password"
              className="form_input"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </label>
          <label htmlFor="pass2" className="form_label">
            <span className="label_input_name">Avatar image (url)</span>
            <input
              ref={register}
              type="url"
              name="image"
              required
              placeholder="Repeat password"
              className="form_input"
            />
            {errors.password_repeat && <p className="error">{errors.password_repeat.message}</p>}
          </label>
        </div>

        <input htmlFor="creat_form" value="Create" type="submit" className="btn_form" />
      </form>
    </div>
  );
}


export default connect(null, action)(EditProfile);

EditProfile.defaultProps = {
  get_user: () => {},
};
EditProfile.propTypes = {
  get_user: PropTypes.func,
};