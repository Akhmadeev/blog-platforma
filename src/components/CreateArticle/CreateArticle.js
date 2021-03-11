import React from 'react';
import { useForm } from 'react-hook-form';
import './createArticle.scss';

function CreateArticle() {

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => data;

  return (
    <div className="createArticle">
      <form className="createArticle_main" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="createArticle_title">Create new article</h3>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Title</span>
          <input className="createArticle_input" ref={register} type="text" required placeholder="Title" />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Short description</span>
          <input className="createArticle_input" ref={register} type="text" required placeholder="Short description" />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Text</span>
          <input className="createArticle_input size_xl" ref={register} type="text" required placeholder="Text" />
        </label>
      </form>
    </div>
  );
}

export default CreateArticle;