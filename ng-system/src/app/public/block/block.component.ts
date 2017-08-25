import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  animations: [
    trigger('slides', [
      state('down', style({
          height: '58px'
      })),
      transition('* => *', animate(250))
    ]),
    trigger('fullScreen', [
      state('fixed', style({
        width: '100%',
        height: '100%',
        overflow: 'auto',
        background: '#fff',
        position: 'fixed',
        top: 0,
        left: 0,
        'z-index': 9999
      })),
      transition('* => *', animate(250))
    ])
  ]
})
export class BlockComponent implements OnInit {

  slide: string;
  blockSlide(): void{
    this.fixed = ''
    if(this.slide == 'down'){
      this.slide = ''
    }else{
      this.slide = 'down'
    }
  }
  fixed: string;
  fullScreen(): void{
    this.slide = ''
    if(this.fixed == 'fixed'){
      this.fixed = ''
    }else{
      this.fixed = 'fixed'
    }
  }

  close: boolean;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  blockLoading: boolean;
  @Output()
  blockLoadingChange: EventEmitter<boolean> = new EventEmitter();
  showLoading(): void{
    this.blockLoading = true;
    this.blockLoadingChange.emit(this.blockLoading);
  }

  @Input()
  readonly: boolean = false;

}
