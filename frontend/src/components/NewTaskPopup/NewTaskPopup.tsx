import './NewTaskPopup.css';
import { Task } from '../../types/types';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect, MouseEvent } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { StatusOptions } from '../../utils/constants';

export const NewTaskPopup: FC = () => {
  const { createTask, isNewTaskPopupOpen, setIsNewTaskPopupOpen, isFetching } =
    useContext(GeneralContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>();

  const onSubmit: SubmitHandler<Task> = (data) => {
    createTask(data);
  };

  useEffect(() => {
    if (!isFetching) {
      reset();
    }
  }, [isFetching, reset]);

  function handlePopupClick(): void {
    isNewTaskPopupOpen
      ? setIsNewTaskPopupOpen(false)
      : setIsNewTaskPopupOpen(true);
  }
  function handleOverlayClick(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setIsNewTaskPopupOpen(false);
    }
  }
  return (
    <section
      className={`popup ${isNewTaskPopupOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div className={`popup__container`}>
        <form onSubmit={handleSubmit(onSubmit)} className="popup__form">
          <label htmlFor="test" className="popup__label">
            <span>ADD TASK</span>
          </label>
          <textarea
            {...register('task', { required: true })}
            className="popup__text-area"
          />
          <div className="popup__error">
            {errors.task && <span>This field is required</span>}
          </div>
          <label htmlFor="status" className="popup__label">
            <span>Choose Status</span>
          </label>
          <select
            {...register('status', { required: true })}
            className="popup__input"
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
            <span>Choose Deadline Date</span>
          </label>
          <input
            type="date"
            {...register('deadlineDate', { required: true })}
            className="popup__input popup__input_date"
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
            Add Task
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
