import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersTable } from '../../components/UsersTable/UsersTable';
import { Pagination } from '../../components/Pagination/Pagination';
import { apiClient } from '../../api/client';
import { User, PaginationMeta } from '../../types';
import './UsersPage.css';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    perPage: 10,
    total: 0,
  });
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.getUsers(pagination.page, pagination.perPage);
      setUsers(response.data);
      setTotalPages(response.meta.pagination.pages);
      setPagination(prev => ({
        ...prev,
        total: response.meta.pagination.total,
      }));
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [pagination.page, pagination.perPage]);

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination({ page: 1, perPage, total: 0 });
  };

  return (
    <div className="users-page">
      <UsersTable
        users={users}
        onRowClick={handleUserClick}
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