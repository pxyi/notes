import { HttpService } from './../services/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public userpwd: string;
  public resInfo: string;
  public remember: boolean;
  public inputType: string = 'text';

  constructor(
    public router: Router,
    public http: HttpService
  ) { }

  ngOnInit() {
    /* 自动输入密码 */
    $('body').on('focus', '#passWord', function () {$('#passWord').prop('type', 'password');});
    let userInfo = window.localStorage.getItem('userInfo');
    if(userInfo && userInfo.length){
      this.remember = true;
      $('#passWord').prop('type', 'password');
      this.username = JSON.parse(userInfo).username;
      this.userpwd = JSON.parse(userInfo).userpwd;
    }
  }

  login(): void{
    if(!this.username || !this.username.length){this.resInfo = '请输入用户名'; return;}
    if(!this.userpwd || !this.userpwd.length){this.resInfo = '请输入密码'; return;}
    if(this.remember){
      window.localStorage.setItem('userInfo', JSON.stringify({username: this.username, userpwd: this.userpwd, code: new Date().getTime()}));
    }else{
      window.localStorage.clear();
    }
    this.router.navigateByUrl('/home/welcome');
  }

}
