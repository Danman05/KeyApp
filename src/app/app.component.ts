import { Component, OnInit } from '@angular/core';
import { ItemService } from './service/item.service';
import { Category } from './interface/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'KeyApp';
  itemCategories: Category[] | undefined

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // this.itemService.getItems().subscribe(res => {
    //   console.log(res);
    //})

    this.itemService.getCategories().subscribe(res => {
      this.itemCategories = res.data
    })
  }
}
