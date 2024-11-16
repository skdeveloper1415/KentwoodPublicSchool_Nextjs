import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function Linechartwithgradient({ grid, data, lineStyle, areaStyle }) {

    const options = {
        legend: {show: false},
        grid: grid,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                  color: "#5C5E5E",
                  type: "dashed"
                }
              },
            axisTick: { show: false },
            axisLabel: { show: false },
            data: data.label
        },

        yAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: { show: false },
            axisLine: { show: false },
            // min: 0,
            // max: 10,
            // interval: 1
        },
        series: [
            {
                name: 'Students',
                type: 'line',
                smooth: true,
                symbol: 'none',
                symbolSize: 100, 
                lineStyle: lineStyle,
                areaStyle: areaStyle,
                data: data.value
            }
        ]
    };

    return (
        <ReactEcharts
            echarts={echarts}
            option={options}
            style={{ width: '100%', height: '100%' }}
        />
    )
};