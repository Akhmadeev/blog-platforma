import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import * as action from '../../store/action';
import './Article.scss';
import Services from '../../ApiService';
import FavoriteArticle from '../FavoriteArticle/FavoriteArticle';
import SpinErr from '../SpinErr/SpinErr';


const Article = ({ itemId, add_item, user }) => {
  const [guest, setGuest] = useState(true);
  const [article, setArticle] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const apiService = new Services();

    useEffect(() => {
      apiService
        .getItem(itemId)
        .then((result) => {
          add_item(result.article);
          if (result.article.author.username === user.username) setGuest(false);
          return setArticle(result.article);
        })
        .catch(() => <SpinErr />);
    }, []);



  const item = (element, bool) => {

    const { title, body, slug, updatedAt } = element;
    const { username, image } = element.author;

    
  const removeArticle = () => {
    apiService
      .deleteArticle(slug)
      .then(() => setArticle('Redirect'))
      .catch(() => SpinErr);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    removeArticle();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


        const btnService = () => (
          <div className="article_btn">
            <Button className="article_btn_delete" onClick={showModal}>
              Delete
            </Button>
            <Modal title="Warning" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>Вы точно хотите удалить статью???</p>
            </Modal>

            <button className="article_btn_editing" type="button">
              Edit
            </button>
          </div>
        );


    return (
      <div className="activeItem" key={slug}>
        <div className="activeItem_header">
          <div className="activeItem_left">
            <span className="activeItem_header_left_block">
              <span className="activeItem_title">{title} </span>
              <FavoriteArticle  slug={slug} />
            </span>
            <span className="activeItem_tag"> Tag</span>
            <span className="activeItem_text">{title}</span>
          </div>
          <div className="activeItem_right">
            <div className="activeItem_info_user">
              <div className="activeItem_info">
                <span className="activeItem_user_name">{username}</span>
                <span className="activeItem_date_post">{format(new Date(updatedAt), 'MMMM d, u')}</span>
              </div>
              <div>
                <img src={image} alt="logo" className="activeItem_user_logo" />
              </div>
            </div>
            {!bool ? btnService() : bool}
          </div>
        </div>
        <div className="activeItem_main">
          <ReactMarkdown children={body} />
        </div>
      </div>
    );
  };

  if (article === 'Redirect') return <Redirect to="/my_article" />;
  if (article.length < 1 ) return <div>{SpinErr()}</div>;

  return <div className="activeItem_block">{article && item(article, guest)}</div>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, action)(Article);

Article.defaultProps = {
  user: {},
  itemId: '',
  add_item: () => {},
};

Article.propTypes = {
  user: PropTypes.object,
  add_item: PropTypes.func,
  itemId: PropTypes.string,
};