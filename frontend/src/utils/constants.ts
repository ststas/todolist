import { Status } from '../types/types';

export const BASE_URL: string = 'https://api.todolist.nomoredomainsicu.ru';

export const StatusOptions: Status[] = [
  Status.PENDING,
  Status.IN_PROGRESS,
  Status.COMPLETED,
];

export const requiredFieldError = 'Please fill in this field.';
