import React from 'react';
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";

export default function Gaugechart({graphic,backstartAngle,backendAngle,backaxisLine,data,frontstartAngle,frontendAngle,frontaxisLine,pointer}) {


  const textGraphic = {
    type: 'text',
    left: '35%',
    top: '22%',
    style: {
        text: `${data[0].value?.toFixed(0)} %`,
        font: ' 10px Arial',
        fill: '#000',
        textAlign: 'middle',
        textBaseline: 'middle',
        backgroundColor: '#fff',
        padding: [4, 7],
        borderRadius: 25
    },
    z: 10,
};
    const option = {
      graphic: [textGraphic, ...(graphic || [])],
        series: [
          // {
          //   type: 'gauge',
          //   center:['50%','75%'],
          //   radius: '100%',
          //   startAngle: backstartAngle,
          //   endAngle: backendAngle,
          //   axisLine:backaxisLine,
          //   pointer: {
          //     show: false,
          //     itemStyle: {
          //       color: '#6C768B'
          //     }
          //   },
          //   anchor: {
          //     show: true,
          //     showAbove: true,
          //     size: 4,
          //     itemStyle: {
          //       borderWidth: 8,
          //       borderColor: '#fff',
          //       color: '#D73F09' // Set the color of the anchor's item style
          //     }
          //   },
          //   axisTick: {
          //     show: false,
          //     distance: -30,
          //     length: 8,
          //     lineStyle: {
          //       color: '#fff',
          //       width: 2
          //     }
          //   },
          //   splitLine: {
          //     show: false,
          //     distance: -30,
          //     length: 30,
          //     lineStyle: {
          //       color: '#fff',
          //       width: 4
          //     }
          //   },
          //   axisLabel: {
          //     show: false,
          //     color: 'inherit',
          //     distance: 40,
          //     fontSize: 20
          //   },
          //   detail: {
          //     show: false,
          //     valueAnimation: true,
          //     formatter: '{value} km/h',
          //     color: 'inherit'
          //   },

          // },
          // {
          //   type: 'gauge',
          //   center:['50%','75%'],
          //   radius: '100%',
          //   startAngle: frontstartAngle,
          //   endAngle: frontendAngle,
          //   axisLine:frontaxisLine,
          //   pointer:pointer,

          //   axisTick: {
          //     show: false,
          //     distance: -30,
          //     length: 8,
          //     lineStyle: {
          //       color: '#fff',
          //       width: 2
          //     }
          //   },
          //   splitLine: {
          //     show: false,
          //     distance: -30,
          //     length: 30,
          //     lineStyle: {
          //       color: '#fff',
          //       width: 4
          //     }
          //   },
          //   axisLabel: {
          //     show: false,
          //     color: 'inherit',
          //     distance: -40,
          //     fontSize: 20,
          //   },
          //   detail: {
          //     show: false,
          //     valueAnimation: true,
          //     formatter: '{value} km/h',
          //     color: 'inherit'
          //   },
          //   data: data
          // }
          {
              type: 'gauge',
              center:['50%','75%'],
              radius: '100%',
              startAngle: frontstartAngle,
              endAngle: frontendAngle,
              axisLine:frontaxisLine || {
                lineStyle: {
                  width: 20,
                  // color: [
                  //   [0.6, "#D68228"],
                  //   [1, "rgba(214, 130, 40, 1)"],
                  // ],
                  color: [
                    //   [0.6, "#D68228"],
                      [1, "#999"],
                    ],
                },
              },
              pointer:pointer,
              progress: {
                show: true,
                width: 20,
                // itemStyle: data[0].value < 50 ? {color: '#D68228'} : {color:'#498E71'}
                itemStyle: data[0].value < 50 ? {color: '#EDC948'} : {color:'#59A14F'}
              },

              /* gradient Color */

              // progress: {
              //   show: true,
              //   width: 20,
              //   itemStyle: {
              //     color: {
              //       type: 'linear',
              //       x: 0,
              //       y: 0,
              //       x2: 1,
              //       y2: 0,
              //       colorStops: data[0].value <= 50
              //         ? [
              //             {
              //               offset: 0,
              //               color: '#FC8403', // Start color (orange)
              //             },
              //             {
              //               offset: 1,
              //               color: '#EDAE6A', // End color (orange) for values below 50
              //             },
              //           ]
              //         : [
              //             {
              //               offset: 0,
              //               color: '#D68228', // Start color (orange)
              //             },
              //             {
              //               offset: 1,
              //               color: '#4CAF50', // End color (green) for values above 50
              //             },
              //           ],
              //       global: false,
              //     },
              //   },
              // },
              /* */
  
              axisTick: {
                show: false,
                distance: -30,
                length: 8,
                lineStyle: {
                  color: '#fff',
                  width: 2
                }
              },
              splitLine: {
                show: false,
                distance: -30,
                length: 30,
                lineStyle: {
                  color: '#fff',
                  width: 4
                }
              },
              axisLabel: {
                show: false,
                color: 'inherit',
                distance: -40,
                fontSize: 20,
              },
              detail: {
                show: false,
                valueAnimation: true,
                formatter: '{value} km/h',
                color: 'inherit'
              },
              data: data
            }
        ]
      };


    return (
      <div className=''>
        <ReactEcharts
            option={option}
            style={{ width: "100%", height: "100%" }}
        />
        </div>
    )
}
