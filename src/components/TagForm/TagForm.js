import React from 'react';
import { useForm } from 'react-hook-form';

const TagForm = () => {

    
  const { register } = useForm();


      
    const formOneTag = () => {
        console.log('1')
        return (
              
            )
     }
   
    return (
      <div className="tabs_form">
        <div className="tabs_form_left">
          <div className="createArticle_label">
            <span className="createArticle_input_heading block">Tags</span>
            {formOneTag()}
          </div>
        </div>
        <div className="tabs_form_right">
          <button type="button" className="btn_tags_add">
            Add tag
          </button>
        </div>
      </div>
    );
     

}

export default TagForm;