export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr',
  STUDENT = 'student',
}

export enum StudentStatus {
  AVAILABLE = 'available',
  INTERVIEW = 'interview',
  EMPLOYED = 'employed',
}

export type changePasswordResponse = {
  isSuccess: true;
};
