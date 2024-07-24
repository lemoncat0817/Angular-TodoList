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
  // 注入todoService
  constructor(private todoService: TodoService) {}
  // 獲得所有代辦事項數量
  get allTaskCount(): number {
    return this.todoService.todoList.length;
  }
  // 獲得未完成代辦事項數量
  get noDoneTaskCount(): number {
    return this.todoService.todoList.filter((task) => !task.isCompleted).length;
  }
  // 獲得完成代辦事項數量
  get completeTaskCount(): number {
    return this.todoService.todoList.filter((task) => task.isCompleted).length;
  }
  // 清理所有已完成代辦事項
  clearCompleteTask(): void {
    this.todoService.clearCompleteTask();
  }
}
