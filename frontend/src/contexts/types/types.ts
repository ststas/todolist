import { Task } from '../../types/types';
import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface ContextValues {
  joinedData: Task[];
  setJoinedData: Dispatch<SetStateAction<Task[]>>;
  dataLength: number;
  setDataLength: Dispatch<SetStateAction<number>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  findTask(id: string): Task | undefined;
  taskToShow: Task | undefined;
  setTaskToShow: Dispatch<SetStateAction<Task | undefined>>;
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
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updatedTask: Task;
  setUpdatedTask: Dispatch<SetStateAction<Task>>;
}
export interface ContextProviderProps extends ContextValues {
  children: ReactNode;
}
