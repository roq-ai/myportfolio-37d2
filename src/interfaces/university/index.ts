import { DModelInterface } from 'interfaces/d-model';
import { CommentInterface } from 'interfaces/comment';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface UniversityInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  d_model?: DModelInterface[];
  comment?: CommentInterface[];
  user?: UserInterface;
  _count?: {
    d_model?: number;
    comment?: number;
  };
}

export interface UniversityGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
