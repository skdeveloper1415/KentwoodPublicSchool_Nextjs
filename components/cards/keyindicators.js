import React, { useEffect, useState } from "react";
import * as echarts from 'echarts';
import Verticlebarchart from '../charts/verticelbarchart';
import Linechartwithgradient from '../charts/linechartwithgradient';
import { checkIfNegative } from '../utils';
import { Tooltip } from "primereact/tooltip";

export default function KeyInitiatives({ title, subtitle, metric1, metric2, metrictitle1=null, metrictitle2=null, statetext, kpstext, value1, value2, onClick, loading, pyvar = "-", pyvar2 = "-", lineChartData = {
        label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        value: [5, 6, 5, 6, 7, 7, 8,],
    },
    max,
    interval=25,
    formatter='{value} %',
    BarLabel = ["2020","2021","2022","2023","2024"],
    orientation,
    Barlabel,
    verticleChartData =[{value: 25 , itemStyle: {color:'#335D76'}},{value: 25 , itemStyle: {color:'#335D76'}},{value: 45 , itemStyle: {color:'#335D76'}},{value: 20 , itemStyle: {color:'#7A3033'}},{value: 49 , itemStyle: {color:'#498E71'}},],
    ShowTop = true, seriesname, tooltipformater, stack, splitNumber,
    categoryaxisname,
    ...props 
 }) {

        // const verticleChartData =[{value: 25 , itemStyle: {color:'#335D76'}},{value: 25 , itemStyle: {color:'#335D76'}},{value: 45 , itemStyle: {color:'#335D76'}},{value: 20 , itemStyle: {color:'#7A3033'}},{value: 49 , itemStyle: {color:'#498E71'}},]

    return (
        <>

            <button onClick={onClick} className='tile_bg_color keyindicators-main' >
                <div className='bg-[#262626] px-[12px] 3xl:px-[0.625vw] py-[16px] 3xl:py-[0.833vw] white_text_color text-left space-y-[4px] rounded-t keyindicators-heading'>
                    <div className="text-[10px] 3xl:text-[0.625vw] opacity-60">{subtitle}</div>
                    <div className="text-[12px] 3xl:text-[0.729vw] font-medium leading-tight">{title}</div>
                </div>
                <div className='bg-[rgba(0,0,0,0.35)] white_text_color p-[14px] 3xl:text-[0.833vw] text-[14px] 3xl:text-[0.729vw] font-normal rounded-b '>
                    {ShowTop && <div className={`grid grid-cols-12 gap-2 leading-[120%] bg_darkbrown_color p-[12px] 3xl:p-[0.625vw] ${categoryaxisname ? "" : "mb-[20px] 3xl:mb-[1.25vw]"} rounded keyindicators-innerhead`}>
                        {value1 && <div className='col-span-6'>
                            <div className=''>
                                    <div className='text-left white_description_color text-[12px] 3xl:text-[0.729vw] font-medium leading-[120%] mb-[8px]' title={metrictitle1}>
                                        {metric1 ||"State Average"}
                                    </div>
                                    {statetext && <div className='text-left white_description_color opacity-60 text-[10px] 3xl:text-[0.625vw] font-normal leading-[120%]'>
                                        {statetext}
                                    </div>}
                                    <div className='white_text_color text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-bold text-left pt-1 mt-[16px] 3xl:mt-[0.833vw]'>
                                        {value1}
                                    </div>

                                    <div className='grid grid-cols-12'>
                                        <div className='col-span-8 white_text_color text-[9px] 3xl:text-[0.55rem] font-medium flex items-center gap-1'>
                                            {/* LY VAR: <span className={`${checkIfNegative(pyvar) ? 'red_color_text' : 'sucess_green_color_text'}`}>{Math.abs(pyvar).toFixed(2)}%</span> */}
                                            {/* LY Var: <span className='text-[#31C48D]'>{pyvar}%</span> */}
                                        </div>
                                        {/* <div className="col-span-4 h-[25px] 3xl:h-[1.563vw]">
                                            <Linechartwithgradient
                                                grid={{
                                                    top: 0,
                                                    left: 5,
                                                    right: 10,
                                                    bottom: 0,
                                                    containLabel: true
                                                }}
                                                lineStyle={{ color: `${checkIfNegative(pyvar) ? '#F98080' : '#31C48D'}`, width: 1.5 }}
                                                areaStyle={{
                                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                        {
                                                            offset: 0.9,
                                                            color: `${checkIfNegative(pyvar) ? '#F9808000' : '#31C48D00'}`
                                                        },
                                                        {
                                                            offset: 0.5,
                                                            color: `${checkIfNegative(pyvar) ? '#F9808042' : '#31C48D42'}`
                                                        }
                                                    ])
                                                }}
                                                data={lineChartData}
                                            />
                                        </div> */}
                                    </div>

                            </div>
                        </div>}
                        <div className='col-span-6'>
                            {value2 && <div className=''>


                                    <div className='text-left white_description_color text-[12px] 3xl:text-[0.729vw] font-medium leading-[120%] mb-[8px]' title={metrictitle2}>
                                        {metric2 || "KPS Average"}
                                    </div>
                                    <div className='text-left white_description_color opacity-60 text-[10px] 3xl:text-[0.625vw] font-normal leading-[120%]'>
                                        {kpstext}
                                    </div>
                                    <div className='white_text_color text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-bold text-left pt-1 mt-[16px] 3xl:mt-[0.833vw]'>
                                        {value2}
                                    </div>

                                    <div className='grid grid-cols-12'>
                                        <div className='col-span-8 white_text_color text-[10px] 3xl:text-[0.55rem] font-medium flex items-center gap-1'>
                                            {/* LY VAR: <span className={`${checkIfNegative(pyvar) ? 'red_color_text' : 'sucess_green_color_text'}`}>{Math.abs(pyvar).toFixed(2)}%</span> */}
                                            {/* LY Var: <span className='text-[#31C48D]'>{pyvar2}%</span> */}
                                        </div>
                                        {/* <div className="col-span-4 h-[25px] 3xl:h-[1.563vw]">
                                            <Linechartwithgradient
                                                grid={{
                                                    top: 0,
                                                    left: 5,
                                                    right: 10,
                                                    bottom: 0,
                                                    containLabel: true
                                                }}
                                                lineStyle={{ color: `${checkIfNegative(pyvar) ? '#F98080' : '#31C48D'}`, width: 1.5 }}
                                                areaStyle={{
                                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                        {
                                                            offset: 0.9,
                                                            color: `${checkIfNegative(pyvar) ? '#F9808000' : '#31C48D00'}`
                                                        },
                                                        {
                                                            offset: 0.5,
                                                            color: `${checkIfNegative(pyvar) ? '#F9808042' : '#31C48D42'}`
                                                        }
                                                    ])
                                                }}
                                                data={lineChartData}
                                            />
                                        </div> */}
                                    </div>
                            </div>}
                        </div>
                    </div>}
                    {categoryaxisname && <div className="h-[20px] 3xl:h-[1.25vw] text-left text-[12px] 3xl:text-[0.729vw] font-medium leading-[120%] pl-2 flex items-center">{categoryaxisname}</div>}
                    <div className={ShowTop ? "" : "h-[15rem]"}>
                        <Verticlebarchart
                            grid={{
                                right: '5%',
                                left: '2%',
                                // left: categoryaxisname ? '6+%' : '2%',
                                top: '5%',
                                // top: categoryaxisname ? '18%' :'5%',
                                bottom: 5,
                                containLabel: true
                            }}
                            // max={max || 'auto'}
                            // interval={interval || 'auto'}
                            xAxisdata={BarLabel}
                            // colors={["#7A3033","#498E71","#335D76"]}
                            // old colors
                            // colors={["#335D76", "#7A3033","#498E71"]}
                            colors={["#bab0ac", "#bab0ac","#bab0ac"]}
                            data1={verticleChartData}
                            formatter={formatter}
                            orientation={orientation}
                            Barlabel={Barlabel}
                            seriesname={seriesname}
                            tooltipformater={tooltipformater}
                            stack={stack}
                            splitNumber ={splitNumber}
                            max={max}
                            // categoryName={categoryaxisname}
                            customOpt={props?.customOpt}
                        />
                    </div>
                </div>

            </button>

        </>
    )
}