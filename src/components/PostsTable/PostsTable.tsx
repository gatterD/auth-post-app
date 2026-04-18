import React from 'react';
import { Loader } from '@consta/uikit/Loader';
import { Post } from '../../types';
import './PostsTable.css';

interface PostsTableProps {
  posts: Post[];
  onRowClick: (post: Post) => void;
  loading?: boolean;
}

export const PostsTable: React.FC<PostsTableProps> = ({ posts, onRowClick, loading }) => {
  if (loading) {
    return (
      <div className="posts-table__loading">
        <Loader size="m" />
        <span>Загрузка постов...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="posts-table__empty">
        Нет данных для отображения
      </div>
    );
  }

  return (
    <div className="posts-table">
      <table className="posts-table__table">
        <thead>
          <tr>
            <th style={{ width: '100px' }}>ID</th>
            <th>Заголовок</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => onRowClick(post)}>
              <td>{post.id}</td>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};