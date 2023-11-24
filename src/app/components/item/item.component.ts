import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemFull } from 'src/app/interface/item-full';
import { User } from 'src/app/interface/user';
import { ItemService } from 'src/app/service/item.service';
import { authService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {


  startDate: Date;
  endDate: Date;

  itemId: number;
  item: ItemFull;
  firstImage: string = "";
  restImages: string[] = [];
  remarkString: string;
  imageEndpoint: string = "http://localhost/key-app/uploads/";

  loggedUser: User

  hideReservationDiv = true;
  constructor(private route: ActivatedRoute, private itemService: ItemService, private userService: authService) {
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
  toggleReserveItem() {
    this.hideReservationDiv = !this.hideReservationDiv
  }
  reserveItem() {
    // Convert the string dates to Date objects
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
    
    // Check if the end date is greater than the start date

    if (endDateObj > startDateObj) 
      // Reservation logic when the dates are valid
      this.itemService.reservation(startDateObj, endDateObj , this.itemId, this.loggedUser.brugerId).subscribe(res => {
        console.log(res);
      });
      
    else 
    // Display an error message or handle the invalid date range
      console.error('Invalid date range. End date must be greater than start date.');
  
  }
}