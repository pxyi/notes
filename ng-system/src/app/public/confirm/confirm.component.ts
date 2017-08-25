import { Component, OnInit } from '@angular/core';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(public confirmService: ConfirmService) { }

  ngOnInit() {
  }

}
