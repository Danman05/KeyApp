import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPreview } from 'src/app/interface/item-preview';
import { ItemService } from 'src/app/service/item.service';
import { authService } from 'src/app/service/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ownedItems: ItemPreview[];
  reservedItems: ItemPreview[];

  constructor(private itemService: ItemService, private authService: authService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.authService.loggedInUser) {
      this.dialog.open(DialogComponent, {data: "Log ind for at tilgå din profil" })
       this.router.navigate(['log-ind']);

    }
    else {
        console.log("is logged in");

        this.getItem(this.authService.loggedInUser.brugerId)
    }
  }
  getItem(userId: number) {
    this.itemService.getUsersItem(userId).subscribe(res => {
      this.ownedItems = res;
    });
    this.itemService.getUserKeys(userId).subscribe(res => {
      this.reservedItems = res;
    });
  }

  itemInfoPage(number: number) {
  this.router.navigate(['enhed', number]);
}
}
