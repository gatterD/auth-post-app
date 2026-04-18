import React from 'react';
import { Loader } from '@consta/uikit/Loader';
import { User } from '../../types';
import './UsersTable.css';

interface UsersTableProps {
  users: User[];
  onRowClick: (user: User) => void;
  loading?: boolean;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onRowClick, loading }) => {
  if (loading) {
    return (
      <div className="users-table__loading">
        <Loader size="m" />
        <span>Загрузка пользователей...</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="users-table__empty">
        Нет данных для отображения
      </div>
    );
  }

  const getFirstName = (fullName: string): string => {
    return fullName.split(' ')[0] || fullName;
  };

  const getLastName = (fullName: string): string => {
    const parts = fullName.split(' ');
    return parts.slice(1).join(' ') || '—';
  };

  return (
    <div className="users-table">
      <table className="users-table__table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => onRowClick(user)}>
              <td>{getFirstName(user.name)}</td>
              <td>{getLastName(user.name)}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};