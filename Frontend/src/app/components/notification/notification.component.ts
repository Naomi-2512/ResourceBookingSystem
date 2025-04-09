import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit,OnDestroy{
  message: string | null = null;
  type: boolean | null = null;
  private subscriptions: Subscription[] = [];
  private autoCloseTimeout: any;

  constructor(public _ns: NotificationService) { }

  ngOnInit(): void {
    const messageSub = this._ns.message$.subscribe((msg) => {
      this.message = msg;
    });
    
    const typeSub = this._ns.type$.subscribe((type) => {
      this.type = type;
    });
    
    this.subscriptions.push(messageSub, typeSub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }
}
