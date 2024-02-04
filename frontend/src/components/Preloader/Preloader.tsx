import './Preloader.css';
import { FC } from 'react';

export const Preloader: FC = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
};
