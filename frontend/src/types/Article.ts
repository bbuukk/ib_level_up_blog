import User from './ApiUser';
import Comment from './Comment';

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: number;
  author?: User;
  comments?: Comment[];
}

export default Article;
