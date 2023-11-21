import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (private userService: authService) {}
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.userService.logIn(f.value.credUser, f.value.credPass).subscribe(res => {
        this.userService.loggedInUser = res
        console.log(this.userService.loggedInUser);
        if (this.userService.loggedInUser) {
          console.log("valid login");
        }
        else {
          console.log("login failed");
        }
      });
    }
  }
}
