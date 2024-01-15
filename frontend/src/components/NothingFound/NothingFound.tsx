import './NothingFound.css';
import { FC, useContext } from 'react';
import { GeneralContext } from '../../contexts/GeneralContext';

export const NothingFound: FC = () => {
  const { setSearchText } = useContext(GeneralContext);

  function handleReset() {
    setSearchText('');
  }
  return (
    <section className="nothing-found">
      <h2 className="nothing-found__title">No tasks found.</h2>
      <button className="nothing-found__button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
};
