import { Component, OnInit, ViewChild } from '@angular/core';
import { PagesComponent } from '../../../public/pages/pages.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(PagesComponent)
  private pages: PagesComponent;

  /* 查询条件 */
  public query: Query = new Query();

  /* 请求结果 */
  public data: any;

  constructor() { }

  ngOnInit() { }

  $query(): void {
    this.pages.queryDatas(1);
  }

}

class Query {
  constructor(
    public time: string = '',
    public start: string = '',
    public end: string = ''
  ){}
}