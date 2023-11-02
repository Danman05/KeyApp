import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { Item } from 'src/app/interface/item';
import { ItemService } from 'src/app/service/item.service';
import { Router } from '@angular/router';
import { Helper } from '../helper';
@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  itemCategories: Category[] | undefined;
  itemTitle: string = "";
  itemDescription: string = "";
  selectedCategory: Category = { enhedsType: "", kategoriId: 0 };
  imageStr: string = "";
  remarkJson: string = ""; // Json text from remark componenet
  file: File[] = [];

  confirmCreate: boolean = false;
  imgLink: string = null!;

  constructor(private fileUploadService: ImageUploadService, private itemService: ItemService, private router: Router) {
  }

  ngOnInit(): void {
    this.itemService.getCategories().subscribe(res => {
      this.itemCategories = res.data;
    })
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
    this.file = event.target.files;
    this.uploadFile();

  }

  uploadFile() {
    if (this.file)
      this.fileUploadService.upload(this.file).subscribe(res => {
    console.log(res);
    this.buildImageJson(res);
  });
  }

  buildImageJson(filepaths: string[])  {
    let tmpImgStr = '{"enhedBillede": [';

    for (let i = 0; i < filepaths.length; i++) {
      if (i + 1 == filepaths.length) {
        tmpImgStr += `"${filepaths[i]}"`;
        console.log("end of files");
      }
      else {
        console.log("added new file");

        tmpImgStr += `"${filepaths[i]}",`;
      }
    }
    tmpImgStr += ']}';
    if (Helper.isJsonString(tmpImgStr)) {
      this.imageStr = tmpImgStr;
    }
  }

  createItem() {
    this.uploadFile();

    const item: Item = {
      enhedTitel: this.itemTitle,
      enhedBeskrivelse: this.itemDescription,
      enhedBemærkning: this.remarkJson,
      enhedBillede: this.imageStr,
      enhedKategoriId: this.selectedCategory?.kategoriId!,
      enhedEjerId: 1,
      reserveringStatusId: 1
    }
    this.itemService.create(item).subscribe(res => {
      console.log(res);
      this.router.navigate([""]);
    })
  }
}
