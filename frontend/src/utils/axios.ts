import axios from 'axios';

import ApiPaginatedRequestParams from 'types/ApiPaginatedRequestParams';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import ApiUserArticlesRequestParams from 'features/profile/types/ApiUserArticlesRequestParams';
import ApiUpdateUserRequestParams from 'types/ApiUpdateUserRequestParams';
import ApiArticleRequestParams from 'types/ApiArticleRequestParams';

import ApiLoginResponse from 'features/authentication/types/ApiLoginResponse';
import LoginForm from 'features/authentication/types/LoginForm';
import ApiArticle from 'types/ApiArticle';
import ApiPaginatedResponse from 'types/ApiPaginatedResponse';
import ApiUser from 'types/ApiUser';
import Comment from 'types/ApiComment';
import CreateArticleFormData from 'types/CreateArticvleFormData';
import { PAGE_SIZE } from './constants';
import { transformObjectToFormData } from './transformObjectToFormData';
import ApiTag from 'types/ApiTag';

export const axiosBaseConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosBaseConfig);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const login = async (data: LoginForm) => {
  const response = await axiosInstance<ApiLoginResponse>({
    method: 'POST',
    url: '/api/login',
    data
  });

  console.log(response.data);

  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance<ApiUser>({
    method: 'GET',
    url: '/api/me'
  });

  return response.data;
};

export const storeComment = async (
  articleId: number,
  comment: string
): Promise<Comment> => {
  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles/${articleId}/comments`,
    data: {
      content: comment
    }
  });

  return response.data;
};

export const getArticles = async (params: ApiArticlesIndexRequestParams) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axiosInstance<ApiPaginatedResponse<ApiArticle>>({
        method: 'GET',
        url: '/api/articles',
        params: {
          ...params,
          perPage: PAGE_SIZE
        }
      });
      resolve(response.data);
    }, 5000);
  });
};

// export const getArticles = async (params: ApiArticlesIndexRequestParams) => {
//   const response = await axiosInstance<ApiPaginatedResponse<ApiArticle>>({
//     method: 'GET',
//     url: '/api/articles',
//     params: {
//       ...params,
//       perPage: PAGE_SIZE
//     }
//   });
//
//   return response.data;
// };

export const createArticle = async (data: CreateArticleFormData) => {
  const response = await axiosInstance<CreateArticleFormData>({
    method: 'POST',
    url: '/api/articles',
    data
  });

  return response.data;
};

//TODO!: reuse getArticles better
export const getUserArticles = async (params: ApiUserArticlesRequestParams) => {
  const response = await axiosInstance<ApiPaginatedResponse<ApiArticle>>({
    method: 'GET',
    url: '/api/articles',
    params: {
      ...params,
      perPage: PAGE_SIZE
    }
  });

  return response.data;
};

export const updateUser = async (params: ApiUpdateUserRequestParams) => {
  const formData = transformObjectToFormData(params);

  formData.append('_method', 'put');

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/users/${params.id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axiosInstance({
    method: 'DELETE',
    url: `/api/users/${userId}`
  });

  return response.data;
};

type ApiArticleRequestParamsWithoutId = Omit<ApiArticleRequestParams, 'id'>;
export const storeArticle = async (
  params: ApiArticleRequestParamsWithoutId
) => {
  const formData = transformObjectToFormData(params);

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  console.log(response.data);

  return response.data;
};

export const updateArticle = async (params: ApiArticleRequestParams) => {
  const formData = transformObjectToFormData(params);

  formData.append('_method', 'put');

  const response = await axiosInstance({
    method: 'POST',
    url: `/api/articles/${params.id}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const deleteArticle = async (articleId: number) => {
  const response = await axiosInstance({
    method: 'DELETE',
    url: `/api/articles/${articleId}`
  });

  return response.data;
};

export const getArticleById = async (articleId: number) => {
  const response = await axiosInstance<ApiArticle>({
    method: 'GET',
    url: `/api/articles/${articleId}`
  });

  return response.data;
};

export const getTags = async (params: ApiPaginatedRequestParams) => {
  const response = await axiosInstance<ApiPaginatedResponse<ApiTag>>({
    method: 'GET',
    url: '/api/tags',
    params: {
      ...params,
      perPage: PAGE_SIZE
    }
  });

  return response.data;
};
