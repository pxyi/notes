import { LoadingService } from './../public/loading/loading.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/retry';

@Injectable()
export class HttpService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public loadingService: LoadingService
  ) { }

   /* 配置请求头 */
   private header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
   
  /*
  *  post/get 请求方法:
  *    接收参数
  *            1. 请求地址: string    (必填)
  *            2. 请求参数: object    (必填: 可为空)
  *            3. 成功回调: function  (可选)
  *            4. 失败回调: function  (可选)
  */
  post(url: string, query: object, success = res => {}, error = e => {}) {
    this.http.post(environment.domain + url, this.serialize(query), {headers: this.header})
              .retry(1)
              .subscribe(
                res => {
                  this.loadingService.show = false;
                  if(res['code'] == 1003){
                    this.router.navigateByUrl('/login');
                  }else{
                    success(res);
                  }
                },
                err => {
                  error(err);
                  this.loadingService.show = false;
                }
              )
  }

  get(url: string, query: object, success = res => {}, error = e => {}): void {
    this.http.get(environment.domain + url + '?' + this.serialize(query))
              .retry(1)
              .subscribe(
                res => {
                  this.loadingService.show = false;
                  if(res['code'] == 1003){
                    this.router.navigateByUrl('/login');
                  }else{
                    success(res);
                  }
                },
                err => {
                  this.loadingService.show = false;
                  error(err);
                }
              )
  }

   /* 配置请求头 */
  private headerFile = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  upfile(url: string, data: any, success = res => {}, error = err => {}): void {
    this.http.post(environment.domain + url, data, {headers: this.headerFile})
              .retry(1)
              .subscribe(
                res => {
                  if(res['code'] == 1003){
                    this.router.navigateByUrl('/login');
                  }else{
                    success(res);
                  }
                },
                err => {
                  error(err);
                }
              )
  }

  /* 序列化请求参数 */
  serialize (data): string{
    var val = "", str = "";
    for(var v in data){
      str = v + "=" + data[v];
      val += str + '&';
    }
    return val.slice(0, val.length - 1);
  }
}
