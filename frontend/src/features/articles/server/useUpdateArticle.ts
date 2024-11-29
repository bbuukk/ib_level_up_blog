import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateArticle } from 'utils/axios';

const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  return mutation;
};

export default useUpdateArticle;
