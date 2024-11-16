import React from 'react'
import ReactEcharts from "echarts-for-react";
import { ConvertToK, FormatNum, getReadableValue } from '../utils';


export default function Verticlebarchart({ grid, data, interval,xAxisdata,data1, data2, data3, max, colors,originalData = [], rotate = 0 ,formatter, orientation=true,
    Barlabel = {
        show: true,
        fontSize: 'auto',
        formatter: (params) => params.value ? FormatNum(params.value,1) + "%" : "",
    },
    seriesname, tooltipformater, stack , splitNumber,
    // categoryName
    customOpt
}) {
    
    const categoryLabel = {
        // name: categoryName ? categoryName : null,
        // nameLocation: 'middle',       // Position name in the middle along the axis
        // nameGap: categoryName ? 70 : null,
        // nameTextStyle: {
        //     fontSize: 9,             
        //     fontWeight: 100,
        //     color: '#9fa0a3',
        // },

        type: 'category',
        axisLabel: {
            show: true,
            textStyle: {
                // color: '#9fa0a3',
                color: '#fff',
                fontSize: 11,
                // interval: -1,
            },
            rotate: rotate,
            interval: 0,
            width: 60,
            overflow: 'truncate'
        },

        axisLine: { show: false },
        axisTick: { show: false },
        data: xAxisdata
    }

    const valueLabel = {
        // interval: interval || 50,
        // min: 0,
         max: max || null,
        splitNumber: splitNumber || 3,
        axisLine: {
            show: false,
            lineStyle: {
                color: '#BECDE3'
            }
        },
        axisLabel: {
            show: true,
            textStyle: {
                // color: '#9fa0a3',
                color: '#fff',
                fontSize: 11
            },
            // formatter: function (label) {
            //     return ConvertToK(label)
            // }
            formatter: formatter
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'line',
                color: '#565a5e'
            }
        },
        type: 'value',
        // max: 100,
        // min: 0,
        // interval: 50
    }
    
    const option = {
        // title: {
        //     text: categoryName,
        //     textStyle: {
        //         fontSize: 16,             
        //         fontWeight: 500,
        //         color: '#fff',
        //         textShadowOffsetY: 20
        //     },
        //     padding: [0,0,20,5]
        // },
        grid: grid,
        legend: { show: false },
        color:colors,
        tooltip: {
            show: true,
            formatter: (params) => {
                if (seriesname){
                    return `<div>
                        <div style="font-weight:bold;text-align:left">${params.name}</div>
                        <div style="display:flex;justify-content:space-between;gap:5px;">
                            <p style="max-width:12rem;text-wrap:pretty;text-align:left">${params.seriesName}:</p>
                            <p style="font-weight:bold;margin-top:auto">${tooltipformater ? tooltipformater(FormatNum(params.value,1)) : FormatNum(params.value,1)}</p>
                        </div>
                    </div>`
                }
                    // return `${params.marker} ${params.name} ${getReadableValue(params.data.value)} `
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
        },
        // Swap Axis names to Turn vertical or Horizontal and adjust the gird values
        // xAxis: {
        yAxis: orientation ? categoryLabel : valueLabel,
        // yAxis: {
        xAxis: orientation ? valueLabel : categoryLabel,
        dataZoom: originalData?.length >= 4 ? [{
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            zoomLock: true,
            height: 5,
            handleSize: '10%',
            showDetail: false,
            brushSelect: false,
            bottom: 0
        }] : [],
        series: Array.isArray(data1) ? [
            {
                // data: data.value?.map((item, index) => {
                //     return {
                //         value: item,
                //         variance: data?.variance?.[index]
                //     }
                // }),
                name: seriesname || 'Bar 1',
                type: 'bar',
                itemStyle: {
                    borderRadius: [2, 2, 0, 0]
                },
                data: data1,
                label: Barlabel
            },
          
           
        ] : Object.entries(data1 || {}).map(([key,value])=>({
            name: String(key)?.replace("_"," "),
            type: 'bar',
            // barGap: 0,
            stack: stack ? "Total" : null,
            itemStyle: {
                borderRadius: [2, 2, 0, 0]
            },
            data: value,
            label: Barlabel
        }))
    };

    return (
        <ReactEcharts
            option={customOpt ? customOpt : option}
            style={{ width: "100%", height: "100%" }}
        />
    )
}