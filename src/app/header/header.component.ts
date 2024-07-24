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
  // 注入todoService
  constructor(private todoService: TodoService) {}
  // 定義要輸入的事項名稱
  task: string = '';
  // 將所輸入的關鍵字同步修改todoService的keyWord
  set keyWord(newValue: string) {
    this.todoService.keyWord = newValue;
  }
  // 取得todoList的長度
  get todoListCount(): number {
    return this.todoService.todoList.length;
  }
  // 取得todoList的狀態
  get todoMode(): string {
    return this.todoService.mode;
  }
  // 取得todoList中所有事項是否完成
  get isAll(): boolean {
    return this.todoService.todoList.every((task) => task.isCompleted);
  }
  // 依照isAll的值來修改todoList中所有事項的isCompleted
  set isAll(newValue: boolean) {
    this.todoService.todoList.forEach((task) => (task.isCompleted = newValue));
  }
  // 切換要觀看的todoList狀態
  toggleMode(): void {
    if (this.todoService.mode === 'add') {
      this.todoService.mode = 'search';
    } else {
      this.todoService.mode = 'add';
    }
  }
  // 新增代辦事項功能
  addTask(): void {
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
