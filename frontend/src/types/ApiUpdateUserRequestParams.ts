interface ApiUpdateUserRequestParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  avatar?: File | null;
}

export default ApiUpdateUserRequestParams;
