import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUser } from 'utils/axios';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });

  return mutation;
};

export default useUpdateUser;
