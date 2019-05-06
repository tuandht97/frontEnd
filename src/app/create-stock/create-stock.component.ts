import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.scss']
})
export class CreateStockComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  urls = [];

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          console.log(event);
          this.urls.push(reader.result);
        }

        reader.readAsDataURL(event.target.files[i]);
        console.log(event.target.files[i]);
      }
    }
  }

  removeImage(id: number) {
    console.log(this.urls);
    this.urls.splice(id, 1);
    console.log(this.urls);
  }
}
