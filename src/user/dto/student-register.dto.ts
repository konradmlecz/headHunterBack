import { UserRole } from '../../types/user';
import { IsEmail } from 'class-validator';

export class registerStudent {
  email: string;
  courseCompletion: number;
  courseEngagment: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string;
  role: UserRole;
}
