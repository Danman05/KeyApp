import { Component, Input } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { Item } from 'src/app/interface/item';
@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent {
  @Input() itemCategories: Category[] | undefined;
  itemTitle: string = "";
  itemDescription: string = "";
  selectedCategory: Category = { enhedsType: "", kategoriId: 0};
  selectedCategoryTxt: Category | undefined;

  remarkJson: string= ""; // Json text from remark componenet
  file: File | undefined;

  confirmCreate: boolean = false;
  imgLink: string = null!;

  constructor(private fileUploadService: ImageUploadService) {
  }

  setRemark(jsonText: string) {
    this.remarkJson = jsonText;
  }

  categoryChange(data: any) {
    const foundCategory = this.itemCategories?.find((category) => category.kategoriId == data.target.value)
    if (foundCategory)
      this.selectedCategory = foundCategory;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
    this.uploadFile();
  }
  uploadFile() {
    if (this.file) {
      
      this.fileUploadService.upload(this.file).subscribe(res => {
        if (typeof (res) === 'object') {          
          // Short link via api response 
          this.imgLink = res.link;    
        } 
      });
    }
  }
  createItem() {
    const item: Item = {
      enhedTitel: this.itemTitle,
      enhedBeskrivelse: this.itemDescription,
      enhedBemærkning: this.remarkJson,
      enhedBillede: "",
      enhedKategoriId: this.selectedCategory?.kategoriId!,
      enhedEjerId: 0,
      reserveringStatusId: 0
    }

    this.confirmCreate = true;
    console.log(this.remarkJson);
    console.log(item);
  }

  goBack() {
    this.confirmCreate = false;
  }
}
