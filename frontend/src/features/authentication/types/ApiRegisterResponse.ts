import ApiUser from 'types/ApiUser';

interface ApiRegisterResponse extends ApiUser {
  token?: {
    type?: string;
    plainTextToken?: string;
  };
}

export default ApiRegisterResponse;
