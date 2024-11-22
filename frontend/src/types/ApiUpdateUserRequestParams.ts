interface ApiUpdateUserRequestParams {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  avatar?: File | null;
  [key: string]: string | number | File | null | undefined;
}

export default ApiUpdateUserRequestParams;
