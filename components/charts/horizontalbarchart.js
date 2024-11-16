import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { FormatNum } from '../utils';


export default function HorizontalBarChart({ data = [],min,max,interval, name1, name2, name3,data1,data2,data3,color1,color2,color3, dataset,barWidth,legend, grid, yAxisanme, xAxisaxissplitLine, yAxisaxisLine, yAxisaxissplitLine, yAxisTick , xAxisaxisLine, chartDesc={}}) {
  // let metric_type = data?.[0]?.["METRIC_TYPE"]

  // const colors = ["#B07AA1", "#EDC948", "#B7E1CD", "#1570ef", "#29d478", "#84e1bc", "#f98080", "#e3a008", "#7287f1"]

  const option = {
    legend: legend,
    grid: grid,
    tooltip:{
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      // <div>${dataset[params[0]?.dataIndex]}</div>
      formatter: (params)=>{
        return `<div style="width:15rem">
          <div style="display:flex;width:'100%';justify-content:space-between">
            <p>${params[0].marker} ${params[0].seriesName}</p>
            <p>${FormatNum(params[0].value,1)}%</p>
          </div>
          <div style="display:flex;width:'100%';justify-content:space-between">
            <p>${params[1].marker} ${params[1].seriesName}</p>
            <p>${FormatNum(params[1].value,1)}%</p>
          </div>
          <div style="display:flex;width:'100%';justify-content:space-between;margin-bottom:5px;">
            <p>${params[2].marker} ${params[2].seriesName}</p>
            <p>${FormatNum(params[2].value,1)}%</p>
          </div>
          <div style="width:'100%';text-wrap: pretty;">${dataset[params[0]?.dataIndex]} - ${params[0]?.name || ""}</div>
        </div>`
      },
      confine:true
    },
    xAxis: {
      type: 'value',
      splitLine: xAxisaxissplitLine,
      axisLine:xAxisaxisLine,
      axisLabel: { color: "rgba(229, 231, 235, 11)", fontSize: 10,formatter:"{value}%" },
      // min:min,
      // max:max,
      // interval
    },
    yAxis: {
      type: 'category',
      // data: dataset,
      data: dataset.map(label => chartDesc?.[label] || ""),
      axisTick: { show: false },
      axisLine:yAxisaxisLine,
      splitLine:yAxisaxissplitLine,
      // axisLabel: { color: "rgba(229, 231, 235, 11)", fontSize: 10 },
      axisLabel: { 
        color: "rgba(229, 231, 235, 11)",
        fontSize: 10,
        width: 80,
        overflow: 'truncate',
      },
      yaxisname:yAxisanme
    },
    series: [
      {
        name: name1,
        barWidth:barWidth,
        barMaxWidth: 35,
        type: 'bar',
        stack: 'total',
        // label: { show: false },
        label: { 
          show: true,
          fontSize: 'auto',
          color:'white',
          formatter: (params) => params.value ? FormatNum(params.value,1) + "%" : "",
        },
        color:color1,
        data: data1,
        tooltip:{
          valueFormatter: value => `${value?.toFixed(0)}%`
        }
      },
      {
        name: name2,
        type: 'bar',
        stack: 'total',
        // label: { show: false },
        label: { 
          show: true,
          fontSize: 'auto',
          formatter: (params) => params.value ? FormatNum(params.value,1) + "%" : "",
        },
        color:color2,
        data: data2,
        tooltip:{
          valueFormatter: value => `${value?.toFixed(0)}%`
        }
      },
      {
        name: name3,
        type: 'bar',
        stack: 'total',
        // label: { show: false },
        label: { 
          show: true,
          fontSize: 'auto',
          formatter: (params) => params.value ? FormatNum(params.value,0) + "%" : "",
        },
        color:color3,
        data: data3,
        tooltip:{
          valueFormatter: value => `${value?.toFixed(0)}%`
        }
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