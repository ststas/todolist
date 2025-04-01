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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateTaskPopupOpen, setIsUpdateTaskPopupOpen] =
    useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<Task>({} as Task);
  const [taskToShow, setTaskToShow] = useState<Task | undefined>(
    JSON.parse(localStorage.getItem('taskToShow') || '{}') ||
      ({} as Task | undefined)
  );

  // get tasks from server
  useEffect(() => {
    setIsLoading(true);
    api
      .getTasks()
      .then((tasksData) => {
        setJoinedData(tasksData as Task[]);
        setIsLoading(false);
      })
      .catch((err) => console.log('Data load error', err));
  }, [setJoinedData]);

  // task finding function
  function findTask(id: string): Task | undefined {
    const data: Task | undefined = (joinedData ?? []).find(
      (el) => el._id === id
    );
    setTaskToShow(data);
    localStorage.setItem('taskToShow', JSON.stringify(data));
    return;
  }
  // task creating function
  function createTask(data: Task) {
    setIsFetching(true);
    api
      .createTask(data)
      .then((newTask) => {
        setIsNewTaskPopupOpen(false);
        setJoinedData([newTask as Task, ...joinedData]);
        setIsFetching(false);
      })
      .catch((err) => console.log('Data send error', err));
  }
  // task updating function
  function updateTask(task: Task) {
    setIsFetching(true);
    api.updateTask(task).then((updatedTask) => {
      setJoinedData((state) =>
        state.map((currentTask) =>
          currentTask._id === task._id
            ? (updatedTask as Task)
            : (currentTask as Task)
        )
      );
      setIsUpdateTaskPopupOpen(false);
      setIsFetching(false);
    });
  }
  // task deleting function
  function deleteTask(id: string) {
    setIsLoading(true);
    api.deleteTask(id).then(() => {
      setJoinedData((state) =>
        state.filter((currentTask) => currentTask._id !== id)
      );
      setIsLoading(false);
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
      findTask={findTask}
      taskToShow={taskToShow}
      setTaskToShow={setTaskToShow}
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
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      updatedTask={updatedTask}
      setUpdatedTask={setUpdatedTask}
    >
      <RouterProvider router={router} />
    </Contexts>
  );
};
