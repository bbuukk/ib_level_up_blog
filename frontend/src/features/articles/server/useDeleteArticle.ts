import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteArticle } from 'utils/axios';

const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles']
      });
    }
  });

  return mutation;
};

export default useDeleteArticle;
