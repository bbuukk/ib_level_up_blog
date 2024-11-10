import User from './ApiUser';

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: number;
  author: User;
}

export default Article;
