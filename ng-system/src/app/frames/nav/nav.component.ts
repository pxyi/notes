import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  /* 设置导航列表 */
  public navItems: any[] = [
    {
      title: '欢迎页',
      url: '/home/welcome',
      icon: 'icon-all'
    },
    {
      title: '文章管理',
      icon: 'icon-box',
      list: [
        {
          title: '文章列表',
          url: '/home/list'
        },
        {
          title: '文章详情',
          url: '/home/details/0'
        },
      ]
    }
  ];

  /* 点击一级菜单执行的方法 */
  private hasFocus: number = 1;
  clickNav(i: number): void {
    if(this.navItems[i].list && this.hasFocus == i){
      this.hasFocus = -1;
    }else if(this.navItems[i].list){
      this.hasFocus = i;
    }else{
      this.hasFocus = i;
      this.childFocus = '';
      this.router.navigate([this.navItems[i].url]);
    }
  }

  /* 通过设置 childFocus 的值为当前url 控制子级A标记的 active 样式 */
  private childFocus: string;
  listFocus(url: string): void{
    this.childFocus = url;
  }

  ngOnInit() {
  }

}