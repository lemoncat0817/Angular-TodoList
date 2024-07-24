import { Todo } from './../@model/todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}
  // 定義所有代辦事項存放的陣列
  todoList: Todo[] = [];
  // 定義目前所使用的模式功能
  mode: string = 'add';
  // 定義目前所輸入的關鍵字
  keyWord: string = '';
  // 定義目前所選的觀看模式
  taskState: string = 'all';
  // 判斷現在是否使用瀏覽器開啟此網頁
  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }
  // 刪除代辦事項
  deleteTask(id: number): void {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }
  // 清理已完成的代辦事項
  clearCompleteTask(): void {
    this.todoList = this.todoList.filter((task) => !task.isCompleted);
    this.saveToStorage();
  }
  // 將todoList存入localStorage
  saveToStorage(): void {
    if (this.isBrowser()) {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
  }
  // 從localStorage中讀取todoList
  loadFromStorage(): Todo[] {
    if (this.isBrowser()) {
      this.todoList = JSON.parse(localStorage.getItem('todoList') || '[]');
    }
    return this.todoList;
  }
}
