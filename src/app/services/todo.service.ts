import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private mock:ITodo[]=[{
    "id": 1,
    "title": "Erinaceus frontalis",
    "description": "Erinaceus frontalis description",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "8/19/2021",
    "selected": true
  },
  {
    "id": 2,
    "title": "Columba palumbus",
    "description": "Columba palumbus desc",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "5/19/2021",
    "selected":false
  },
  {
    "id": 3,
    "title": "Cygnus buccinator",
    "description": "Cygnus buccinator desc",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "7/14/2021",
    "selected":false,
  },
  {
    "id": 4,
    "title": "Spermophilus richardsonii",
    "description": "Spermophilus richardsonii desc ",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "6/10/2021",
    "selected":false,
  }
  ]
  private _todoSubject: BehaviorSubject<Array<ITodo>>=new BehaviorSubject(this.mock)
  private _singletodoSubject:BehaviorSubject<ITodo>=new BehaviorSubject(this.mock[0]);
 
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
}
