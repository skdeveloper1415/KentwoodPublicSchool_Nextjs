import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { FormatNum } from '../utils';

export default function MultiplebarChart({ data, xAxisName,name1,name2,name3, xAxisNamePosition, xAxisNameGap, yAxisName, yAxisNamePosition, yAxisNameGap, yAxisName1, yAxisNamePosition1, yAxisNameGap1, legend, grid, color1, color2, color3,min, max,series3=false,tooltipformater,axislabelpercent1=false,axislabelpercent2=false,labelpercent1=false,labelpercent2=false,labelpercent3=false,
  StackCombo=false,
  series4=false, color4, name4, ChartSplitLine,
  CustomConfig,
  ...props
 }) {

  const myarray = [
    {
      type: 'bar',
      name:name1,
      stack: StackCombo ? "Total" : null,
      itemStyle: {
        borderRadius: [2, 2, 0, 0],
      },
      label: {
        show: true,
        position: StackCombo ? 'insideTop' : 'top',
        color: props.labelcolor1 ? props.labelcolor1 : "#E5E7EB",
        formatter :(value)=>{
          return `${labelpercent1 ? FormatNum(value?.value,1) +"%" : FormatNum(value?.value,1)}`
        }
      },
      color: color1,
      yAxisIndex: 0,
      data: data?.values,
      tooltip:{
        valueFormatter: tooltipformater ? tooltipformater : null
      }
    },
    {
      type: 'bar',
      name:name2,
      stack: StackCombo ? "Total" : null,
      itemStyle: {
        borderRadius: [2, 2, 0, 0],
      },
      markLine: ChartSplitLine,
      label: {
        show: true,
        position: StackCombo ? 'insideTop' : 'top',
        color:"#E5E7EB",
        formatter :(value)=>{
          return `${labelpercent2 ? FormatNum(value?.value,1) +"%" : FormatNum(value?.value,1)}`
        }
      },
      color: color2,
      yAxisIndex:series3 ? 0 : 1,
      data: data?.values2,
      tooltip:{
        valueFormatter: tooltipformater ? tooltipformater : null
      }
    },
    {
      type: series3 ? 'bar' : 'none',
      name:name3,
      stack: StackCombo ? "OtherTotal" : null,
      itemStyle: {
        borderRadius: [2, 2, 0, 0],
      },
      label: {
        show: true,
        position: StackCombo ? 'insideTop' : 'top',
        color: props.labelcolor3 ? props.labelcolor3 : "#E5E7EB",
        formatter :(value)=>{
          return `${labelpercent3 ? FormatNum(value?.value,1) +"%" : FormatNum(value?.value,1)}`
        }
      },
      color: color3,
      // yAxisIndex: 1,
      yAxisIndex:series3 ? 0 : null,
      data: data?.values3,
      tooltip:{
        valueFormatter: tooltipformater ? tooltipformater : null
      }
    },
  ]
  
  if(series4){
    myarray.push(
      {
        type: series4 ? 'bar' : 'none',
        name:name4,
        stack: StackCombo ? "OtherTotal" : null,
        itemStyle: {
          borderRadius: [2, 2, 0, 0],
        },
        label: {
          show: true,
          position: StackCombo ? 'insideTop' : 'top',
          color: props.labelcolor4 ? props.labelcolor4 : "#E5E7EB",
          formatter :(value)=>{
            return `${labelpercent3 ? FormatNum(value?.value,1) +"%" : FormatNum(value?.value,1)}`
          }
        },
        color: color4 ? color4 : '#59b5a7',
        // yAxisIndex: 1,
        data: data?.values4,
        tooltip:{
          valueFormatter: tooltipformater ? tooltipformater : null
        },
        yAxisIndex:series3 ? 0 : null,
      }
    )
  }

  const multiplebarChart = {
    legend: legend,
    grid: grid,
    tooltip: {},
    // dataset: {
    //   dimensions: data.labels,
    //   source: data.values
    // },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      labels: {
        // show: true,
        // position: 'outside',
        formatter: '{c}'
      },
      axisTick: { show: false },
      nameTextStyle: {
        color:  "#E5E7EB"
      },
      axisLabel: {
        interval: 0,
        color: '#E5E7EB',
        fontSize: 8,
        fontWeight: 400

      },

      name: xAxisName,
      nameLocation: xAxisNamePosition,
      nameGap: xAxisNameGap,
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 10,
        align: "center",
        interval :0
      },
      data: data.labels
    },

    yAxis: [
    {
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: "#374151",
      }
      },
      // min:min,
      // max:max,
      name: yAxisName,
      nameLocation: yAxisNamePosition,
      nameGap: yAxisNameGap,
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 10,
        formatter: (value)=>{
          return axislabelpercent1 ?  value + "%" : value;
        }
      },
      nameTextStyle: {
        color:  '#E5E7EB',
      },
      // axisLabel: {
      //   color: '#E5E7EB',
      //   fontSize: 10
      // },
      axisLine: {
        show:true,
        lineStyle: {
          color: '#374151'
        }
      },
    },
    {
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: "#374151",
      }
      },
      // min:min,
      // max:max,
      name: yAxisName1,
      nameLocation: yAxisNamePosition1,
      nameGap: yAxisNameGap1,
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 10,
      },
      nameTextStyle: {
        color:  '#E5E7EB',
      },
      axisLabel: {
        color: '#E5E7EB',
        fontSize: 10,
        formatter: (value)=>{
          return axislabelpercent2 ?  value + "%" : value;
        }
      },
      axisLine: {
        show:true,
        lineStyle: {
          color: '#374151'
        }
      },
    }
  ],
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: myarray
  };

  return (
    <>
      <ReactEcharts
        option={CustomConfig ? CustomConfig : multiplebarChart}
        opts={{ renderer: 'svg' }}
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
}






{/* <MultiplebarChart
              data={BarCharData}
              xAxisName={"Percentile Rank by Role - Year"}
              xAxisNameGap={"30"}
              xAxisNamePosition={"middle"}
              yAxisName={"Percentile Rank"}
              yAxisNameGap={"30"}
              yAxisNamePosition={"middle"}
              min={0}
              max={90}
              legend={{
                bottom: 0,
                left: 0,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                  color: '#E5E7EB',
                },
              }}
              grid={{
                top: 20,
                left: 60,
                right:20
              }}
              color1={'#EDC948'}
              color2={'#B07AA1'}
              color3={'#B7E1CD'}
            /> */}           