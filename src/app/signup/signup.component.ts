import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../service/auth.service';
import { Helper } from '../components/helper';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signu',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  validationError: boolean;
  constructor(private userService: authService, private dialog: MatDialog, private route: Router) { }

  onSubmit(f: NgForm) {
    this.validationError = false;

    // Check user input with a regex pattern
    Object.keys(f.value).forEach(item => {
      if (!this.validationError) {
        this.validationError = Helper.validateInput(f.value[item]);
        return;
      }
    });

    if (this.validationError)
      this.openErrorDialog('Fejl i validering: Indeholder ugyldige tegn');

    else if (f.value['password'] != f.value['passwordVerify'])
      this.openErrorDialog('Adgangskode er ikke ens');

    // Register user, login and navigate to profile page
    else {
      this.userService.register(f)
        .subscribe(() => {
          this.userService.logIn(f.value['mailaddress'], f.value['password'])
            .subscribe(res => {
              this.userService.loggedInUser = res;
              this.route.navigate(['profil'])
            });
        });
    }
  }

  openErrorDialog(message: string) {
    this.dialog.open(DialogComponent, { data: `${message}` });
  }
}
