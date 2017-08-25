import { Component, OnInit, Input, Output, AfterViewInit, OnChanges, EventEmitter, OnDestroy } from '@angular/core';
declare const laydate: any;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /* 必填 input框的Id */
  @Input()
  id: string;
  /* 可选 默认值 */
  @Input()
  value: string = '';
  /* 可选 最小值 */
  @Input()
  minValue: string = '';
  /* 可选 最大值 */
  @Input()
  maxValue: string = '';
  /* 可选 是否有最大/小值限制 */
  @Input()
  limit = {min: '',max: ''};
  /* 可选 时间格式 */
  @Input()
  format: string = 'YYYY-MM-DD';

  constructor() { 
  }

  /* 输出事件 */
  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();

  ngOnInit() { 
  }
  
  ngAfterViewInit() {
    let _this = this;
    window[_this.id] = {
      elem: `#${this.id}`,
      format: this.format,
      choose: function(datas){
        if(_this.limit.min && _this.limit.min.length){
          window[_this.limit.min].min = datas;
        }
        if(_this.limit.max && _this.limit.max.length){
          window[_this.limit.max].max = datas;
        }
        _this.value = datas;
        _this.valueChange.emit(_this.value);
      }
    }
    if(new Date(_this.minValue).getTime()){
      window[_this.id].min = _this.minValue
    }
    if(new Date(_this.maxValue).getTime()){
      window[_this.id].max = _this.maxValue
    }
    setTimeout(() => {
      laydate(window[_this.id])
    },0)
  }
  ngOnChanges() { }
  ngOnDestroy() {
    
  }

}
