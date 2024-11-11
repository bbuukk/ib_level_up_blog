import User from './ApiUser';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  article_id: number;
  author_id: number;
  author?: User;
}

export default Comment;
