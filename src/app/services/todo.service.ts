import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos:  Array<ITodo>=[];
  private _todoSubject: BehaviorSubject<Array<ITodo>>=new BehaviorSubject(this.todos)
  private _singletodoSubject:BehaviorSubject<ITodo>=new BehaviorSubject(
    this.todos.length? this.todos[0] : null);
 
  constructor() { }
  public getTodos(): Observable<Array<ITodo>>{
   return this._todoSubject.asObservable();
  }
  public getSelectedTodo(): Observable<ITodo>{
    return this._singletodoSubject.asObservable();
  }
  public setSelectedToDo(todo: ITodo){
    this._singletodoSubject.next(todo);
  }
  public addNewTodo(newTodo:ITodo):void{
    const existingTodos: Array<ITodo>=this._todoSubject.value;
    existingTodos.push(newTodo);
    this._todoSubject.next(existingTodos)
  }
}
