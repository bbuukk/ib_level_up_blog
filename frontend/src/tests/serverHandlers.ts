import ApiUser from 'types/ApiUser';
import { http, HttpResponse } from 'msw';

const stubForGetMe: ApiUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  email_verified_at: '2023-01-01T00:00:00Z',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z'
};

export const handlers = [
  http.get('http://localhost:8000/api/me', () => {
    return HttpResponse.json(stubForGetMe, { status: 200 });
  })
];
