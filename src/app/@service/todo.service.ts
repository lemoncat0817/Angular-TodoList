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

  deleteTask(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  loadFromStorage() {
    this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    return this.todoList;
  }
}
