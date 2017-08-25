import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('search', [
      state('on', style({
        width: '180px'
      })),
      state('off', style({
        width: '0'
      })),
      transition('* => *', animate(150))
    ]),
    trigger('inform', [
      state('on', style({
        height: '56px'
      })),
      state('off', style({
        height: 0
      })),
      transition('* => *', animate(250))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /* 搜索 */
  searchAnimate: string = 'off';
  searchShow(): void{
    if(this.searchAnimate == 'on'){
      this.searchAnimate = 'off'
    }else{
      this.searchAnimate = 'on';
    }
  }
  searchChange(value: string): void{
    console.log(`您要搜索的内容是：${value}`);
  }

  /* inform */
  informSwitch: string = 'off';
  inforSwitch(): void{
    if(this.informSwitch == 'on'){
      this.informSwitch = 'off'
    }else{
      this.informSwitch = 'on';
    }
  }

}
