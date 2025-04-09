import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private triggerRefresh = new BehaviorSubject<boolean>(false);

  private messageSubject = new BehaviorSubject<string | null>(null);
  private typeSubject = new BehaviorSubject<boolean | null>(null);

  triggerRefresh$: Observable<boolean> = this.triggerRefresh.asObservable();

  message$: Observable<string | null> = this.messageSubject.asObservable();
  type$: Observable<boolean | null> = this.typeSubject.asObservable();

  showMessage(message: string | null, type: boolean | null) {
    this.messageSubject.next(message);
    this.typeSubject.next(type);

    setTimeout(() => {
      this.clearNotification();
    }, 6000);
  }

  clearNotification() {
    this.messageSubject.next(null);
    this.typeSubject.next(null);
  }

  triggerRefreshState() {
    this.triggerRefresh.next(true);
  }

  resetTriggerState() {
    this.triggerRefresh.next(false);
  }
}


