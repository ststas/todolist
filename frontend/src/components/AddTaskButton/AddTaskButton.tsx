import './AddTaskButton.css';
import { FC, useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';

export const AddTaskButton: FC = () => {
  const { setIsNewTaskPopupOpen } = useContext(GeneralContext);
  return (
    <button
      type="button"
      className="add-task-button"
      onClick={() => setIsNewTaskPopupOpen(true)}
    >
      Add New Task
    </button>
  );
};
