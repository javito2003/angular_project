import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  show = false
  success = true
  message = "Default message"
  constructor() { }

  showNotif(message:string, type: boolean) {
    this.show = true
    this.message = message
    this.success = type
    setTimeout(() => {
      this.show = false
    }, 2000)
  }
}
