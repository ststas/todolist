import './UpdateTaskPopup.css';
import { Task } from '../../types/types';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect, MouseEvent } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { StatusOptions } from '../../utils/constants';

export const UpdateTaskPopup: FC = () => {
  const {
    isUpdateTaskPopupOpen,
    setIsUpdateTaskPopupOpen,
    isFetching,
    updatedTask,
    updateTask,
  } = useContext(GeneralContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<Task> = (data) => {
    updateTask({
      ...updatedTask,
      task: data.task,
      status: data.status,
      deadlineDate: data.deadlineDate,
    });
  };

  useEffect(() => {
    if (!isFetching) {
      reset();
    }
  }, [isFetching, reset]);

  function handlePopupClick(): void {
    isUpdateTaskPopupOpen
      ? setIsUpdateTaskPopupOpen(false)
      : setIsUpdateTaskPopupOpen(true);
  }
  function handleOverlayClick(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setIsUpdateTaskPopupOpen(false);
    }
  }
  return (
    <section
      className={`popup ${isUpdateTaskPopupOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div className={`popup__container`}>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
          <label htmlFor="test" className="popup__label">
            <span>UPDATE TASK</span>
          </label>
          <textarea
            {...register('task', { required: true })}
            className="popup__text-area"
            defaultValue={updatedTask.task}
          />
          <div className="popup__error">
            {errors.task && <span>This field is required</span>}
          </div>
          <label htmlFor="status" className="popup__label">
            <span>UPDATE Status</span>
          </label>
          <select
            {...register('status')}
            className="popup__input"
            value={updatedTask?.status}
          >
            {StatusOptions.map((value) => (
              <option
                key={value}
                value={value}
                disabled={false}
                defaultValue={value}
              >
                {value}
              </option>
            ))}
          </select>
          <label htmlFor="status" className="popup__label">
            <span>UPDATE Deadline Date</span>
          </label>
          <input
            type="date"
            {...register('deadlineDate', { required: true })}
            className="popup__input popup__input_date"
            defaultValue={updatedTask?.deadlineDate?.toString().slice(0, 10)}
          />
          <div className="popup__error">
            {errors.deadlineDate && <span>This field is required</span>}
          </div>
          <button
            type="submit"
            className={`popup__submit-button ${
              isFetching && 'popup__submit-button_disabled'
            }`}
          >
            Update Task
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          onClick={handlePopupClick}
        />
      </div>
    </section>
  );
};