import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interface/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  items: Item[] = []; 
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(res => {
      this.items = res.data;
    });
  }
}
