import { Outlet } from 'react-router-dom';
import { Header, Footer, NewTaskPopup } from '../components';
import './GeneralLayout.css';

export const GeneralLayout = () => {
  return (
    <section className="general-layout">
      <Header />
      <main>
        <NewTaskPopup />
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};
