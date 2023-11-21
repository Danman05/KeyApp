import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemPreview } from 'src/app/interface/item-preview';
import { ItemService } from 'src/app/service/item.service';
import { authService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ownedItems: ItemPreview[];
  reservedItems: ItemPreview[];

  constructor(private itemService: ItemService, private authService: authService, private router: Router) { }

  ngOnInit(): void {

    if (!this.authService.loggedInUser) {
      // TESTING LOGIN
      console.log("not logged in - using test login");
      const loginAsUser = 0;

      const testLogins = {
        user: [
          { mail: "Danielspurrell@hotmail.com", password: "Kode1234!" },
          { mail: "IkkeDaniel@mail.com", password: "Kode1234!" }
        ]
      };

      this.authService.logIn(testLogins.user[loginAsUser].mail, testLogins.user[loginAsUser].password).subscribe(res => {
        console.log(res);
        this.authService.loggedInUser = res;
        this.getItem(this.authService.loggedInUser.brugerId);
      });
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
