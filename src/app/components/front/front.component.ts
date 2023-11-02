import { Component, OnInit } from '@angular/core';
import { ItemPreview } from 'src/app/interface/item-preview';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  items: ItemPreview[] = []; 
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(res => {
      this.items = res.data;
      console.log(this.items);
      for (let i = 0; i < this.items.length; i++) {    
      }
    });
  }
}
