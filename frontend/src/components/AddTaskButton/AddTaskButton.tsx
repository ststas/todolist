import './AddTaskButton.css';
import { FC, useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { AddTaskButtonProps } from './types';

export const AddTaskButton: FC<AddTaskButtonProps> = ({ isLoading }) => {
  const { setIsNewTaskPopupOpen } = useContext(GeneralContext);
  return (
    <button
      disabled={isLoading}
      type="button"
      className={`add-task-button ${isLoading ? 'add-task-button_disabled' : ''}`}
      onClick={() => setIsNewTaskPopupOpen(true)}
    >
      Add New Task
    </button>
  );
};
