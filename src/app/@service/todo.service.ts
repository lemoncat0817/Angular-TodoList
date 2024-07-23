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
}
