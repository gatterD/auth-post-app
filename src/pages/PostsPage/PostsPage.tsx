import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostsTable } from '../../components/PostsTable/PostsTable';
import { Pagination } from '../../components/Pagination/Pagination';
import { apiClient } from '../../api/client';
import { Post, PaginationMeta } from '../../types';
import './PostsPage.css';

export const PostsPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    perPage: 10,
    total: 0,
  });
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getPosts(pagination.page, pagination.perPage);
      setPosts(response.data);
      setTotalPages(response.meta.pagination.pages);
      setPagination(prev => ({
        ...prev,
        total: response.meta.pagination.total,
      }));
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [pagination.page, pagination.perPage]);

  const handlePostClick = (post: Post) => {
    navigate(`/posts/${post.id}`);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination({ page: 1, perPage, total: 0 });
  };

  return (
    <div className="posts-page">
      <PostsTable
        posts={posts}
        onRowClick={handlePostClick}
        loading={loading}
      />
      
      {totalPages > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
          perPage={pagination.perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
};