import React from 'react'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";


export default function Linechart({grid, data }) {
 
    const option = {
        grid:grid,
        legend:{show: false},
        xAxis: {
            type: 'category',
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#9fa0a3',
                    fontSize:9
                },
            },
            interval:0,
            axisLine: {  show: false },
            axisTick: { show: false },
            data: data.label
        },
        yAxis: {
            interval:20,
            min:0,
            max:100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#BECDE3'
                }
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#9fa0a3',
                    fontSize:9
                },
                formatter: '{value}%'
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'line',
                    color:'#565a5e'
                }
            },
            type: 'value',
            max: 100,
            min: 0,
            interval: 50
        },
        series: [
            {
                data: data.value,
                type: 'line',
                smooth: true,
                lineStyle: {
                width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: '#31C48D'
                      },
                      {
                        offset: 1,
                        color: '#31C48D42'
                      }
                    ])
                  },
            }
        ]
    };

    return (
        <ReactEcharts
            option={option}
            style={{ width: "100%", height: "100%" }}
        />
    )
}