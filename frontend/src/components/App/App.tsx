import { useEffect, useState } from 'react';
import {
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
  Route,
} from 'react-router-dom';
import { Contexts } from '../../contexts/Contexts';
import * as api from '../../utils/Api';
import { Task } from '../../types/types';
import { GeneralLayout } from '../../layouts';
import { DashboardPage } from '../../pages/DashboardPage/index';

export const App = () => {
  const [joinedData, setJoinedData] = useState<Task[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [direction, setDirection] = useState<string>('');
  const [sortedField, setSortedField] = useState<string>('');
  const [isNewTaskPopupOpen, setIsNewTaskPopupOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdateTaskPopupOpen, setIsUpdateTaskPopupOpen] =
    useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<Task>({} as Task);
  const [testToShow, setTestToShow] = useState<Task | undefined>(
    JSON.parse(localStorage.getItem('testToShow') || '{}') ||
      ({} as Task | undefined)
  );

  // get tasks from server
  useEffect(() => {
    api
      .getTasks()
      .then((tasksData) => setJoinedData(tasksData))
      .catch((err) => console.log('Data load error', err));
  }, [setJoinedData]);

  // test finding function
  function findTest(id: string): Task | undefined {
    const data: Task | undefined = joinedData?.find((el) => el._id === id);
    setTestToShow(data);
    localStorage.setItem('testToShow', JSON.stringify(data));
    return;
  }

  function createTask(data: Task) {
    setIsFetching(true);
    api
      .createTask(data)
      .then((newTask) => {
        setIsNewTaskPopupOpen(false);
        setJoinedData([newTask, ...joinedData]);
        setIsFetching(false);
      })
      .catch((err) => console.log('Data send error', err));
  }

  function updateTask(task: Task) {
    setIsFetching(true);
    api.updateTask(task).then((updatedTask) => {
      setJoinedData((state) =>
        state.map((currentTask) =>
          currentTask._id === task._id ? updatedTask : currentTask
        )
      );
      setIsUpdateTaskPopupOpen(false);
      setIsFetching(false);
    });
  }

  function deleteTask(id: string) {
    api.deleteTask(id).then(() => {
      setJoinedData((state) =>
        state.filter((currentTask) => currentTask._id !== id)
      );
    });
  }

  // describing routes
  const routes = createRoutesFromElements(
    <Route path="/">
      <Route element={<GeneralLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Route>
  );
  // creating routes
  const router = createHashRouter(routes);
  return (
    <Contexts
      joinedData={joinedData}
      setJoinedData={setJoinedData}
      dataLength={dataLength}
      setDataLength={setDataLength}
      searchText={searchText}
      setSearchText={setSearchText}
      findTest={findTest}
      testToShow={testToShow}
      setTestToShow={setTestToShow}
      direction={direction}
      setDirection={setDirection}
      sortedField={sortedField}
      setSortedField={setSortedField}
      createTask={createTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
      isNewTaskPopupOpen={isNewTaskPopupOpen}
      setIsNewTaskPopupOpen={setIsNewTaskPopupOpen}
      isUpdateTaskPopupOpen={isUpdateTaskPopupOpen}
      setIsUpdateTaskPopupOpen={setIsUpdateTaskPopupOpen}
      isFetching={isFetching}
      setIsFetching={setIsFetching}
      updatedTask={updatedTask}
      setUpdatedTask={setUpdatedTask}
    >
      <RouterProvider router={router} />
    </Contexts>
  );
};
