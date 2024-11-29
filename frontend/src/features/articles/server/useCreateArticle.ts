import { useQueryClient, useMutation } from '@tanstack/react-query';
import { storeArticle } from 'utils/axios';

const useCreateArticle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: storeArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  return mutation;
};

export default useCreateArticle;
