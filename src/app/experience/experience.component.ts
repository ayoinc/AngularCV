import { Component, OnInit } from '@angular/core';

import { CvItem } from "../cv-item/cv-item";
import { CvItemService } from "../cv-item/cv-item.service";

@Component({
  selector: 'app-employments',
  templateUrl: './employments.component.html',
  styleUrls: ['./employments.component.css']
})
export class EmploymentsComponent implements OnInit {
  cvItems: CvItem[];
  title = "Employments";

  constructor(
    private cvItemService: CvItemService
  ) { }

  getItems(): void {
    this.cvItemService
      .getCvItems()
      .then(cvItems => this.cvItems = cvItems);
  }

  ngOnInit() {
    this.getItems();
  }

}