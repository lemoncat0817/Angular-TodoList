import { Todo } from './../@model/todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  isEdit: boolean = false;
  todoList: Todo[] = [];
  pages: number = 0;
  isSearch: boolean = false;
  keyword: string = '';
  taskState: string = 'all';

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  deleteTask(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }

  clearCompleteTask() {
    this.todoList = this.todoList.filter((task) => !task.isCompleted);
    this.saveToStorage();
  }

  saveToStorage() {
    if (this.isBrowser()) {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
  }

  loadFromStorage() {
    if (this.isBrowser()) {
      this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    }
    return this.todoList;
  }
}
