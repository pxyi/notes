import { LoadingService } from './../../public/loading/loading.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('router', [
      state('off', style({
        transform: 'translate3d(30px, 0, 0)',
        opacity: 0,
      })),
      state('on', style({
        transform: 'none',
        opacity: 1,
      })),
      transition('off => on', animate(250))
    ])
  ]
})
export class ContainerComponent implements OnInit {

  /* 
  *  根据路由跳转状态 控制ui-view 内容区域显示隐藏 
  */
  public switch: string = 'on';

  constructor(
    public router: Router,
    public loadingService: LoadingService
  ) { }

  /* 记录页面跳转开始和结束时间 */
  private navigationStartTime: number;
  private navigationEndTime: number;

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.loadingService.show = false;
        this.navigationEndTime = new Date().getTime();
        let setTime = 150 - (this.navigationEndTime - this.navigationStartTime) < 0 ? 0 : 150 - (this.navigationEndTime - this.navigationStartTime);
        setTimeout( () => {
          this.switch = 'on';
        }, setTime)
      }
      if (event instanceof NavigationStart) { // 当导航成功结束时执行
        this.loadingService.show = true;
        this.switch = 'off';
        this.navigationStartTime = new Date().getTime();
      }
    });
  }

}
