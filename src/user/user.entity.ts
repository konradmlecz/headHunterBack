import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StudentStatus, UserRole } from '../types/user';

@Entity()
export class User extends BaseEntity {
  // Primary fields of all users

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column()
  pwd: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    nullable: false,
    default: 'student',
  })
  role: UserRole;

  // Fields for HR

  @Column({
    nullable: true,
    default: null,
  })
  fullName: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  company: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  maxReservedStudents: number | null;

  // Fields for students

  @Column({
    nullable: true,
    default: null,
  })
  isActive: boolean | null;

  @Column({
    nullable: true,
    default: null,
  })
  status: StudentStatus | null;

  @Column({
    nullable: true,
    default: null,
  })
  phone: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  firstName: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  lastName: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  githubUsername: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  portfolioUrls: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  projectUrls: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  bio: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  expectedTypeWork: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  targetWorkCity: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  expectedContractType: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  expectedSalary: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  canTakeApprenticeship: boolean | null;

  @Column({
    nullable: true,
    default: null,
  })
  monthsOfCommercialExp: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  education: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  workExperience: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  courses: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  courseCompletion: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  courseEngagment: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  projectDegree: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  teamProjectDegree: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  bonusProjectUrls: string | null;
}
