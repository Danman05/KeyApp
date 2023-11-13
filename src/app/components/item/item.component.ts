import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interface/item';
import { ItemFull } from 'src/app/interface/item-full';
import { User } from 'src/app/interface/user';
import { ItemService } from 'src/app/service/item.service';
import { UserLoginService } from 'src/app/service/user-login.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {


  itemId: number;
  item: ItemFull;
  firstImage: string = "";
  restImages: string[] = [];
  remarkString: string;
  imageEndpoint: string = "http://localhost/key-app/uploads/";

  loggedUser: User
  constructor(private route: ActivatedRoute, private itemService: ItemService, private userService: UserLoginService) {
    this.loggedUser = userService.loggedInUser;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params["id"]; // Access the route parameter

      this.itemService.getFullItem(this.itemId).subscribe(res => {
        this.remarkString = res.item.enhedBemærkning;
        this.item = res.item;
        this.item.enhedEjer = res.user
        
        const itemImages = JSON.parse(res.item.enhedBillede);
        this.firstImage = this.imageEndpoint + itemImages.enhedBillede[0];

        for (let i = 1; i < itemImages.enhedBillede.length; i++)
          this.restImages[i - 1] = this.imageEndpoint + itemImages.enhedBillede[i]; 
      });
    }) 
   }
}
