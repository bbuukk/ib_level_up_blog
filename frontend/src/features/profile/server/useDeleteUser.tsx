import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteUser } from 'utils/axios';

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });

  return mutation;
};

export default useDeleteUser;
