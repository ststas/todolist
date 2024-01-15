import { BASE_URL } from './constants';
import { Task } from '../types/types';

export function getTasks(): Promise<Task[]> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const request: RequestInfo = new Request(`${BASE_URL}/tasks`, {
    method: 'GET',
    headers: headers,
  });
  return fetch(request)
    .then((res) => res.json())
    .then((res) => {
      return res as Task[];
    });
}

export function getTasksById(id: string): Promise<Task> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const request: RequestInfo = new Request(`${BASE_URL}/tasks/${id}`, {
    method: 'GET',
    headers: headers,
  });
  return fetch(request)
    .then((res) => res.json())
    .then((res) => {
      return res as Task;
    });
}

export function createTask(data: Task): Promise<Task> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const request: RequestInfo = new Request(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });
  return fetch(request)
    .then((res) => res.json())
    .then((newTask) => {
      return newTask as Task;
    });
}

export function updateTask(data: Task): Promise<Task> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const taskId = data._id;
  const request: RequestInfo = new Request(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data),
  });
  return fetch(request)
    .then((res) => res.json())
    .then((newTask) => {
      return newTask as Task;
    });
}

export function deleteTask(taskId: string): Promise<Task> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  const request: RequestInfo = new Request(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: headers,
  });
  return fetch(request)
    .then((res) => res.json())
    .then((newTask) => {
      return newTask as Task;
    });
}
