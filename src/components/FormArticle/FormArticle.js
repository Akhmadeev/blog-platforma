import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const FormArticle = ({ title, onSubmit, inputTitle, inputDescription, inputBody, tagList, isLoading }) => {
  const [arrayTags, setArrayTags] = useState(['', '']);

  const { register, handleSubmit } = useForm();

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
      <div key={name + count}>
        <input
          className="createArticle_input size_s"
          defaultValue={name}
          name={count}
          ref={register}
          type="text"
          placeholder="Tag"
        />
        <button type="button" onClick={() => deleteTag(name)} className="btn_tags_delete">
          Delete
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (tagList.length > 0) setArrayTags(tagList);
  }, []);

  console.log(isLoading);

  return (
    <div className="createArticle">
      <form className="createArticle_main">
        <h3 className="createArticle_title">{title}</h3>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Title</span>
          <input
            className="createArticle_input"
            name="title"
            ref={register}
            defaultValue={inputTitle}
            type="text"
            required
            placeholder="Title"
          />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Short description</span>
          <input
            className="createArticle_input"
            name="description"
            ref={register}
            defaultValue={inputDescription}
            type="text"
            required
            placeholder="Short description"
          />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Text</span>
          <textarea
            className="createArticle_input size_xl"
            name="body"
            ref={register}
            defaultValue={inputBody}
            type="text"
            required
            placeholder="Text"
          />
        </label>
        <label htmlFor="forTags">
          <div className="tabs_form">
            <div className="tabs_form_left">
              <div className="createArticle_label">
                <span className="createArticle_input_heading block">Tags</span>
                <div>{arrayTags.map((value) => tagForm(value))}</div>
              </div>
            </div>
            <div className="tabs_form_right">
              <button type="button" className="btn_tags_add" onClick={() => addTag()}>
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
          className="btn_form"
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