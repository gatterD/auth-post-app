import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { Badge } from '@consta/uikit/Badge';
import { Loader } from '@consta/uikit/Loader';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { apiClient } from '../../api/client';
import { User } from '../../types';
import './UserDetailPage.css';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await apiClient.getUser(parseInt(id));
        setUser(data);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="user-detail-page user-detail-page--loading">
        <Loader size="m" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail-page">
        <Text>Пользователь не найден</Text>
        <Button label="Назад" onClick={handleBack} />
      </div>
    );
  }

  return (
    <div className="user-detail-page">
      <Button
        iconLeft={IconArrowLeft}
        label="Назад к списку"
        view="ghost"
        onClick={handleBack}
        className="user-detail-page__back"
      />
      
      <Card shadow className="user-detail-page__card">
        <div className="user-detail-page__header">
          <Text size="3xl" as="h1" weight="bold">
            {user.name}
          </Text>
          <Badge
            label={user.status === 'active' ? 'Активен' : 'Неактивен'}
            status={user.status === 'active' ? 'success' : 'warning'}
            size="m"
          />
        </div>
        
        <div className="user-detail-page__info">
          <div className="user-detail-page__row">
            <Text view="secondary">ID:</Text>
            <Text>{user.id}</Text>
          </div>
          <div className="user-detail-page__row">
            <Text view="secondary">Email:</Text>
            <Text>{user.email}</Text>
          </div>
          <div className="user-detail-page__row">
            <Text view="secondary">Пол:</Text>
            <Text>
              {user.gender === 'male' ? 'Мужской' : user.gender === 'female' ? 'Женский' : user.gender}
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};