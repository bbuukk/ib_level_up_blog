import User from './ApiUser';
import Comment from './ApiComment';

interface ApiArticle {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author_id: number;
  author?: User;
  comments?: Comment[];
}

export default ApiArticle;
