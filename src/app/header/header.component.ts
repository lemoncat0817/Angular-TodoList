import { TodoService } from '../@service/todo.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private todoService: TodoService) {}
  task: string = '';

  addTask() {
    if (this.task.length > 0) {
      this.todoService.todoList.push({
        id: Date.now(),
        taskName: this.task,
        isCompleted: false,
        isEdit: false,
      });
    }
    this.task = '';
  }
}
