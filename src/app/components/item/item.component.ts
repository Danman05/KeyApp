import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interface/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  itemId: number = 0;
  item!: Item;
  itemImages: any;
  images: string[] = [];
  imageEndpoint: string = "http://localhost/key-app/uploads/";
  constructor(private route: ActivatedRoute, private itemService: ItemService) {

    this.route.params.subscribe(params => {
      this.itemId = params["id"]; // Access the route parameter

      itemService.getFullItem(this.itemId).subscribe(res => { 
        this.item = res.data[0];
        this.itemImages = JSON.parse(this.item.enhedBillede);
      });
    });
  }

  getFirstImage(enhedBillede: string): string {
    try {
      const images = JSON.parse(enhedBillede);
      if (enhedBillede.length > 0)

      this.images = images.enhedBillede
    console.log(images)
      return this.imageEndpoint + images.enhedBillede[0];
    } catch (error) {
      console.error(`Error getting image path for item`);
    }
    return "";
  }



}
