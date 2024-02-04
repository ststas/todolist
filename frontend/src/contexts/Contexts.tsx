import { FC } from 'react';

import { ContextProviderProps } from './types/types';
import { GeneralContext } from './GeneralContext';

export const Contexts: FC<ContextProviderProps> = ({
  children,
  joinedData,
  setJoinedData,
  dataLength,
  setDataLength,
  searchText,
  setSearchText,
  findTask,
  taskToShow,
  setTaskToShow,
  direction,
  setDirection,
  sortedField,
  setSortedField,
  createTask,
  updateTask,
  deleteTask,
  isNewTaskPopupOpen,
  setIsNewTaskPopupOpen,
  isUpdateTaskPopupOpen,
  setIsUpdateTaskPopupOpen,
  isFetching,
  setIsFetching,
  isLoading,
  setIsLoading,
  updatedTask,
  setUpdatedTask,
}) => {
  return (
    <GeneralContext.Provider
      value={{
        joinedData,
        setJoinedData,
        dataLength,
        setDataLength,
        searchText,
        setSearchText,
        findTask,
        taskToShow,
        setTaskToShow,
        direction,
        setDirection,
        sortedField,
        setSortedField,
        createTask,
        updateTask,
        deleteTask,
        isNewTaskPopupOpen,
        setIsNewTaskPopupOpen,
        isUpdateTaskPopupOpen,
        setIsUpdateTaskPopupOpen,
        isFetching,
        setIsFetching,
        isLoading,
        setIsLoading,
        updatedTask,
        setUpdatedTask,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
