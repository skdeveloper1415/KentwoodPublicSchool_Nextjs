import React from 'react'
import ReactEcharts from "echarts-for-react";
import { FormatNum } from '../utils';

export default function HorizontalStackBarChart({ legend, grid, xAxisName,xAxisNamePosition,xAxisNameGap, yAxisName,yAxisNamePosition,yAxisNameGap, xAxisSplitLine, data, data1, data2, data4, data5, dataObj, xAxisLabel, yAxisdata, yAxisLine, yAxisLabel, yAxisTick, label, itemStyle, name, name2, name3, name4, name5, barWidth, itemStyle2, itemStyle3, itemStyle4, itemStyle5, min, max, ChartDesc={}, yAxisdata1, tooltipformater,
  TileName, TileTitle
}) {
  
  // const Colors = ["#F076B2","#EDC948","#B7E1CD","#0090FF","#B07AA1"]
  const Colors = ["#2A5783","#4776A4","#6798C1","#8BBADC","#B9DDF1"]

  const barchart = {
    legend: legend,
    grid: grid,
    tooltip:{
      show: true,
      // trigger: yAxisdata1 ? null : 'axis',
      // axisPointer: {
      //   type: yAxisdata1 ? null : 'shadow'
      // },
      formatter: (params)=>{
        if(yAxisdata1){
          return `<div style="min-width:10rem;max-width:15rem;">
                        <div style="display:flex;justify-content:space-between;gap:5px;">
                            <p style="max-width:12rem;text-wrap:pretty;text-align:left">Group:</p>
                            <p style="font-weight:bold;margin-top:auto;text-wrap:pretty;text-align:right">${params.name}</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;gap:5px;">
                            <p style="max-width:12rem;text-wrap:pretty;text-align:left">Student Group:</p>
                            <p style="font-weight:bold;margin-top:auto;text-wrap:pretty;text-align:right">${params.seriesName}</p>
                        </div>
                        <div style="display:flex;justify-content:space-between;gap:5px;">
                            <p style="max-width:12rem;text-wrap:pretty;text-align:left">Percent of Students:</p>
                            <p style="font-weight:bold;margin-top:auto">${tooltipformater ? tooltipformater(FormatNum(params.value,1)) : FormatNum(params.value,1)}</p>
                        </div>
                    </div>`
        }
        // return `<div style="width:15rem">
        //   <div style="display:flex;width:'100%';justify-content:space-between">
        //     <p>${params[0]?.marker} ${params[0]?.seriesName}</p>
        //     <p>${FormatNum(params[0]?.value,1)}%</p>
        //   </div>
        //   <div style="display:flex;width:'100%';justify-content:space-between">
        //     <p>${params[1]?.marker} ${params[1]?.seriesName}</p>
        //     <p>${FormatNum(params[1]?.value,1)}%</p>
        //   </div>
        //   <div style="display:flex;width:'100%';justify-content:space-between;margin-bottom:5px;">
        //     <p>${params[2]?.marker} ${params[2]?.seriesName}</p>
        //     <p>${FormatNum(params[2]?.value,1)}%</p>
        //   </div>
        //   <div style="width:'100%';text-wrap: pretty;">${yAxisdata[params[0]?.dataIndex]} - ${params[0]?.name || ""}</div>
        // </div>`
        return `<div style="min-width:30rem;max-width:35rem;width:fit-content;box-sizing: border-box;">
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Goal:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">${yAxisdata[params?.dataIndex]?.slice(0,2)} ${TileName}</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Initiative:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">${yAxisdata[params?.dataIndex]?.slice(0,4)} ${TileTitle}</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Success Indicator:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">${yAxisdata[params?.dataIndex]} - ${params?.name || ""}</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Start Date:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">November 2023</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">End Date:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">December 2023</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Status:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">${params.seriesName}</p>
          </div>
          <div style="display:flex;width:'100%';">
            <p style="margin-right:.5rem;width:20%;">Percent Progress:</p>
            <p style="font-weight:bold;text-wrap: pretty;margin-top:auto;text-align:left;width:80%;padding-left:5px;">${FormatNum(params.value,1)}%</p>
          </div>
        </div>`
      },
      confine:true
    },
    xAxis: {
      type: 'value',
      min: min,
      max: max,
      name: xAxisName,
      nameLocation: xAxisNamePosition,
      nameGap: xAxisNameGap,
      axisLabel: xAxisLabel,
      splitLine: xAxisSplitLine,
      nameTextStyle: {
        color:  '#E5E7EB',
      },
    },
    yAxis: [{
      type: 'category',
      name: yAxisName,
      nameLocation: yAxisNamePosition,
      nameGap: yAxisNameGap,
      axisLabel: yAxisLabel,
      axisTick: yAxisTick,
      axisLine: yAxisLine,
      // data: yAxisdata,
      data: yAxisdata1 ? yAxisdata1 : yAxisdata.map(label => ChartDesc?.[label] || ""),
      nameTextStyle: {
        color:  '#E5E7EB',
      },
    },
    ],
    // series: [
    //   {
    //     name: name,
    //     barWidth: barWidth,
    //     stack: 'total',
    //     type: 'bar',
    //     label: label,
    //     itemStyle: itemStyle,
    //     data: data
    //   },
    //   {
    //     name: name2,
    //     barWidth: barWidth,
    //     stack: 'total',
    //     type: 'bar',
    //     label: label,
    //     itemStyle: itemStyle2,
    //     data: data1
    //   },
    //   {
    //     name: name3,
    //     barWidth: barWidth,
    //     stack: 'total',
    //     type: 'bar',
    //     label: label,
    //     itemStyle: itemStyle3,
    //     data: data2
    //   },
    //   {
    //     name: name4,
    //     barWidth: barWidth,
    //     stack: 'total',
    //     type: 'bar',
    //     label: label,
    //     itemStyle: itemStyle4,
    //     data: data4
    //   },
    //   {
    //     name: name5,
    //     barWidth: barWidth,
    //     stack: 'total',
    //     type: 'bar',
    //     label: label,
    //     itemStyle: itemStyle5,
    //     data: data5
    //   },
    // ]
    series: dataObj ? Object.entries(dataObj).map(([key,value],index)=>({
      name: key,
      barWidth: barWidth,
      stack: 'total',
      type: 'bar',
      label: label,
      itemStyle: {
        borderRadius: 0,
        color: Colors[index%Colors.length]
      },
      data: value
    })): [
      {
        name: name,
        barWidth: barWidth,
        stack: 'total',
        type: 'bar',
        label: label,
        itemStyle: itemStyle,
        data: data
      },
      {
        name: name2,
        barWidth: barWidth,
        stack: 'total',
        type: 'bar',
        label: label,
        itemStyle: itemStyle2,
        data: data1
      },
      {
        name: name3,
        barWidth: barWidth,
        stack: 'total',
        type: 'bar',
        label: label,
        itemStyle: itemStyle3,
        data: data2
      },
      {
        name: name4,
        barWidth: barWidth,
        stack: 'total',
        type: 'bar',
        label: label,
        itemStyle: itemStyle4,
        data: data4
      },
      {
        name: name5,
        barWidth: barWidth,
        stack: 'total',
        type: 'bar',
        label: label,
        itemStyle: itemStyle5,
        data: data5
      },
    ]
  };

  return (
    <ReactEcharts
      option={barchart}
      style={{ width: "100%", height: "100%" }}
    />
  )
}




{/* <div className="h-[8.385vw] border">
            <HorizontalStackBarChart
              legend={{
                left: 20,
                bottom: 0,
                textStyle: {
                  fontSize: 10,
                  color: "#FFFFFF",
                },
                itemWidth: 9,
                itemHeight: 9,
              }}
              grid={{
                top: 10,
                left: 20,
                right: 30,
                bottom: 25,
                containLabel: true
              }}
              min={10}
              max={60}
              xAxisLabel={{
                show: true,
                fontSize: 12,
                color: '#fff',
                formatter: '{value}%'
              }}
              xAxisSplitLine={{
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "#504843"
                }
              }}
              yAxisLabel={{
                color: "#fff",
                fontSize: 12
              }}
              yAxisTick={{show: false}}
              yAxisLine={{
                show: true,
                lineStyle: {
                  color: "#47403C",
                }
              }}
              yAxisdata={['1.1.3', '1.1.2', '1.1.1']}
              barWidth={15}
              name={'Done'}
              name2={'InProgress'}
              name3={'Not Started'}
              label={{ show: false }}
              itemStyle={{
                color: '#498E71',
                borderRadius: 0
              }}
              itemStyle2={{
                color: '#335D76',
                borderRadius: 0
              }}
              itemStyle3={{
                color: '#72685C',
                borderRadius: 0
              }}
              data={[12, 15, 20]}
              data1={[5, 15, 8]}
              data2={[45, 30, 32]}
            />
          </div> */}