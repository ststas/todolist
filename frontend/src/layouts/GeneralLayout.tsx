import './GeneralLayout.css';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

export const GeneralLayout = () => {
  return (
    <section className="general-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
