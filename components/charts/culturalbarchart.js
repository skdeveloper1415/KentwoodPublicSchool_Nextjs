import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { Bellota_Text } from 'next/font/google';
import { useTheme } from "next-themes";


export default function CulturalBarChart({ xaxisLabel,xaxisTick,xaxisLine,min,max,interval,data, yAxisName, yAxisNameGap, yAxisNamePosition, xAxisName, xAxisNameGap, xAxisNamePosition, formatter, lineColor1, barName, lineName1, grid, barWidth, legends, barcolor, colors, Name1,yaxisLabel ,yaxisLine,yaxisSplitlines,label1,itemstyle1,itemstyle2}) {

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const options = {
        legend: legends,
        grid: grid,
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
        yAxis: {
            type: 'value',
            min: min,
            max: max,
            interval: interval,
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
                name: barName
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
                    type: 'dashed'
                }
            },

        ]
    };


    return (
        <>
            <ReactEcharts
                echarts={echarts}
                option={options}
                opts={{ renderer: 'svg' }}
            />
        </>
    );
}