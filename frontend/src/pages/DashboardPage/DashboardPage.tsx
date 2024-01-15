import './DashboardPage.css';
import { Table } from '../../components/Table';
import {
  SearchForm,
  NewTaskPopup,
  UpdateTaskPopup,
  AddTaskButton,
} from '../../components';
import { useContext, useEffect, useMemo } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';

export const DashboardPage = () => {
  const { joinedData, setDataLength, searchText, direction, sortedField } =
    useContext(GeneralContext);

  //table filtering function
  const filteredData = useMemo(() => {
    const filteredData = [...joinedData];
    if (!searchText) {
      return filteredData;
    }
    return filteredData.filter((el) =>
      el.task.toLocaleLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, joinedData]);

  // table sorting function
  const sortedData = useMemo(() => {
    const sortedData = [...filteredData];
    const order = direction !== 'desc' ? 1 : -1;
    if (sortedField === 'task' || sortedField === 'status') {
      sortedData.sort(
        (a, b) =>
          a[sortedField]
            ?.toLocaleLowerCase()
            .localeCompare(b[sortedField].toLocaleLowerCase()) * order
      );
    }
    if (sortedField === 'deadlineDate') {
      sortedData.sort(
        (a, b) =>
          (new Date(b[sortedField]).valueOf() -
            new Date(a[sortedField]).valueOf()) *
          order
      );
    }

    return sortedData;
  }, [filteredData, direction, sortedField]);

  useEffect(() => {
    setDataLength(sortedData.length);
  }, [sortedData, setDataLength]);

  return (
    <section className="dashboard-page">
      <NewTaskPopup />
      <UpdateTaskPopup />
      <section className="dashboard-page__search-add-task">
        <SearchForm />
        <AddTaskButton />
      </section>
      <Table data={sortedData} />
    </section>
  );
};
