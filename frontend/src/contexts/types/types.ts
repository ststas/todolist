import { Task } from '../../types/types';
import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface ContextValues {
  joinedData: Task[];
  setJoinedData: Dispatch<SetStateAction<Task[]>>;
  dataLength: number;
  setDataLength: Dispatch<SetStateAction<number>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  findTest(id: string): Task | undefined;
  testToShow: Task | undefined;
  setTestToShow: Dispatch<SetStateAction<Task | undefined>>;
  direction: string;
  setDirection: Dispatch<SetStateAction<string>>;
  sortedField: string;
  setSortedField: Dispatch<SetStateAction<string>>;
  createTask(data: Task): Task | void;
  updateTask(data: Task): Task | void;
  deleteTask(id: string): Task | void;
  isNewTaskPopupOpen: boolean;
  setIsNewTaskPopupOpen: Dispatch<SetStateAction<boolean>>;
  isUpdateTaskPopupOpen: boolean;
  setIsUpdateTaskPopupOpen: Dispatch<SetStateAction<boolean>>;
  isFetching: boolean;
  setIsFetching: Dispatch<SetStateAction<boolean>>;
  updatedTask: Task;
  setUpdatedTask: Dispatch<SetStateAction<Task>>;
}
export interface ContextProviderProps extends ContextValues {
  children: ReactNode;
}
