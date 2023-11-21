import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../service/auth.service';

@Component({
  selector: 'app-signu',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private userService: authService) {

  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    this.userService.register(f).subscribe(res => console.log(res));
  }
}
