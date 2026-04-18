import React, { useState } from 'react';
import { Tabs } from '@consta/uikit/Tabs';
import { Card } from '@consta/uikit/Card';
import { TokenInput } from '../../components/TokenInput/TokenInput';
import { UsersPage } from '../UsersPage/UsersPage';
import { PostsPage } from '../PostsPage/PostsPage';
import { useTokenStore } from '../../store/tokenStore';
import './MainPage.css';

type TabId = 'users' | 'posts';

interface TabItem {
  id: TabId;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'users', label: 'Пользователи' },
  { id: 'posts', label: 'Посты' },
];

export const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabItem>(tabs[0]);
  const { token } = useTokenStore();

  const handleTabChange = (item: TabItem) => {
    setActiveTab(item);
  };

  if (!token) {
    return (
      <div className="main-page">
        <Card className="main-page__token-card" shadow>
          <h1 className="main-page__title">Добро пожаловать</h1>
          <p className="main-page__subtitle">
            Для начала работы введите ваш Access Token от GoRest API.
            <br />
            Получить токен можно на{' '}
            <a href="https://gorest.co.in/consumer/login" target="_blank" rel="noopener noreferrer">
              gorest.co.in
            </a>
          </p>
          <TokenInput />
        </Card>
      </div>
    );
  }

  return (
    <div className="main-page">
      <div className="main-page__header">
        <h1 className="main-page__title">GoRest Client</h1>
        <div className="main-page__token-section">
          <TokenInput />
        </div>
      </div>
      
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        items={tabs}
        getItemLabel={(item: TabItem) => item.label}
        getItemKey={(item: TabItem) => item.id}
        size="m"
        className="main-page__tabs"
      />
      
      <div className="main-page__content">
        {activeTab.id === 'users' ? <UsersPage /> : <PostsPage />}
      </div>
    </div>
  );
};