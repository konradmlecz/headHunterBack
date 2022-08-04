import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentStatus, UserRole } from '../types/user';
import { expectedContractType, expectedTypeWork } from 'src/types/student';

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

  @Column({
    default: null,
  })
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
  company: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  maxReservedStudents: number | null;

  // Fields for students

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: StudentStatus,
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
  expectedTypeWork: expectedTypeWork | null;

  @Column({
    nullable: true,
    default: null,
  })
  targetWorkCity: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  expectedContractType: expectedContractType | null;

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

  @Column('text', {
    nullable: true,
    default: null,
  })
  education: string | null;

  @Column('text', {
    nullable: true,
    default: null,
  })
  workExperience: string | null;

  @Column('text', {
    nullable: true,
    default: null,
  })
  courses: string | null;

  @Column('int', {
    nullable: true,
    default: null,
  })
  courseCompletion: number | null;

  @Column('int', {
    nullable: true,
    default: null,
  })
  courseEngagement: number | null;

  @Column('int', {
    nullable: true,
    default: null,
  })
  projectDegree: number | null;

  @Column('int', {
    nullable: true,
    default: null,
  })
  teamProjectDegree: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  bonusProjectUrls: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  addedToInterviewAt: Date | null;

  @ManyToOne((type) => User, (entity) => entity.interviewStudent)
  headHunter: User;

  @OneToMany((type) => User, (entity) => entity.headHunter)
  interviewStudent: User[];
}
