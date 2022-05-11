import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit,OnDestroy {
  private _dDay: Date;
  @Input() set dDay(dDay: Date){
    this._dDay=dDay;
    this._dateNow=new Date();
  };
  
  private subscription: Subscription = new Subscription();
  private _dateNow:Date=new Date();
  
  private milisecondsInSeconds: number=1000;
  private secondsInMinute: number =60;
  private minutesInHour: number=60;
  private hoursInDay: number=24;

  public timeDiff: number;
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;

  constructor() { }

  ngOnInit(): void {
    this.subscription.add(
      interval(1000).subscribe(() =>{
        this.getTimeDiff();
      })
    )
  }

   ngOnDestroy():void{
    this.subscription.unsubscribe();
  }
  private getTimeDiff():void{
   this.timeDiff=new Date(this._dDay).getTime()-new Date().getTime()
   this.setTimeUnits(this.timeDiff);
  }

  private setTimeUnits(timeDiff:number):void{
    this.seconds=Math.floor((timeDiff)/(this.milisecondsInSeconds)% this.secondsInMinute);
    this.minutes=Math.floor(timeDiff/(this.milisecondsInSeconds * this.minutesInHour) % this.hoursInDay);
    this.hours=Math.floor(timeDiff/(this.milisecondsInSeconds * this.minutesInHour * this.secondsInMinute)% this.hoursInDay);
    this.days=Math.floor(timeDiff/(this.milisecondsInSeconds * this.minutesInHour * this.secondsInMinute* this.hoursInDay));
  }

}
