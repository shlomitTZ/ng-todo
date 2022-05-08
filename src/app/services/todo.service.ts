import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private mock:ITodo[]=[{
    "title": "Erinaceus frontalis",
    "description": "Erinaceus frontalis description",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "8/19/2021"
  },
  {
    "title": "Columba palumbus",
    "description": "Columba palumbus desc",
    "isCompleted": false,
    "isArchived": false,
    "endDate": "5/19/2021"
  },
  {
    "title": "Cygnus buccinator",
    "description": "Cygnus buccinator desc",
    "isCompleted": false,
    "isArchived": true,
    "endDate": "7/14/2021"
  },
  {
    "title": "Spermophilus richardsonii",
    "description": "Spermophilus richardsonii desc ",
    "isCompleted": true,
    "isArchived": true,
    "endDate": "6/10/2021"
  }
  ]
  private _todoSubject: BehaviorSubject<Array<ITodo>>=new BehaviorSubject(this.mock)
  constructor() { }
  public getTodos(): Observable<Array<ITodo>>{
     return this._todoSubject.asObservable();
  }
}
