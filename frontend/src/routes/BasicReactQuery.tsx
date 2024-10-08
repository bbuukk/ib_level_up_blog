import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
}

const BasicReactQuery = () => {
  const fetchData = async () => {
    const response = await axios.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Basic React Query</h1>
      <div>{data?.map((item) => <li key={item.id}>{item.title}</li>)}</div>
    </div>
  );
};

export default BasicReactQuery;
