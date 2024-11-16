import React from 'react';
import ReactEcharts from 'echarts-for-react';
 
 
export default function DemographicBarChart({legend,grid,xAxixdata,yAxisanme,yAxisLabel,yAxisaxisLine,yAxisaxissplitLine,yAxisTick,yAxisMax,yAxisinterval,yAxisMin,name,data, name1, data1, name2, data2, malecolor, Femalecolor, Othercolor}) {
 
  const option = {
    legend: legend,
      grid: grid,
      xAxis: xAxixdata,
      yAxis: {
        name:yAxisanme,
        nameLocation: "middle",
        nameGap: 50,
        nameTextStyle: {
          color: "rgba(255, 255, 255, 1)",
          fontSize: 12
        },
        axisLabel:yAxisLabel,
        axisLine:yAxisaxisLine,
        splitLine:yAxisaxissplitLine,
        axisTick:yAxisTick,
        type: 'value',
        max:yAxisMax,
        min:yAxisMin,
        interval:yAxisinterval,
      },
      series: [
        {
          name:name,
          data: [
            {
              value: 5652,
              itemStyle: {
                color: '#B07AA1'
              }
            },
            {
              value: 2582,
              itemStyle: {
                color: '#EDC948'
              }
            },
            {
              value: 1800,
              itemStyle: {
                color: '#B7E1CD'
              }
            },
          ],
          itemStyle: {
          borderRadius: [2, 2, 0, 0]
          },
          type: 'bar',
          color:malecolor,
        },
      ]
  };
 
 
    return (
        <ReactEcharts
         
            option={option}
            style={{ width: '100%', height: '100%' }}
        />
    )
};