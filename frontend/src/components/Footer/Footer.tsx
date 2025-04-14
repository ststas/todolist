import './Footer.css';
import { FC } from 'react';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__title">{`${currentYear} Stanislav Zaitsev ©`}</p>
    </footer>
  );
};
