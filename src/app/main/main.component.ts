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
  todoList: Todo[] = [];

  editTaskName: string = '';

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
    this.todoList = this.todoService.loadFromStorage();
  }

  ngOnInit(): void {
    this.todoList = this.todoService.loadFromStorage();
  }
}
