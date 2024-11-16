import React from 'react'
import ReactEcharts from "echarts-for-react";

export default function VerticalStackBarChart({ legend, grid, yAxisSplitLine, data,data1,data2, xAxisLabel, xAxisdata, xAxisLine, yAxisLabel, xAxisTick, label, itemStyle, name,name2,name3, barWidth, itemStyle2, itemStyle3, min, max, AxisnameStyle,yAxisName,xAxisName }) {

    const barchart = {
        legend: legend,
        grid: grid,
        yAxis: {
            type: 'value',
            name:yAxisName,
            // min: min,
            // max: max,
            axisLabel: yAxisLabel,
            splitLine: yAxisSplitLine,
            nameRotate: 90,
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: AxisnameStyle,
        },
        xAxis: [{
            type: 'category',
            name: xAxisName,
            axisLabel: xAxisLabel,
            axisTick: xAxisTick,
            axisLine: xAxisLine,
            data: xAxisdata,
            nameLocation: 'middle',
            nameGap: 25,
            nameTextStyle: AxisnameStyle,
        }, 
        ],
        series: [
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
        ]
    };

    return (
        <ReactEcharts
            option={barchart}
            style={{ width: "100%", height: "100%" }}
        />
    )
}




{/* <div className="h-[19.323vw] border">
            <VerticalStackBarChart
              legend={{
                left: 20,
                bottom: 10,
                textStyle: {
                  fontSize: 10,
                  color: "#FFFFFF",
                },
                itemWidth: 9,
                itemHeight: 9,
              }}
              grid={{
                top: 30,
                left: 30,
                right: 30,
                bottom:50,
                containLabel: true
              }}
              min={0}
              max={100}
              yAxisName={'Percent %'}
              xAxisName={'Year'}
              AxisnameStyle={{
                color: "#fff",
                fontSize: 10
              }}
              yAxisLabel={{
                show: true,
                fontSize: 10,
                color: '#fff',
                formatter: '{value}%'
              }}
              yAxisSplitLine={{
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "#504843"
                }
              }}
              xAxisLabel={{
                color: "#fff",
                fontSize: 10
              }}
              xAxisTick={{show: false}}
              yAxisLine={{
                show: true,
                lineStyle: {
                  color: "#47403C",
                }
              }}
              xAxisdata={['2023', '2023', '2023', '2024', '2024', '2024']}
              barWidth={25}
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
                color: '#7A3033',
                borderRadius: 0
              }}
              data={[30, 40, 60,30, 20, 40]}
              data1={[40, 50, 20,30, 20, 20]}
              data2={[30, 10, 20,40, 60, 40]}
            />
          </div> */}