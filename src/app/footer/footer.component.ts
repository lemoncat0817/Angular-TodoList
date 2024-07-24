import { TodoService } from '../@service/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private todoService: TodoService) {}
  get allTaskCount() {
    return this.todoService.todoList.length;
  }
  get noDoneTaskCount() {
    return this.todoService.todoList.filter((task) => !task.isCompleted).length;
  }
  get completeTaskCount() {
    return this.todoService.todoList.filter((task) => task.isCompleted).length;
  }

  clearCompleteTask() {
    this.todoService.todoList = this.todoService.todoList.filter(
      (task) => !task.isCompleted
    );
  }
}
