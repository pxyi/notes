import { ConfirmService } from './../../../public/confirm/confirm.service';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PagesComponent } from '../../../public/pages/pages.component';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(PagesComponent)
  public pages: PagesComponent;

  /* 查询条件 */
  public query: Query = new Query();

  /* 请求结果 */
  public data: any;

  constructor(
    private http: HttpService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit() { 
  }

  $query(): void {
    this.pages.queryDatas(1);
  }

  deleteOne(id): void {
    this.confirmService.show('确认删除该数据吗?', () => {
      this.http.get('article/delete', {id: id}, (res) => {
        if(res.code == 1000){
          this.data.result.list.map( (res, i) => {
            if(res._id == id){
              this.data.result.list.splice(i, 1)
            }
          } );
        }
      })
    })
  }

}

class Query {
  constructor(
    public title: string = '',
    public keyword: string = '',
    public status: string = '',
    public parent: string = '',
    public createStartTime: string = '',
    public createEndTime: string = '',
  ){}
}