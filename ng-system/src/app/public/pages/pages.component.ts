import { HttpService } from './../../services/http.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PromptService } from '../prompt/prompt.service';
import { ConfirmService } from '../confirm/confirm.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  /* 请求地址(必填) */
  @Input()
  url: string;

  /* 请求参数(可选) */
  @Input()
  query;

  /* 接收属性(必填) */
  @Input()
  value;

  /* 返回结果 */
  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();


  constructor(
    public http: HttpService,
    public promptService: PromptService,
    public confirmService: ConfirmService) { }

  ngOnInit() {
    this.queryDatas(1);
  }

  /* 是否显示loading */
  public isLoading: boolean = false;

  /* 请求结果实体 */
  public pagesOption: Page = new Page();

  /* 请求方法 */
  queryDatas(page?): void{
    this.isLoading = true;
    this.query.page = this.pagesOption.count;
    this.query.count = this.pagesOption.count;
    let query = {};
    for(let q in this.query){
      if(this.query[q] !== null && this.query[q] !== '' && this.query[q] !== undefined){
        query[q] = this.query[q];
      }
    }
    this.http.get(this.url, query, res => {
      this.valueChange.emit(res);
      this.isLoading = false;
      this.pagesOption.page = res.result.page;
      this.pagesOption.count = res.result.count;
      this.pagesOption.total = Math.ceil(res.result.total/res.result.count);
    }, err => {
      console.log(err);
    })
  }

}

class Page {
  constructor(
    public page: number = 1,
    public count: number = 10,
    public total: number = 0
  ) {}
}