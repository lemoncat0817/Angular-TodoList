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
  constructor(private todoService: TodoService) {}

  editTaskName: string = '';

  todoState: string = 'all';

  get todoList() {
    if (this.todoService.taskState === 'all') {
      return this.todoService.todoList;
    } else if (this.todoService.taskState === 'unDone') {
      return this.todoService.todoList.filter((task) => !task.isCompleted);
    } else {
      return this.todoService.todoList.filter((task) => task.isCompleted);
    }
  }

  saveTask(task: Todo) {
    task.taskName = this.editTaskName;
    this.editTaskName = '';
    task.isEdit = false;
    this.todoService.saveToStorage();
  }

  editTask(task: Todo) {
    if (this.todoService.todoList.some((task) => task.isEdit)) {
      alert('有待辦事項尚未保存，請先完成編輯');
      return;
    }
    task.isEdit = true;
    this.editTaskName = task.taskName;
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
    this.todoService.todoList = this.todoService.loadFromStorage();
  }

  changeTodoState(state: string) {
    this.todoState = state;
    this.todoService.taskState = state;
  }

  ngOnInit(): void {
    this.todoService.todoList = this.todoService.loadFromStorage();
  }
}
