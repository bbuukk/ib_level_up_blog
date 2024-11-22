interface EditUserForm {
  email?: string;
  name?: string;
  password?: string;
  password_confirmation?: string;
  avatar?: File | null;
}

export default EditUserForm;
