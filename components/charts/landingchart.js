import React, { useMemo } from 'react'
import ReactEcharts from "echarts-for-react";

export default function LandingChart({ legend, grid,xAxisSplitLine,yAxisdata2,data,xAxisLabel,yAxisLabel2,yAxisdata, yAxisLine,yAxisLine2,yAxisLabel,yAxisTick,barWidth}) {

    // const Colors = {"Done":"#498E71","Working on it":"#335D76","Not yet started":"#7A3033"}
    const Colors = {"Done":"#59A14F","Working on it":"#EDC948","Not yet started":"#BAB0AC"}

    // let StatusOrder = ["Not yet started", "Working on it", "Done"]
    let StatusOrder = ["Done", "In Progress", "Not yet started"]
    
    const series = useMemo(()=> data ? Object.entries(data)?.map(([key,value],i)=>(
      {
        name: key == "Working on it" ? 'In Progress' : key,
        barWidth:barWidth,
        showBackground: false,
        type: 'bar',
        label: {
          show: true,
          formatter: (params) => params.value?.toFixed(0)+"%",
          fontSize: 10
        },
        itemStyle: {
          color: Colors[key],
          // borderRadius: arr.length - 1 == i ? [0, 4, 4, 0] : i == 0 ? [4, 0, 0, 4] : null
        },
        data: [value],
        stack: 'total',
      }
    )) : []
    ,[data]) 

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
      //   series: [
      //     {
      //       name: 'DONE',
      //     barWidth:barWidth,
      //     showBackground: false,
      //     type: 'bar',
      //     label: {
      //       show: true,
      //       formatter: '{c}%',
      //       fontSize: 10
      //     },
      //     itemStyle: {
      //       color: "#498E71",
      //       borderRadius: [4, 0, 0, 4]
      //     },
      //     data: [30],
      //     stack: 'total',
      //   },
      //   {
      //     name: 'INPROGRESS',
      //     barWidth:barWidth,
      //     showBackground: false,
      //     type: 'bar',
      //     label: {
      //       show: true,
      //       formatter: '{c}%',
      //       fontSize: 10
      //     },
      //     itemStyle: {
      //       color: "#335D76"
      //     },
      //     data: [30],
      //     stack: 'total',
      //   },
      //   {
      //     name: 'NOT YET STARTED',
      //     barWidth:barWidth,
      //     showBackground: false,
      //     type: 'bar',
      //     label: {
      //       show: true,
      //       formatter: '{c}%',
      //       fontSize: 11,
           
      //     },
      //     itemStyle: {
      //       color: "#7A3033",
      //       borderRadius: [0, 4, 4, 0]
      //     },
      //     data: [40],
      //     stack: 'total',
      //   }
      // ]
      series: series?.sort((a,b)=>{
        if (StatusOrder.includes(a["name"]) && StatusOrder.includes(b["name"])){
          return StatusOrder.indexOf(a["name"]) - StatusOrder.indexOf(b["name"])
        }
        else{
            return b["name"]?.localeCompare(a["name"])
        }
      })?.map((item,i,arr) => {
        let series = item;
        series.itemStyle = {...series.itemStyle, borderRadius: arr.length - 1 == i ? [0, 4, 4, 0] : i == 0 ? [4, 0, 0, 4] : null}
        return series
      })
      };
      
    return (
        <ReactEcharts
            option={barchart}
            style={{ width: "100%", height: "100%" }}
        />
    )
}
