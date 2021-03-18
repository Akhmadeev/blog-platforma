import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const FormArticle = ({ title, onSubmit, inputTitle, inputDescription, inputBody }) => {

  const [array, setArray] = useState([1, 2])
  
  const { register, handleSubmit } = useForm();

  const addTag = () => {
    const newArray = array.slice();
    newArray.push(Math.floor(Math.random() * 100));
    setArray(newArray);
  }


  const deleteTag = (name) => {
    const idx = array.indexOf(name);
    const newArray = [...array.slice(0, idx), ...array.slice(idx + 1)];
    setArray(newArray)
  }

  const tagForm = (name) => (
    <div key={name}>
      <input className="createArticle_input size_s" name={name} ref={register} type="text" placeholder="Tag" />
      <button type="button" onClick={() => deleteTag(name)} className="btn_tags_delete">
        Delete
      </button>
    </div>
  );

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
                <div>{array.map((value) => tagForm(value))}</div>
              </div>
            </div>
            <div className="tabs_form_right">
              <button type="button" className="btn_tags_add" onClick={() => addTag()}>
                Add tag
              </button>
            </div>
          </div>
        </label>
        <input htmlFor="creat_form" value="Send" type="submit" onClick={handleSubmit(onSubmit)} className="btn_form" />
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
  onSubmit: () => {},
};

FormArticle.propTypes = {
  title: PropTypes.string,
  inputTitle: PropTypes.string,
  inputDescription: PropTypes.string,
  inputBody: PropTypes.string,
  onSubmit: PropTypes.func,
};