import { Component, OnInit } from '@angular/core';
import { MatCardLgImage } from '@angular/material/card';
import { Router } from '@angular/router';
import { ItemPreview } from 'src/app/interface/item-preview';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  items: ItemPreview[] = []; 
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(res => {
      this.items = res.data;
      console.log(this.items); 

    });

    this.itemService.getFullItem(2).subscribe(res => {
      console.log(res.data);
    })
  }

  itemInfoPage(number: number) {
    console.log(number);
      this.router.navigate(['enhed', number]);
  }
}
