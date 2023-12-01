import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemFull } from 'src/app/interface/item-full';

@Component({
  selector: 'app-item-owner-action',
  templateUrl: './item-owner-action.component.html',
  styleUrls: ['./item-owner-action.component.scss']
})

export class ItemOwnerActionComponent {

  @Input() item: ItemFull

  @Output() editEvent = new EventEmitter<ItemFull>();
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() toggleActionDialog = new EventEmitter<boolean>();

  actionDialog : boolean = false;
  editDialog : boolean = true;
  deleteDialog : boolean = true;
  
  toggleDialog() {
    this.toggleActionDialog.emit();
  }
  toggleEdit() {
    this.editDialog = !this.editDialog;
    this.actionDialog = !this.actionDialog;
  }
  toggleDelete() {
    this.deleteDialog = !this.deleteDialog;
    this.actionDialog = !this.actionDialog;
  }

  editItem() {
    this.editEvent.emit(this.item);
  }

  deleteItem() {
    this.deleteEvent.emit(this.item.enhedId);
  }
}