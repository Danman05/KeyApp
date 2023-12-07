import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ItemFull } from 'src/app/interface/item-full';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-owner-action',
  templateUrl: './item-owner-action.component.html',
  styleUrls: ['./item-owner-action.component.scss']
})

export class ItemOwnerActionComponent {

  constructor(private itemService: ItemService) {

  }
  @Input() item: ItemFull

  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleActionDialog = new EventEmitter<boolean>();

  actionDialog: boolean = false;
  editDialog: boolean = true;
  deleteDialog: boolean = true;

  categories: Category[];
  selectedCategory: Category = { enhedsType: "", kategoriId: 0 };

  toggleDialog() {
    this.toggleActionDialog.emit();
  }
  toggleEdit() {
    this.itemService.getCategories().subscribe(res => {
      this.categories = res.data;
      this.editDialog = !this.editDialog;
      this.actionDialog = !this.actionDialog;
    });
  }
  toggleDelete() {
    this.deleteDialog = !this.deleteDialog;
    this.actionDialog = !this.actionDialog;
  }

  editItem(title: string, description: string) {
    this.editDialog = !this.editDialog;
    this.actionDialog = !this.actionDialog
    this.item.enhedTitel = title;
    this.item.enhedBeskrivelse = description;
    this.item.enhedsType = this.selectedCategory.enhedsType;
    this.editEvent.emit({ item: this.item, categoryId: this.selectedCategory });
  }

  deleteItem() {
    this.deleteEvent.emit(this.item.enhedId);
  }
  categoryChange(data: any) {
    const foundCategory = this.categories?.find((category) => category.kategoriId == data.target.value)
    if (foundCategory)
      this.selectedCategory = foundCategory;
  }
}