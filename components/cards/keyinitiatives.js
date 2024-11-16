import React, { useEffect, useState } from "react";
import * as echarts from 'echarts';
import Linechartwithgradient from '../charts/linechartwithgradient';
import { truncateText } from '../truncateText';
// import StudentDemographicsPopup from '../popup/StudentDemographics';
import { checkIfNegative } from '../utils';
import LoaderContainer from '../LoaderContainer';
import HorizontalBarChart from '../charts/horizontalbarchart';
import Gaugechart from "../charts/gaugechart";

export default function KeyInitiatives({
    metricType = null,
    loading, subtext = "subtext",
    description = "# of applications",
    value = 0,
    pyvar = "-",
    lineChartData = {
        label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        value: [5, 6, 5, 6, 7, 7, 8,]
    },
    onClick,
    data1=[23, 18, 41],
    data2=[23, 18, 21],
    data3=[23, 18, 22],
    dataset=["1.1.3", "1.1.2", "1.1.1"],
    barWidth=16,
    chartDesc="",
    }) {


    return (
        <>
            <div onClick={onClick} className='tile_bg_color cursor-pointer' >
                <div className='bg-[rgba(255,255,255,0.10)] px-[14px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw] white_text_color text-[12px] 3xl:text-[0.680vw] text-left font-light leading-[130%]  rounded-t top_tileheading'>
                    {subtext}
                </div>
                <div className='bg-[rgba(0,0,0,0.35)] white_text_color p-[14px] 3xl:text-[0.833vw] text-[14px] font-normal rounded-b'>
                    <div className='grid grid-cols-12 gap-2 leading-[120%] bg_darkbrown_color p-[12px] 3xl:p-[0.625vw] mb-[10px] 3xl:mb-[1vw] rounded'>
                        <div className='col-span-6'>
                            <div className='space-y-[2px]'>
                                <LoaderContainer loading={loading} height={"100px"} width={"100%"} className="bg-[#111828]">

                                    <div className='text-left white_text_color whitespace-nowrap opacity-60 text-[12px] 3xl:text-[0.729vw] font-medium leading-[120%] mb-[14px] 3xl:mb-[0.833vw] '>
                                        {truncateText(description, 6)}
                                    </div>
                                    <div className='white_text_color text-[16px] xl:text-[18px] 3xl:text-[0.938vw] font-bold text-left pt-1'>
                                        {metricType != null ? value == 0 ? `${value?.toFixed(0)}%` :`${value?.toFixed(1)}%` : value} <span className='white_description_color text-[12px] 3xl:text-[0.729vw] font-medium'>Done</span>
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
                                </LoaderContainer>
                            </div>
                        </div>
                        <div className='col-span-6'>
                            <div className='h-[90px]'>
                                <Gaugechart
                                    backstartAngle={180}
                                    backendAngle={0}
                                    backaxisLine={{
                                        roundCap: true,
                                        lineStyle: {
                                            width: 20,
                                            color: [[3, "rgba(14,14,14,0.51)"]],
                                        },
                                    }}
                                    pointer={{
                                        width: 3,
                                        itemStyle: { color: "#fff", },
                                    }}
                                    frontstartAngle={180}
                                    // frontendAngle={20}
                                    frontendAngle={0}
                                    // frontaxisLine={{
                                    //     lineStyle: {
                                    //         width: 20,
                                    //         color: [
                                    //             [0.6, "#D68228"],
                                    //             [0.8, "rgba(214, 130, 40, 1)"],
                                    //         ],
                                    //     },
                                    // }}
                                    data={[{ value: value}]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-[140px]">
                        <HorizontalBarChart
                            legend={{
                                show: true,
                                bottom: 0,
                                left: "11%",
                                itemWidth: 8,
                                itemHeight: 8,
                                textStyle: { color: "#fff" }
                            }}
                            grid={{
                                top: "-1%",
                                // left: "4%",
                                left: "2%",
                                right: "5%",
                                bottom: "25%",
                                containLabel: true
                            }}
                            seriesData={["Male"]}
                            yAxisLabel={{ color: "rgba(229, 231, 235, 1)", fontSize: 12 }}
                            yAxisaxisLine={{ show: true, lineStyle: { color: "rgba(55, 65, 81, 1)" } }}
                            xAxisaxissplitLine={{ show: true, lineStyle: { type: "dashed", color: "rgba(55, 65, 81, 1)" } }}
                            yAxisTick={{ show: false }}
                            color1={"#59A14F"}
                            color2={"#EDC948"}
                            color3={"#BAB0AC"}
                            // barWidth={barWidth}
                            // min={0}
                            // max={60}
                            // interval={10}
                            name1={"Done"}
                            name2={"In Progress"}
                            name3={"Not Started"}
                            yAxisanme={["dd"]}
                            dataset={dataset}
                            data1={data1}
                            data2={data2}
                            data3={data3}
                            chartDesc={chartDesc}
                        />
                    </div>
                </div>
            </div>


            {/* <StudentDemographicsPopup
                Tabvisible={tabvisiblepopup}
                TabName={TabNamePopup}
                Title={titlePopup}
                StatusColor={color}
                visible={studentDemographicsPopupShow}
                onHide={() => setStudentDemographicsPopupShow(false)}
            /> */}
        </>
    )
}