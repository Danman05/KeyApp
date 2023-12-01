import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { authService } from 'src/app/service/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading: boolean;

  constructor (private userService: authService, private dialog: MatDialog, private route: Router) {}
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.isLoading = true;
      this.userService.logIn(f.value.credUser, f.value.credPass).subscribe(res => {
        this.userService.loggedInUser = res
        console.log(this.userService.loggedInUser);
        if (this.userService.loggedInUser)
          this.route.navigate(['profil']);
        else {
          this.isLoading = false;
          this.openErrorDialog('Login mislykkedes');        
        } 
      });
    }
    else {
      this.openErrorDialog('Udfyld alle felter correct');
    }
  }

  openErrorDialog(message: string) {
    this.dialog.open(DialogComponent, { data: `${message}` });
  }
}
