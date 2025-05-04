import './NothingFound.css';
import { FC, useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';
import { NothingFoundProps } from './types';

export const NothingFound: FC<NothingFoundProps> = ({ noData }) => {
  const { setSearchText } = useContext(GeneralContext);

  const noDataText = noData ? 'No tasks added yet.' : 'No tasks found.';

  function handleReset() {
    setSearchText('');
  }
  return (
    <section className="nothing-found">
      <h2 className="nothing-found__title">{noDataText}</h2>
      {!noData && (
        <button className="nothing-found__button" onClick={handleReset}>
          Reset
        </button>
      )}
    </section>
  );
};
