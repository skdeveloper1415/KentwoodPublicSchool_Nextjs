import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { FormatNum, getRankSuffix } from "../utils";

export default function BubbleChart({data,
  tooltip={
    Category: '',
    metric1: '',
    metric2: '',
},
}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // const data = [
  //   [[25, 116, 1800, "112", "Townline Elem"]],
  //   [[38, 160, 3800, "177", "Pinewood MS"]],
  //   [[40, 86, 1000, "92", "Southwood Elem"]],
  //   [[60, 100, 1700, "103", "Discovery Elem"]],
  //   [[75, 130, 2100, "147", "Brookwood Elem"]],
  // ];
  const lineChartData = [
    [0, 100],
    [50, 100],
    [100, 100],
  ];
  const verticalLineData = [
    [50, 0],
    [50, 200],
  ];
  const CAGRchart = {
    grid: {
      height: "70%",
      left: "55",
      top: "15%",
      right:"2%"
    },
    tooltip:{
      show: true,
      formatter: (params) => {
          return `<div style="width:20rem">
            <div style="font-weight:bold;font-size:16px;margin-bottom:5px">
            ${params.value[0] < 50 ? 'Low Performance' : 'High Performance'}
            ${params.value[1] > 100 ? ', High Growth' : ', Low Growth'}
            </div>
            <div style="display:flex;width:'100%';justify-content:space-between">
              <p>${tooltip.Category}:</p>
              <p style="font-weight:bold;text-wrap: pretty;">${params.name}</p>
            </div>
            <div style="display:flex;width:'100%';justify-content:space-between">
              <p style="text-wrap: pretty;">Median % Typical Growth Achieved:</p>
              <p style="font-weight:bold;margin-top:auto;">${FormatNum(params.value[1],1)}%</p>
            </div>
            <div style="display:flex;width:'100%';justify-content:space-between;">
              <p style="text-wrap: pretty;">Performance Relative to National Norm (Percentile):</p>
              <p style="font-weight:bold;margin-top:auto;">${getRankSuffix(params.value[0])}</p>
            </div>
          </div>`
        },
  },
    xAxis: {
      type: "value",
      scale: true,
      min: 0,
      // max: 100,
      max: 100,
      // intervel: 10,
      splitNumber:10,
      name: "Performance Relative to National Norm (Percentile)",
      nameLocation: "middle",
      nameGap: "30",
      axisLabel: {
        color: "#f0eded",
        fontSize: 10,
      },
      nameTextStyle: {
        color: "#f0eded", // Set axis name color to white
        fontSize: 12, // Optional: adjust font size
      },
      axisTick: {
        show: false,  // Set to true to show ticks
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: currentTheme === "dark" ? "#B3B9C6" : "#363A44",
        },
      },
      splitLine: {
        show: false,
      },
      position: "left",
    },
    yAxis: {
      type: "value",
      scale: true,
      min: 0,
      max: 200,
      // intervel: 50,
      splitNumber:5,
      name: "Median % Typical Growth Achieved",
      nameLocation: "middle",
      nameGap: "40",
      axisLabel: {
        color: "#f0eded",
        fontSize: 10,
      },
      nameTextStyle: {
        color: "#f0eded", // Set axis name color to white
        fontSize: 12, // Optional: adjust font size
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: currentTheme === "dark" ? "#B3B9C6" : "#363A44",
        },
      },

      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#37424f",
          type: "dashed",
        },
      },
      position: "center",
    },
    series: [
      // {
      //   name: "Townline Elem",
      //   data: data[0],
      //   type: "scatter",
      //   symbolSize: function (data) {
      //     // return Math.sqrt(data[2]) / 5e2;
      //     return Math.sqrt(data[2]);
      //   },
      //   label: {
      //     show: true,
      //     color: "#FFFFFF",
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     // position: 'top'
      //   },
      //   normal: {
      //     focus: "series",
      //     show: true,
      //   },

      //   itemStyle: {
      //     color: "#F076B2",

      //     borderColor: "none",
      //   },
      // },
      // {
      //   name: "Pinewood MS",
      //   data: data[1],
      //   show: true,
      //   type: "scatter",
      //   symbolSize: function (data) {
      //     return Math.sqrt(data[2]);
      //   },
      //   label: {
      //     show: true,
      //     color: "#FFFFFF",
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     // position: 'top'
      //   },
      //   normal: {
      //     focus: "series",
      //     show: true,
      //   },

      //   itemStyle: {
      //     color: "#0090FF",
      //     borderColor: "none",
      //   },
      // },
      // {
      //   name: "Southwood Elem",
      //   data: data[2],
      //   show: true,
      //   type: "scatter",
      //   symbolSize: function (data) {
      //     return Math.sqrt(data[2]);
      //   },
      //   label: {
      //     show: true,
      //     color: "#FFFFFF",
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     // position: 'top'
      //   },
      //   normal: {
      //     focus: "series",
      //     show: true,
      //   },

      //   itemStyle: {
      //     color: "#D67309",

      //     borderColor: "none",
      //   },
      // },
      // {
      //   name: "Brookwood Elem",
      //   data: data[4],
      //   type: "scatter",
      //   symbolSize: function (data) {
      //     // return Math.sqrt(data[2]) / 5e2;
      //     return Math.sqrt(data[2]);
      //   },
      //   label: {
      //     show: true,
      //     color: "#FFFFFF",
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     // position: 'top'
      //   },
      //   normal: {
      //     focus: "series",
      //     show: true,
      //   },

      //   itemStyle: {
      //     color: "#B07AA1",

      //     borderColor: "none",
      //   },
      // },
      // {
      //   name: "Discovery Elem",
      //   data: data[3],
      //   type: "scatter",
      //   symbolSize: function (data) {
      //     // return Math.sqrt(data[2]) / 5e2;
      //     return Math.sqrt(data[2]);
      //   },
      //   label: {
      //     show: true,
      //     color: "#FFFFFF",
      //     formatter: function (param) {
      //       return param.data[3];
      //     },
      //     // position: 'top'
      //   },
      //   normal: {
      //     focus: "series",
      //     show: true,
      //   },

      //   itemStyle: {
      //     color: "#069564",
      //     borderColor: "none",
      //   },

      // },
      {
        type: 'scatter',
        data: data,
        symbolSize: 10,
        label: {
          show: true,
          formatter: function (params) {
            return params.data.name;
          },
          position: 'top',
          color: '#fff',
          // hideOverlap: true,
          emphasis: {
            show: false // Ensure labels do not show on hover
          }
        },
        labelLayout: {
          hideOverlap: true // Automatically hide overlapping labels
        },
        markLine: {
          symbol: 'none', // Remove symbols
          lineStyle: {
            type: 'solid',
            color: 'grey',
            width: 2, // Adjust the width to make it more visible
            opacity:.5
          },
          label:{
            show: false
          },
          data: [
            { // Horizontal line
              yAxis: 100
            },
            { // Vertical line
              xAxis: 50
            }
          ],
          silent: true // This will hide the tooltip for the markLine   
        }

      },
      // {
      //   name: "Vertical Line",
      //   type: "line",
      //   data: verticalLineData,
      //   lineStyle: {
      //     color: "#FACA15", // Line color
      //     width: 1, // Line width
      //     type:"line"
      //   },
      //   symbol: 'none', // No symbols on the line
      //   label: {
      //     show: false,
      //   },
      //   z: 0,
      // },
      // {
      //   name: "Line Chart",
      //   type: "line",
      //   data: lineChartData,
      //   lineStyle: {
      //     color: "#FACA15", // Line color
      //     width: 1, // Line width
      //   },
      //   symbol: 'none', // No symbols on the line
      //   label: {
      //     show: false,
      //   },
      //   z: 0,
      // },


    ],

    legend: {
      show: true,
      // data: [
      //   "Townline Elem",
      //   "Pinewood MS",
      //   "Southwood Elem",
      //   "Discovery Elem",
      //   "Brookwood Elem",
      // ],
      data: data.map(item => item.name),
      textStyle: {
        color: "#f0eded", // Color for the legend text
        fontSize: 12,

        // Optional: adjust font size
      },
      icon: "rect",
      itemWidth: 10, // Adjust width of the legend icon
      itemHeight: 10,
      bottom: 0,
      left: 10,
    },
  };

  return (
    <ReactEcharts
    notMerge={true}
      option={CAGRchart}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
