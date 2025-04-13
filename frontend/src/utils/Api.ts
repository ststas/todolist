import { BASE_URL } from './constants';
import { Task } from '../types/types';

function request(
  method: string,
  url: string,
  data: Task
): Promise<Task[] | void> {
  const headers: Headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  let request: RequestInfo;
  if (method !== 'GET') {
    request = new Request(`${BASE_URL}/tasks/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });
  } else {
    request = new Request(`${BASE_URL}/tasks/${url}`, {
      method: method,
      headers: headers,
    });
  }

  return fetch(request)
    .then((res) => res.json())
    .then((res) => res as Task[])
    .catch((err) => console.error('Error ', err));
}

export function getTasks(): Promise<Task[] | void> {
  return request('GET', '', {} as Task);
}

export function getTasksById(id: string): Promise<Task[] | void> {
  return request('GET', id, {} as Task);
}

export function createTask(data: Task): Promise<Task[] | void> {
  return request('POST', '', data);
}

export function updateTask(data: Task): Promise<Task[] | void> {
  return request('PATCH', data._id, data);
}

export function deleteTask(taskId: string): Promise<Task[] | Task | void> {
  return request('DELETE', taskId, {} as Task);
}
