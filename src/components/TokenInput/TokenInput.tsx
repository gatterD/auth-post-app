import React, { useState, useEffect } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { useTokenStore } from '../../store/tokenStore';
import { apiClient } from '../../api/client';
import './TokenInput.css';

export const TokenInput: React.FC = () => {
  const { token, setToken } = useTokenStore();
  const [inputValue, setInputValue] = useState(token);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      apiClient.setToken(token);
    }
  }, [token]);

  const handleSave = () => {
    if (!inputValue.trim()) {
      setError('Токен не может быть пустым');
      return;
    }
    setError(null);
    setToken(inputValue.trim());
  };

  const handleChange = (value: string | null) => {
    setInputValue(value || '');
    if (error) setError(null);
  };

  return (
    <div className="token-input">
      <TextField
        value={inputValue}
        onChange={handleChange}
        placeholder="Введите Access Token"
        type="password"
        status={error ? 'alert' : undefined}
        caption={error || undefined}
      />
      <Button
        label="Сохранить токен"
        view="primary"
        onClick={handleSave}
        size="m"
      />
    </div>
  );
};