import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit ,OnDestroy {

  public todos: Array<ITodo>=[];

  private subscription: Subscription = new Subscription();
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.todoService.getTodos().subscribe(data => this.todos=data)
     
     
    );
    console.log(this.todos);
    }
  ngOnDestroy():void  {
    this.subscription.unsubscribe();
  }

  public onTodoClick(todo: ITodo,index: number):void{
    
    this.todoService.setSelectedToDo(todo);
    
    this.todos.forEach((todo)=>{
      todo.selected=false;
    });
  this.todos[index].selected=true;
  }

}
