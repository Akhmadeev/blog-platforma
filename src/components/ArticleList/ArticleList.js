import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import ArticlePart from '../ArticlePart/ArticlePart';
import './ArticleList.scss';
import SpinErr from '../Error/SpinErr';

const ArticleList = () => {
  const edit_page = useSelector((state) => state.toolkit.page);
  const arrayItem = useSelector((state) => state.toolkit.allArticles[0]);

  if (!arrayItem) return <div>{SpinErr()}</div>;

  const renderArticle = () => arrayItem.map((element) => <ArticlePart key={element.slug} element={element} />);

  return (
    <div>
      <div className="list">{arrayItem && renderArticle()}</div>
      <div className="pagination">
        <Pagination
          size="small"
          total={500}
          onChange={(page) => {
            edit_page(page);
          }}
        />
      </div>
    </div>
  );
};

export default ArticleList;
