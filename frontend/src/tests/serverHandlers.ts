import ApiUser from 'types/ApiUser';
import { http, HttpResponse } from 'msw';
import ApiArticle from 'types/ApiArticle';
import ApiPaginatedResponse from 'types/ApiPaginatedResponse';

//TODO: refactor
const stubForGetMe: ApiUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  email_verified_at: '2023-01-01T00:00:00Z',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z'
};

const stubForGetArticleById: ApiArticle = {
  id: 1,
  created_at: '2024-04-17T21:22:46.000000Z',
  updated_at: '2024-04-17T21:22:46.000000Z',
  title: 'test title',
  content: 'test content',
  author_id: 32,
  cover_url: 'http://localhost:8000/storage/covers//6745dcdc2955a.jpg',
  author: {
    id: 32,
    name: 'Dr. Constantin West',
    email: 'user3@example.com',
    email_verified_at: '2024-11-26T14:36:03.000000Z',
    created_at: '2024-11-26T14:36:09.000000Z',
    updated_at: '2024-11-26T14:36:09.000000Z',
    avatar_url: undefined
  },
  tags: []
};

const stubForArticlesPage: ApiPaginatedResponse<ApiArticle> = {
  current_page: 1,
  data: [stubForGetArticleById],
  first_page_url:
    'http://localhost:8000/api/articles?perPage=5&sort%5Bcreated_at%5D=desc&filter%5BauthorId%5D=5&page=1',
  from: null,
  last_page: 1,
  last_page_url:
    'http://localhost:8000/api/articles?perPage=5&sort%5Bcreated_at%5D=desc&filter%5BauthorId%5D=5&page=1',
  links: [
    {
      url: null,
      label: '&laquo; Previous',
      active: false
    },
    {
      url: 'http://localhost:8000/api/articles?perPage=5&sort%5Bcreated_at%5D=desc&filter%5BauthorId%5D=5&page=1',
      label: '1',
      active: true
    },
    {
      url: null,
      label: 'Next &raquo;',
      active: false
    }
  ],
  next_page_url: null,
  path: 'http://localhost:8000/api/articles',
  per_page: 5,
  prev_page_url: null,
  to: null,
  total: 0
};

export const handlers = [
  http.get('http://localhost:8000/api/me', () => {
    return HttpResponse.json(stubForGetMe, { status: 200 });
  }),
  http.get('http://localhost:8000/api/articles/1', () => {
    return HttpResponse.json(stubForGetArticleById, { status: 200 });
  }),
  http.get('http://localhost:8000/api/articles', () => {
    return HttpResponse.json(stubForArticlesPage, { status: 200 });
  })
];
