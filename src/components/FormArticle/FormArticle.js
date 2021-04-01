import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import classes from './formArticle.module.scss';

const FormArticle = ({ title, onSubmit, inputTitle, inputDescription, inputBody, tagList, isLoading }) => {
  const [arrayTags, setArrayTags] = useState(['', '']);

  const { register, handleSubmit, errors } = useForm();

  let count = 0;

  const addTag = () => {
    const newArray = arrayTags.slice();
    newArray.push('');
    setArrayTags(newArray);
  };

  const deleteTag = (name) => {
    const idx = arrayTags.indexOf(name);
    const newArray = [...arrayTags.slice(0, idx), ...arrayTags.slice(idx + 1)];
    setArrayTags(newArray);
  };

  const tagForm = (name) => {
    count += 1;
    return (
      <div key={name + count} className={classes.tag_block}>
        <input
          className={`${classes.formArticle_input} ${classes.size_s}`}
          defaultValue={name}
          name={count}
          ref={register}
          type="text"
          placeholder="Tag"
          disabled={isLoading}
        />
        <button type="button" disabled={isLoading} onClick={() => deleteTag(name)} className={classes.btn_tags_delete}>
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (tagList.length > 0) setArrayTags(tagList);
  }, []);

  return (
    <div className={classes.formArticle}>
      <form className={classes.formArticle_main}>
        <h3 className={classes.formArticle_title}>{title}</h3>
        <label className={classes.formArticle_label}>
          <span className={classes.formArticle_input_heading}>Title</span>
          <input
            className={classes.formArticle_input}
            name="title"
            ref={register({
              maxLength: 20,
              minLength: 3,
            })}
            defaultValue={inputTitle}
            type="text"
            required
            placeholder="Title"
            disabled={isLoading}
          />
          {errors.title && <p className={classes.error}>Title должен быть не менее 6 и не более 20 символов </p>}
        </label>
        <label className={classes.formArticle_label}>
          <span className={classes.formArticle_input_heading}>Short description</span>
          <input
            className={classes.formArticle_input}
            name="description"
            ref={register({
              maxLength: 60,
              minLength: 6,
            })}
            defaultValue={inputDescription}
            type="text"
            required
            placeholder="Short description"
            disabled={isLoading}
          />
          {errors.description && (
            <p className={classes.error}>Short description должен быть не менее 6 и не более 60 символов </p>
          )}
        </label>
        <label className={classes.formArticle_label}>
          <span className={classes.formArticle_input_heading}>Text</span>
          <textarea
            className={`${classes.formArticle_input} ${classes.size_xl}`}
            name="body"
            ref={register({
              minLength: 6,
            })}
            defaultValue={inputBody}
            type="text"
            required
            placeholder="Text"
            disabled={isLoading}
          />
          {errors.body && <p className={classes.error}>Text должен быть не менее 6 и не более 1500 символов </p>}
        </label>
        <label htmlFor="forTags">
          <div className={classes.tabs_form}>
            <div className={classes.tabs_form_left}>
              <div className={classes.formArticle_label}>
                <span className={`${classes.formArticle_input_heading} ${classes.block}`}>Tags</span>
                <div>{arrayTags.map((value) => tagForm(value))}</div>
              </div>
            </div>
            <div className={classes.tabs_form_right}>
              <button type="button" className={classes.btn_tags_add} disabled={isLoading} onClick={() => addTag()}>
                Add tag
              </button>
            </div>
          </div>
        </label>
        <input
          htmlFor="creat_form"
          value="Send"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={classes.btn_form}
        />
      </form>
    </div>
  );
};

export default FormArticle;

FormArticle.defaultProps = {
  title: '',
  inputTitle: '',
  inputDescription: '',
  inputBody: '',
  tagList: [],
  onSubmit: () => {},
  isLoading: false
};

FormArticle.propTypes = {
  title: PropTypes.string,
  inputTitle: PropTypes.string,
  inputDescription: PropTypes.string,
  inputBody: PropTypes.string,
  tagList: PropTypes.array,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};