import { useQueryClient, useMutation } from '@tanstack/react-query';
import { storeComment } from 'utils/axios';

const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: storeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  return mutation;
};

export default useCreateComment;
