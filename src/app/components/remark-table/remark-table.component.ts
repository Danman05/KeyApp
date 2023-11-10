import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-remark-table',
  templateUrl: './remark-table.component.html',
  styleUrls: ['./remark-table.component.scss']
})
export class RemarkTableComponent implements OnInit {
  @Input() remarkString: string;
  data: any[] = [];
  ngOnInit(): void {
    if (this.remarkString) {     
      try {
        this.data = JSON.parse(this.remarkString);
        if (!Array.isArray(this.data)) {
          // If the parsed data is not an array, wrap it in an array
          this.data = [this.data];
        }
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        this.data = [];
      }
    }
  }

  getKeys(): string[] {
    if (this.data.length > 0) {
      return Object.keys(this.data[0]);
    }
    return [];
  }

  getValues(item: any): string[] {
    return Object.values(item);
  }
}
