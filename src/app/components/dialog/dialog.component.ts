import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-error-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],

  // I used ViewEncapsulation.None to successfully override material
  // styles within a single component in Angular
  encapsulation: ViewEncapsulation.None
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) { }
}
