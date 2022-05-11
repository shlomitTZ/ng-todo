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
    if(!this._todoSubject.value.length){
     const todosString=localStorage.getItem("todos");
      if (todosString){
        const existingTodos=JSON.parse(todosString);
        //get selected todo:
        var selectedIndex= existingTodos.findIndex(todo => todo.selected===true && (todo.isArchived===false));
        console.log("selectedIndex",selectedIndex)
        if (selectedIndex < 0)
          selectedIndex= existingTodos.findIndex(todo =>  todo.isArchived===false);
          if (selectedIndex < 0)
          selectedIndex=0;  
        existingTodos[selectedIndex].selected=true;
        this._todoSubject.next(existingTodos);
        this._singletodoSubject.next(existingTodos[selectedIndex]);
      }
    }
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
    localStorage.setItem("todos",JSON.stringify(existingTodos));
  }

   
   

  public onTodoAction(todoid: string,action: string , value:boolean):void{
    const existingTodos: Array<ITodo> =this._todoSubject.value;
    const todoIndex=existingTodos.findIndex(singletodo => singletodo.id=todoid)
    existingTodos[todoIndex][action]=value;
    this._todoSubject.next(existingTodos);
    localStorage.setItem("todos",JSON.stringify(existingTodos));
  }

  public onTodoSelection(todoIndex: number):void{
    const existingTodos: Array<ITodo> =this._todoSubject.value;
     
    existingTodos.forEach((todo)=>{
      todo.selected=false;
    });
    existingTodos[todoIndex].selected=true
    console.log("existingTodos",existingTodos)
    this._todoSubject.next(existingTodos);
    localStorage.setItem("todos",JSON.stringify(existingTodos));
    console.log("this._todoSubject",this._todoSubject.value);
  }
  
}
