import './ResultsPage.css';
import { useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { Table } from '../../components/Table';
import { Task } from '../../types/types';

export const ResultsPage = () => {
  const { testToShow } = useContext(GeneralContext);
  return (
    <section className="finalize-page">
      <Table data={[testToShow as Task]} />
    </section>
  );
};
