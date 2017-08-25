import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, DoCheck {

  constructor() { }

  ngOnInit() {
  }
  /*  */
  private option1 = {
        tooltip : {
            trigger: 'axis'
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                axisLine: {
                    lineStyle: {
                        color: '#888',
                        width: 0
                    }
                },
                offset: 3
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLine: {
                    lineStyle: {
                        color: '#888',
                        width: 0
                    }
                },
                offset: 5
            }
        ],
        series : [
            {
                name:'成交',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                lineStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                areaStyle:{
                    normal: {
                        color: '#417bf6',
                        opacity: 1
                    }
                },
                data:[0, 245, 0, 190, 30, 160, 12, 78, 5, 192, 0, 0]
            },
            {
                name:'预购',
                type:'line',
                smooth:true,
                itemStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                lineStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                areaStyle:{
                    normal: {
                        color: '#53a0f8',
                        opacity: 1
                    }
                },
                data:[0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 300, 0]
            }
        ]
    };
  private option2 = {
                tooltip : {
                    trigger: 'axis'
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                        axisLine: {
                            lineStyle: {
                                color: '#888',
                                width: 0
                            }
                        },
                        offset: 3
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#888',
                                width: 0
                            }
                        },
                        offset: 5
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        smooth:true,
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        areaStyle:{
                            normal: {
                                color: '#417bf6',
                                opacity: 1
                            }
                        },
                        data:[295, 0, 231, 10, 179, 54, 120, 0, 201, 43, 62, 10]
                    },
                    {
                        name:'预购',
                        type:'line',
                        smooth:true,
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        areaStyle:{
                            normal: {
                                color: '#53a0f8',
                                opacity: 1
                            }
                        },
                        data:[0, 89, 0, 110, 0, 0, 0, 0, 0, 278, 0, 12]
                    }
                ]
            };

  chartOption = this.option1;
  optionBool: boolean;

  loading: boolean = false;
  ngDoCheck() {
      if(this.loading){
          /* 刷新 */
          setTimeout(() => {
            if(this.optionBool){
                this.chartOption = this.option1;
            }else{
                this.chartOption = this.option2;
            }
            this.optionBool = !this.optionBool;
            this.loading = false;
          }, 2000)
      }
  }

  /* 柱状图 */
  zztOption = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'One', 'Two', 'Three', 'Four', 'Five'],
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color: '#888',
                    width: 0
                }
            },
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine: {
                lineStyle: {
                    color: '#888',
                    width: 0
                }
            },
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220, 110, 435, 70, 130, 180]
        }
    ]
  }

}
