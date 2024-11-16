import React from "react";
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { FormatNum, getRankSuffix } from "../utils";

export default function BubbleChartSecond({data,
  tooltip={
    Category: '',
    metric1: '',
    metric2: '',
},
}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // const data = [
  //   [[12, 70, 1500, "65", 'Grade 1']],
  //   [[20, 120, 2700, "134", 'Grade 2']],
  //   [[30, 100, 2200, "84", 'Grade 3']],
  //   [[35, 160, 3400, "165", 'Grade 4']],
  //   [[70, 170, 2700, "156", 'Grade 5']],
  //   [[37, 50, 1500, "55", 'Grade 6']],
  //   [[45, 50, 1200, "48", 'Grade 7']],
  //   [[58, 100, 2200, "112", 'Grade 8']],
  //   [[90, 110, 2900, "107", 'Grade 9']],
  //   [[80, 100, 1600, "89", 'Grade 10']],


  // ];
  // const CAGRchart = {
  //   grid: {
  //     height: "60%",
  //     left: "55",
  //     top: "15%",
  //     right:"2%"


  //   },
  //   xAxis: {
  //     type: "value",
  //     scale: true,
  //     // min: 0,
  //     // max: 100,
  //     // intervel: 10,
  //     name: "Median % Typical Growth Achieved",
  //     nameLocation: "middle",
  //     nameGap: "30",
  //     axisLabel: {
  //       color: '#f0eded',
  //       fontSize: 10,
  //     },
  //     nameTextStyle: {
  //       color: '#f0eded', // Set axis name color to white
  //       fontSize: 12,  // Optional: adjust font size
  //     },
  //     axisTick: {
  //       show: false,
  //     },
  //     axisLine: {
  //       show: true,
  //       lineStyle: {
  //         color: currentTheme === "dark" ? "#B3B9C6" : "#363A44",
  //       },
  //     },
  //     splitLine: {
  //       show: false,
  //     },
  //     position: 'left',
  //   },
  //   yAxis: {
  //     type: "value",
  //     scale: true,
  //     // min: 0,
  //     // max: 200,
  //     // intervel: 50,
  //     name: "Performance Relative to National Norm (Percentile)",
  //     nameLocation: "middle",
  //     nameGap: "40",
  //     axisLabel: {
  //       color: '#f0eded',
  //       fontSize: 10,

  //     },
  //     nameTextStyle: {
  //       color: '#f0eded', // Set axis name color to white
  //       fontSize: 12,  // Optional: adjust font size
  //     },
  //     axisLine: {
  //       show: true,
  //       lineStyle: {
  //         color: currentTheme === "dark" ? "#B3B9C6" : "#363A44",
  //       },
  //     },

  //     axisTick: {
  //       show: false,
  //     },
  //     splitLine: {
  //       show: true,
  //       lineStyle: {
  //           color: '#37424f',
  //           type: 'dashed',
  //       },
  //     },
  //     position: 'center',
  //   },
  //   // series: [
  //     // {
  //     //   name: "Grade 1",
  //     //   data: data[0],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {

  //     //       color: "#F076B2",

  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 2",
  //     //   data: data[1],
  //     //   show: true,
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#D67309",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 3",
  //     //   data: data[2],
  //     //   show: true,
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#069564",

  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 4",
  //     //   data: data[3],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#B07AA1",

  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 5",
  //     //   data: data[4],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#0090FF",
  //     //     borderColor: "none",
  //     //   },
  //     // },

  //     // {
  //     //   name: "Grade 6",
  //     //   data: data[5],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#6FE6B3",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 7",
  //     //   data: data[6],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#FCE38B",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 8",
  //     //   data: data[7],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#F2980E",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 9",
  //     //   data: data[8],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#F7AAD1",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //     // {
  //     //   name: "Grade 10",
  //     //   data: data[9],
  //     //   type: "scatter",
  //     //   symbolSize: function (data) {
  //     //     // return Math.sqrt(data[2]) / 5e2;
  //     //     return Math.sqrt(data[2]);
  //     //   },
  //     //   label: {
  //     //     show: true,
  //     //     color: '#FFFFFF',
  //     //     formatter: function (param) {
  //     //       return param.data[3];
  //     //     },
  //     //     // position: 'top'
  //     //   },
  //     //   normal: {
  //     //     focus: "series",
  //     //     show: true,
  //     //   },

  //     //   itemStyle: {
  //     //       color: "#D0D1D1",
  //     //     borderColor: "none",
  //     //   },
  //     // },
  //   // ],
  //   series: data ? data.map((item,i)=>({
  //       name: `${item[4]}`,
  //       data: item,
  //       type: "scatter",
  //       // symbolSize: function (data) {
  //       //   // return Math.sqrt(data[2]) / 5e2;
  //       //   return Math.sqrt(data[2]);
  //       // },
  //       symbolSize:10,
  //       label: {
  //         show: true,
  //         color: '#FFFFFF',
  //         formatter: function (param) {
  //           return param.data[4];
  //         },
  //         // position: 'top'
  //       },
  //       normal: {
  //         focus: "series",
  //         show: true,
  //       },
  //       labelLayout: {
  //         hideOverlap: true // Automatically hide overlapping labels
  //       },

  //       itemStyle: {
  //           color: "#D0D1D1",
  //         borderColor: "none",
  //       },
  //   })): [],
  //   legend: {
  //       show: true,
  //       // data: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5","Grade 6", "Grade 7","Grade 8","Grade 9", "Grade 10",],
  //       data: data.map(item => `${item[4]}`),
  //       textStyle: {
  //         color: '#f0eded', // Color for the legend text
  //         fontSize: 12,

  //        // Optional: adjust font size
  //       },
  //       icon: 'rect',
  //       itemWidth: 10, // Adjust width of the legend icon
  //       itemHeight: 10,
  //       bottom: 0,
  //       left:10
  //     },
  // };
  const CAGRchart = {
    grid: {
      // height: "75%",
      left: "55",
      top: "15%",
      right:"2%",
      // bottom:"15%",
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
      

    ],

    legend: {
      show: true,
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
      option={CAGRchart}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
