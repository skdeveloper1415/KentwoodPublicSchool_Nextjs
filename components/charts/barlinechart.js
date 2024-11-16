import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { Bellota_Text } from 'next/font/google';
import { useTheme } from "next-themes";
import { FormatNum, getRankSuffix } from '../utils';


export default function Barlinechart({ xaxisLabel,xaxisTick,xaxisLine,min,max,interval,data, yAxisName, yAxisNameGap, yAxisNamePosition, yAxisName1, yAxisNameGap1, yAxisNamePosition1, xAxisName, xAxisNameGap, xAxisNamePosition, formatter, lineColor1, barName, lineName1, grid, barWidth, legends, barcolor, colors, Name1,yaxisLabel ,yaxisLine,yaxisSplitlines,yaxisLabel1,yaxisLine1,yaxisSplitlines1,label1,itemstyle1,itemstyle2,
    tooltip={
        Category: '',
        // StudentGroup: '',
        metric1: 'Percent Proficient',
        metric2: 'StateWideAverge',
    },
    tooltipFormater,
    tooltipercent=false,
    ChartSplitLine,
    suffixth=false
}) {

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const options = {
        legend: legends,
        grid: grid,
        tooltip:{
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: (params) => {
                return `<div style="min-width:12rem;max-width:15rem">
                  <div style="display:flex;width:'100%';justify-content:space-between;gap: 5px;">
                    <p>Category:</p>
                    <p style="font-weight:bold;">${tooltip.Category}</p>
                  </div>
                  <div style="display:flex;width:'100%';justify-content:space-between;gap: 5px;">
                    <p>Student Group:</p>
                    <p style="font-weight:bold;text-wrap: pretty;text-align: right;">${params[0]?.axisValueLabel}</p>
                  </div>
                  <div style="display:flex;width:'100%';justify-content:space-between;gap: 5px;">
                    <p style="text-wrap: pretty;text-align: left;">${tooltip.metric1}:</p>
                    <p style="font-weight:bold;margin-top:auto;">${suffixth ? getRankSuffix(params[0].value) : tooltipercent ? FormatNum(params[0]?.value,1) : FormatNum(params[0]?.value,1)+'%'}</p>
                  </div>
                  <div style="display:${tooltip.metric2 ? 'flex' : 'none'};width:'100%';justify-content:space-between;margin-bottom:5px;gap: 5px;]">
                    <p style="text-wrap: pretty;text-align: left;">${tooltip.metric2}:</p>
                    <p style="font-weight:bold;margin-top:auto;">${tooltipFormater ? tooltipFormater(params[1]?.value) : FormatNum(params[1]?.value,1)}</p>
                  </div>
                </div>`
              },
        },
        xAxis: {
            axisLabel:xaxisLabel,
            axisTick:xaxisTick,
            name: xAxisName,
            nameLocation: xAxisNamePosition,
            nameGap: xAxisNameGap,
            type: 'category',
            data: data.labels,
            nameTextStyle: {
                color: "#D1D5DB"
            },
            axisLine:xaxisLine,
        },
        yAxis: [{
            type: 'value',
            // min: min,
            // max: max,
            // interval: interval,
            splitNumber:5,
            axisLabel:yaxisLabel,
            axisLine: yaxisLine,
            name: yAxisName,
            nameLocation: yAxisNamePosition,
            nameGap: yAxisNameGap,
            nameTextStyle: {
                color: '#D1D5DB',
            },
            splitLine:yaxisSplitlines,
        },
        {
            type: 'value',
            // min: min,
            // max: max,
            // interval: interval,
            splitNumber:5,
            axisLabel:yaxisLabel1,
            axisLine: yaxisLine1,
            name: yAxisName1,
            nameLocation: yAxisNamePosition1,
            nameGap: yAxisNameGap1,
            nameTextStyle: {
                color: '#D1D5DB',
            },
            splitLine:yaxisSplitlines1,
        }
        ],
        color: colors,
        series: [
            {
                name: Name1,
                interval: 0,
                label:label1,
                itemStyle:itemstyle1,
                data: data.values,
                barWidth: barWidth,
                type: 'bar',
                yAxisIndex: 0,
                markLine: ChartSplitLine
            },
            {
                name: lineName1,
                type: 'line',
                data: data.values2,
                symbolSize: 4,
                symbol: 'none',
                itemStyle: {
                    color: lineColor1
                },
                lineStyle: {
                    type: 'dashed',
                    opacity: 0,
                    silent: true
                },
                yAxisIndex: 1,
            },

        ]
    };


    return (
        <>
            <ReactEcharts
                echarts={echarts}
                option={options}
                opts={{ renderer: 'svg' }}
                style={{ width: "100%", height: "100%" }}
            />
        </>
    );
}