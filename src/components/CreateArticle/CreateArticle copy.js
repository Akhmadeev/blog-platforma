import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './createArticle.scss';
import Services from '../../ApiService';

function CreateArticle() {

  const [data, setData] = useState(false)

  const apiService = new Services();

  const { register, handleSubmit } = useForm();
  const onSubmit = (obj) => {
    const { title, description, body } = obj;
    apiService.createArticle(title, description, body).then((result) => {
      const { slug } = result.article;
      setData(slug);
    });
  };

  if (data) return <Redirect to={`/articles/${data}`} />;
  
  return (
    <div className="createArticle">
      <form className="createArticle_main" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="createArticle_title">Create new article</h3>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Title</span>
          <input className="createArticle_input" name="title" ref={register} type="text" required placeholder="Title" />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Short description</span>
          <input
            className="createArticle_input"
            name="description"
            ref={register}
            type="text"
            required
            placeholder="Short description"
          />
        </label>
        <label className="createArticle_label">
          <span className="createArticle_input_heading">Text</span>
          <input
            className="createArticle_input size_xl"
            name="body"
            ref={register}
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
                <div>
                  <input
                    className="createArticle_input size_s"
                    name="tag"
                    ref={register}
                    type="text"
                    placeholder="Tag"
                  />
                  <button type="button" className="btn_tags_delete">
                    Delete
                  </button>
                </div>
                <div>
                  <input
                    className="createArticle_input size_s"
                    name="tag"
                    ref={register}
                    type="text"
                    placeholder="Tag"
                  />
                  <button type="button" className="btn_tags_delete">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="tabs_form_right">
              <button type="button" className="btn_tags_add">
                Add tag
              </button>
            </div>
          </div>
        </label>
        <input htmlFor="creat_form" value="Send" type="submit" className="btn_form" />
      </form>
    </div>
  );
}

export default CreateArticle;