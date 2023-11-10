import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginService } from 'src/app/service/user-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (private authService: UserLoginService) {}
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.authService.logIn(f.value.credUser, f.value.credPass).subscribe(res => {
        this.authService.loggedInUser = res
        console.log(this.authService.loggedInUser);
        if (this.authService.loggedInUser) {
          console.log("valid login");
        }
        else {
          console.log("login failed");
        }
      });
    }
  }
}
