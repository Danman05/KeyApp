import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { ItemPreview } from 'src/app/interface/item-preview';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {

  items: ItemPreview[] = [];
  sortedItems: ItemPreview[] = [];

  usingSortedList: boolean = false;
  categories: Category[] = [];
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
      this.itemService.getCategories().subscribe(res => {
        this.categories = res.data
      });

      this.itemService.getItems().subscribe(res => {
        this.items = res.data
      });

  }
  categoryChange(value: string) {
    if (value == "0") {
      this.usingSortedList = false;
    }
    else {
      this.sortedItems = this.items.filter(item => item.enhedKategoriId == Number(value));
      this.usingSortedList = true;
    }
  }

  itemInfoPage(number: number) {
      this.router.navigate(['enhed', number]);
  }
}
