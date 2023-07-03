import { UniversityInterface } from 'interfaces/university';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  content: string;
  university_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  university?: UniversityInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  university_id?: string;
  user_id?: string;
}
