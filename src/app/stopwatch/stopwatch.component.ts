import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  title = 'timer';
  sec: number = 0;
  min: number = 3;
  startTimer: any;
  running = false;

  constructor() { }

  ngOnInit(): void {
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        if (this.sec === 0) {
          if (this.min === 0) {
            this.reset(); // Stop the timer when it reaches zero
          } else {
            this.min--;
            this.sec = 59;
          }
        } else {
          this.sec--;
        }
      }, 1000);
    } else {
      this.stop();
    }
  }

  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
  }

  reset(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.min = 3; // Reset to 3 minutes
    this.sec = 0; // Reset seconds to 0
  }

}
