import './Table.css';
import { FC, useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { Status } from '../../types/types';
import { TableProps } from './types/types';
import { ReactComponent as Icon } from '../../assets/icons/chevron_up.svg';
import { NothingFound } from '../NothingFound';

export const Table: FC<TableProps> = ({ sortedData }) => {
  const {
    direction,
    setDirection,
    sortedField,
    setSortedField,
    deleteTask,
    joinedData,
    setUpdatedTask,
    setIsUpdateTaskPopupOpen,
  } = useContext(GeneralContext);

  // cell 'status' font color setter
  let color: string;
  function statusColor(status: Status) {
    switch (status) {
      case Status.COMPLETED:
        color = 'table__cell_title-color_green';
        break;
      case Status.IN_PROGRESS:
        color = 'table__cell_title-color_grey';
        break;
      case Status.PENDING:
        color = 'table__cell_title-color_orange';
        break;
    }
    return color;
  }

  // row's left border color setter
  let borderColor: string;
  function leftBorderColor(status: Status) {
    switch (status) {
      case Status.COMPLETED:
        borderColor = 'table__row_border-color_dark-purple';
        break;
      case Status.IN_PROGRESS:
        borderColor = 'table__row_border-color_purple';
        break;
      case Status.PENDING:
        borderColor = 'table__row_border-color_red';
        break;
    }
    return borderColor;
  }
  // // function requesting to sort data according to column name and asc/desc direction
  function requestSorting(sortedField: string) {
    setSortedField(sortedField);
    direction === ''
      ? setDirection('asc')
      : direction === 'asc'
        ? setDirection('desc')
        : setDirection('asc');
  }
  function findTaskToUpdate(id: string) {
    const updatedTask = joinedData.filter(
      (currentTask) => currentTask._id === id
    )?.[0];
    setUpdatedTask(updatedTask);
    setIsUpdateTaskPopupOpen(true);
  }

  return sortedData?.length === 0 ? (
    <NothingFound />
  ) : (
    <section className="table">
      <div className="table__header">
        <div className="table__header-cell">
          <button
            className="table__header-button"
            onClick={() => {
              requestSorting('task');
            }}
          >
            Task
          </button>
          {sortedField === 'task' && (
            <Icon
              className={`table__header-arrow ${
                direction === 'desc' ? 'table__header-arrow_reversed' : ''
              }`}
            ></Icon>
          )}
        </div>
        <div className="table__header-cell">
          <button
            className="table__header-button"
            onClick={() => {
              requestSorting('status');
            }}
          >
            Status
          </button>
          {sortedField === 'status' && (
            <Icon
              className={`table__header-arrow ${
                direction === 'desc' ? 'table__header-arrow_reversed' : ''
              }`}
            ></Icon>
          )}
        </div>
        <div className="table__header-cell">
          <button
            className="table__header-button"
            onClick={() => {
              requestSorting('deadlineDate');
            }}
          >
            Deadline
          </button>
          {sortedField === 'deadlineDate' && (
            <Icon
              className={`table__header-arrow ${
                direction === 'desc' ? 'table__header-arrow_reversed' : ''
              }`}
            ></Icon>
          )}
        </div>
        <div className="table__header-cell">
          <span className="table__header-title">Actions</span>
        </div>
      </div>
      <div className="table__body">
        {sortedData?.map((el) => {
          return (
            <div
              className={`table__row ${leftBorderColor(el.status as Status)}`}
              key={el._id}
            >
              <p className="table__cell table__cell-text-area">{el.task}</p>
              <div
                className={`table__cell ${statusColor(el.status as Status)}`}
              >
                {el.status}
              </div>
              <div className="table__cell">
                {el.deadlineDate.toString().slice(0, 10)}
              </div>
              <div className="table__cell">
                <button
                  onClick={(event) => {
                    findTaskToUpdate(event.currentTarget.id);
                  }}
                  id={el._id}
                  className="table__cell-button"
                >
                  Edit
                </button>
                <button
                  onClick={(event) => deleteTask(event.currentTarget.id)}
                  id={el._id}
                  className="table__cell-button table__cell-button_bg-color_grey"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
