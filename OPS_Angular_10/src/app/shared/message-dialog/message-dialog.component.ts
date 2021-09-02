import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'op-confirm-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit, OnDestroy {
  showTimer: boolean;
  timer: string;
  IDLE_TIMEOUT = 60; // seconds
  _idleSecondsCounter = 0;
  private _subscriptions: Subscription[] = [];
  private inited;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  //close dialog when click outside
 

  ngOnInit() {
    this.showTimer = false;

    if (this.data.showTimer != null && this.data.showTimer === true) {
      this.showTimer = true;
     // this.startCountDown();
    }
    
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  //private startCountDown(): void {
  //  const counter$ = interval(1000).pipe(
  //    map((x) => {
  //      return (this.IDLE_TIMEOUT - this._idleSecondsCounter);
  //    })
  //  );

  //  this._subscriptions.push(counter$
  //    .subscribe((x) => {
  //      this.timer = x.toString();
  //      this._idleSecondsCounter++;
  //      if (x === 1) {
  //        this.data.isOK = true;
  //        this.dialogRef.close(true);
  //        return;
  //      }
  //    }));
  //}
}
