import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { User, Post, Comment, PaginatedResponse } from '../types';

class ApiClient {
  private client: AxiosInstance;
  private token: string = '';

  constructor() {
    this.client = axios.create({
      baseURL: 'https://gorest.co.in/public/v2',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string) {
    this.token = token;
  }

  // Users
  async getUsers(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<User>> {
    const response = await this.client.get('/users', {
      params: { page, per_page: perPage },
    });
    const total = parseInt(response.headers['x-pagination-total'] || '0');
    const pages = parseInt(response.headers['x-pagination-pages'] || '1');
    
    return {
      data: response.data,
      meta: {
        pagination: {
          total,
          pages,
          page,
          limit: perPage,
        },
      },
    };
  }

  async getUser(id: number): Promise<User> {
    const response = await this.client.get(`/users/${id}`);
    return response.data;
  }

  // Posts
  async getPosts(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get('/posts', {
      params: { page, per_page: perPage },
    });
    const total = parseInt(response.headers['x-pagination-total'] || '0');
    const pages = parseInt(response.headers['x-pagination-pages'] || '1');
    
    return {
      data: response.data,
      meta: {
        pagination: {
          total,
          pages,
          page,
          limit: perPage,
        },
      },
    };
  }

  async getPost(id: number): Promise<Post> {
    const response = await this.client.get(`/posts/${id}`);
    return response.data;
  }

  // Comments
  async getComments(postId: number): Promise<Comment[]> {
    const response = await this.client.get(`/posts/${postId}/comments`);
    return response.data;
  }
}

export const apiClient = new ApiClient();