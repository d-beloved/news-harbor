import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector } from '../hooks/store.hook';
import { ArticleDetail } from '../components/article/ArticleDetail';
import { RelatedArticles } from '../components/article/RelatedArticles';
import { EmptyState } from '../components/common/EmptyState';

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articles = useAppSelector((state) => state.articles.items);
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <EmptyState 
          message="Article not found" 
          icon={
            <button 
              className="btn btn-primary mt-4"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ArticleDetail article={article} />
      <RelatedArticles currentArticle={article} />
    </div>
  );
};

export default Article;