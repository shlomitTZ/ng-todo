import { Component,Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo.interface';
 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent  {

  //2 ways to deal with the todo:
  //1)
  //@Input() todo: ITodo;
 
  //2:
  @Input() set todo(todo: ITodo){
    this._todo=todo;
  };
  get todo(){
    return this._todo;
  }
  private _todo: ITodo;

//****************** */

  
  constructor() { }

   
  public onCompleteTodo(todo: ITodo):void{
    todo.isCompleted=!todo.isCompleted;
  }
  public onArchiveTodo(todo:ITodo):void{
    todo.isArchived=true;
  }
}
