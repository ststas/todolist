export enum Status {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN PROGRESS',
  PENDING = 'PENDING',
}

export interface Task {
  _id: string;
  task: string;
  status: Status;
  deadlineDate: Date | string;
  createdAt: Date;
}
