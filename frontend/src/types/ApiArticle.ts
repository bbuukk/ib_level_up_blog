import User from './ApiUser';
import Comment from './ApiComment';
import ApiTag from './ApiTag';

//TODO: should be splitted in two interfaces?
interface ApiArticle {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  cover_url?: string;
  author_id: number;
  author?: User;
  tags?: ApiTag[];
  comments?: Comment[];
  cover?: File | null;
}

export default ApiArticle;
