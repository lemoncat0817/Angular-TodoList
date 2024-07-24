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

  set keyWord(newValue: string) {
    this.todoService.keyWord = newValue;
  }

  get todoListCount(): number {
    return this.todoService.todoList.length;
  }

  get todoMode(): string {
    return this.todoService.mode;
  }

  get isAll(): boolean {
    return this.todoService.todoList.every((task) => task.isCompleted);
  }

  set isAll(newValue: boolean) {
    this.todoService.todoList.forEach((task) => (task.isCompleted = newValue));
  }

  toggleMode() {
    if (this.todoService.mode === 'add') {
      this.todoService.mode = 'search';
    } else {
      this.todoService.mode = 'add';
    }
  }

  addTask() {
    if (this.task.length > 0) {
      this.todoService.todoList.push({
        id: Date.now(),
        taskName: this.task,
        isCompleted: false,
        isEdit: false,
      });
    }
    this.todoService.saveToStorage();
    this.task = '';
  }
}
