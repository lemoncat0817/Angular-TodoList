import { TodoService } from '../@service/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './../@model/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  // 注入todoService
  constructor(private todoService: TodoService) {}
  // 定義編輯中的待辦事項名稱
  editTaskName: string = '';
  // 定義目前選擇的狀態
  todoState: string = 'all';
  // 回傳當前的todoList
  get todoList(): Todo[] {
    if (this.todoService.keyWord === '') {
      if (this.todoService.taskState === 'all') {
        return this.todoService.todoList;
      } else if (this.todoService.taskState === 'unDone') {
        return this.todoService.todoList.filter((task) => !task.isCompleted);
      } else {
        return this.todoService.todoList.filter((task) => task.isCompleted);
      }
    } else {
      if (this.todoService.taskState === 'all') {
        return this.todoService.todoList.filter((task) =>
          task.taskName.includes(this.todoService.keyWord)
        );
      } else if (this.todoService.taskState === 'unDone') {
        return this.todoService.todoList.filter(
          (task) =>
            !task.isCompleted &&
            task.taskName.includes(this.todoService.keyWord)
        );
      } else {
        return this.todoService.todoList.filter(
          (task) =>
            task.isCompleted && task.taskName.includes(this.todoService.keyWord)
        );
      }
    }
  }
  // 儲存編輯中的待辦事項
  saveTask(task: Todo): void {
    task.taskName = this.editTaskName;
    this.editTaskName = '';
    task.isEdit = false;
    this.todoService.saveToStorage();
  }
  // 編輯待辦事項
  editTask(task: Todo): void {
    if (this.todoService.todoList.some((task) => task.isEdit)) {
      alert('有待辦事項尚未保存，請先完成編輯');
      return;
    }
    task.isEdit = true;
    this.editTaskName = task.taskName;
  }
  // 刪除待辦事項
  deleteTask(id: number): void {
    this.todoService.deleteTask(id);
    this.todoService.todoList = this.todoService.loadFromStorage();
  }
  // 改變目前選擇要觀看的代辦事項狀態
  changeTodoState(state: string): void {
    this.todoState = state;
    this.todoService.taskState = state;
  }
  // 刷新時獲取代辦事項資料
  ngOnInit(): void {
    this.todoService.todoList = this.todoService.loadFromStorage();
  }
}
