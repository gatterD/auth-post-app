import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { apiClient } from '../../api/client';
import { Post, Comment } from '../../types';
import './PostDetailPage.css';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      setLoading(true);
      setCommentsLoading(true);
      
      try {
        const [postData, commentsData] = await Promise.all([
          apiClient.getPost(parseInt(id)),
          apiClient.getComments(parseInt(id)),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
        setCommentsLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="post-detail-page post-detail-page--loading">
        <Loader size="m" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-page">
        <Text>Пост не найден</Text>
        <Button label="Назад" onClick={handleBack} />
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <Button
        iconLeft={IconArrowLeft}
        label="Назад к списку"
        view="ghost"
        onClick={handleBack}
        className="post-detail-page__back"
      />
      
      <Card shadow className="post-detail-page__card">
        <Text size="2xl" as="h1" weight="bold" className="post-detail-page__title">
          {post.title}
        </Text>
        
        <div className="post-detail-page__meta">
          <Text view="secondary">ID: {post.id}</Text>
          <Text view="secondary">User ID: {post.user_id}</Text>
        </div>
        
        <div className="post-detail-page__body">
          <Text size="l" as="p">
            {post.body}
          </Text>
        </div>
      </Card>
      
      <Card shadow className="post-detail-page__comments">
        <Text size="xl" as="h2" weight="semibold" className="post-detail-page__comments-title">
          Комментарии ({comments.length})
        </Text>
        
        {commentsLoading ? (
          <div className="post-detail-page__comments-loading">
            <Loader size="s" />
            <Text view="secondary">Загрузка комментариев...</Text>
          </div>
        ) : comments.length === 0 ? (
          <Text view="secondary" className="post-detail-page__comments-empty">
            Нет комментариев
          </Text>
        ) : (
          <div className="post-detail-page__comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="post-detail-page__comment">
                <div className="post-detail-page__comment-header">
                  <Text weight="bold">{comment.name}</Text>
                  <Text view="secondary" size="s">{comment.email}</Text>
                </div>
                <Text className="post-detail-page__comment-body">
                  {comment.body}
                </Text>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};