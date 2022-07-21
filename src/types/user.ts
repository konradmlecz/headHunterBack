export enum UserRole {
  ADMIN = 'admin',
  HR = 'hr',
  STUDENT = 'student',
}

export enum StudentStatus {
  AVAILABLE = 'available',
  INCONVERSATION = 'in_conversation',
}

export type registerUserResponse = {
  isSuccess: true;
};
