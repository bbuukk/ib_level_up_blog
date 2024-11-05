import { useQuery } from '@tanstack/react-query';
import { getArticles } from 'utils/axios';

const useGetArticles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  return { data, isLoading, error };
};

export default useGetArticles;
