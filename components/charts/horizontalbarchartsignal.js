import React from 'react'
import ReactEcharts from "echarts-for-react";

export default function Horizontalbarchart2({ legend, grid,xAxisSplitLine,yAxisdata2,data,xAxisLabel,yAxisLabel2,yAxisdata, yAxisLine,yAxisLine2,yAxisLabel,yAxisTick,label, itemStyle, name ,showBackground,barWidth,backgroundStyle}) {

    const barchart = {
        legend:legend,
        grid:grid,
        
        xAxis: {
          type: 'value',
          axisPointer: {
            type: 'shadow',
          },
          min: 0,
          max: 100,
          axisLabel: xAxisLabel,
          splitLine: xAxisSplitLine
        },
        yAxis: [{
          type: 'category',
          axisLabel:yAxisLabel,
          axisTick:yAxisTick,
          axisLine:yAxisLine,
          data: yAxisdata
        },{
          type: 'category',
          axisLabel: yAxisLabel2,
          axisTick: {
            show: false
          },
          axisLine: yAxisLine2,
       
          data: yAxisdata2
        }],
        series: [{
          name: name,
          barWidth:barWidth,
          showBackground: showBackground,
          backgroundStyle: backgroundStyle,
          type: 'bar',
          label:label,
          itemStyle:itemStyle,
          data: data
        }]
      };
      
    return (
        <ReactEcharts
            option={barchart}
            style={{ width: "100%", height: "100%" }}
        />
    )
}
