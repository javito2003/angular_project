import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { IError, IRAuthSuccess } from 'src/app/types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router, private fb:FormBuilder, private http: HttpClient, private alertService: AlertService) { }

  authForm:FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit():void {
    const data = this.authForm.value
    if(!data.username.trim() || !data.password.trim()) return
    const toSend = {
      username: data.username,
      password: data.password
    }
    this.http.post("http://localhost:3001/api/auth/login", toSend).subscribe(
      (res:IRAuthSuccess) => {
        if (res.status === "success") {
          localStorage.setItem('auth', JSON.stringify(res.token))
          this.router.navigate([''])
        }

      },
      (err:IError) => {
        if(err.status === 400){
          this.alertService.showNotif(err.error, false)
          return
        }
        this.alertService.showNotif("An error has ocurred", false)
      }
    )
  }
  
  goRegister():void {
    this.router.navigate(['register'])
  }

}
