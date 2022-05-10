import { Component, OnDestroy, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.interface';
 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit,OnDestroy {

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

  private subscription: Subscription= new Subscription();

  constructor() { }

  ngOnInit(): void {
   
  }
  ngOnDestroy():void  {
    this.subscription.unsubscribe();
  }
  public onCompleteTodo(todo: ITodo):void{
    todo.isCompleted=!todo.isCompleted;
  }
  public onArchiveTodo(todo:ITodo):void{
    todo.isArchived=true;
  }
}
