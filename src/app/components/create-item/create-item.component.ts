import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  remarkJson: string | undefined; // Json text from remark componenet
  setRemark(jsonText: string) {
    this.remarkJson = jsonText;
    console.log(this.remarkJson);
  }
}
