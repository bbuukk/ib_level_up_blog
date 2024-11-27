import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiRegisterResponse from '../types/ApiRegisterResponse';
import { register } from 'utils/axios';

const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: (data: ApiRegisterResponse) => {
      localStorage.setItem('token', data?.token?.plainTextToken as string);

      // we want to re fetch the me query to get the new user data, since we got authenticated
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });
};

export default useRegister;
