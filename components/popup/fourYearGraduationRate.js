"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ChartWrapper from '../chartwrapper'
import { Timeline } from 'primereact/timeline';
import { Dialog } from 'primereact/dialog';
import { ScrollPanel } from 'primereact/scrollpanel';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from 'primereact/dropdown';
import VerticalStackBarChart from "../charts/verticalstackbarchart";
import HorizontalStackBarChart from "../charts/horizontalstackbarchart";
import Linechartwithgradient from "../charts/linechartwithgradient";
import * as echarts from 'echarts';
import Gaugechart from "../charts/gaugechart";
import VerticalBarChart from "../charts/barlinechart";
import Barlinechart from "../charts/barlinechart";
import { useDispatch, useSelector } from "react-redux";
import {fetchGraduation_Rate_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import { ChartSplitLine, FormatNum } from "../utils";

export default function FourYearGraduationRate(props) {
    const { visible, onHide, value2, metric1} = props;

    const events = [
        { status: 'Ordered', date: 'Jun 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-ordered' },
        { status: 'Processing', date: 'Dec 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Shipped', date: 'Jun 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Ordered', date: 'Dec 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
        { status: 'Ordered', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
        { status: 'Shipped', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Shipped', date: 'Jun 2026', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
    ];

    const [selectedDimension, setselectedDimension] = useState({ name: "Student Group", code: "STUDENT_GROUP" });
    const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
    useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

    const Dimensions = [
        // { name: 'New York', code: 'NY' },
        // { name: 'Rome', code: 'RM' },
        // { name: 'London', code: 'LDN' },
        // { name: 'Istanbul', code: 'IST' },
        // { name: 'Paris', code: 'PRS' }

        // { name: "School Year", code: "School_Year" },
        { name: "Student Group", code: "STUDENT_GROUP" },
        // { name: "Ethnicity", code: "ETHNICITY" },
        // { name: "SPED", code: "SPED" },
        // { name: "Language", code: "LANGUAGE" },
        // { name: "Gender", code: "GENDER" },
        // { name: "Grade", code: "GRADE" },

    ];

    /* redux state */
    const Graduation_Rate_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Graduation_Rate_Popup_dimensionloading)
    const Graduation_Rate_Popup_dimension = useSelector(state => state.indicatorpopup.Graduation_Rate_Popup_dimension)
    /* */

    /* API Calls */
    const dispatch = useDispatch();

    useEffect(()=>{
    if(selectedDimension && visible){
        dispatch(fetchGraduation_Rate_Popup_dimension({
        "elasticQueryName": "",
        "filters": selectedYear ? [
            {
              "columnName": `"School_Year"`,
              "columnValue": [selectedYear?.code],
              "excludeKeyword": false
            }
          ] : [],
        "dynamicColumns": [
            {
            "columnName": "#{dimension1}",
            "columnValue": `"${selectedDimension.code}"`,
            "excludeKeyword": false
            }
        ],
        }))
    }
    },[visible, selectedDimension, selectedYear])
    /* */

    /*  */
    const ChartData = useMemo(() => {
        let SplitLine;
        let Labels = []
        let data = Graduation_Rate_Popup_dimension.reduce((acc, item) => {
            let { [selectedDimension.code]: Dimension, STATEWIDE_AVERAGE, ...rest } = item
            SplitLine = STATEWIDE_AVERAGE;
            Object.entries(rest).forEach(([key, value]) => {
                if (!acc[key]) {
                    acc[key] = { [Dimension]: 0 }
                    Labels.push(Dimension)
                } else {
                    acc[key] = {...acc[key], [Dimension]: 0 }
                }
                acc[key][Dimension] += value
                Labels.push(Dimension)
            })

            return acc
        }, {})

        // Labels = [...new Set(Labels)].sort()  //Sort the Data
        Labels = selectedDimension?.code == "STUDENT_GROUP" ? [...new Set(Labels)] : [...new Set(Labels)].sort()


        for (let Name in data) {
            data[Name] = Labels.map(key => data[Name][key] || 0)
        }

        return { data: data, Label: Labels, ChartSplitLine: ChartSplitLine({y: SplitLine})}
    }, [Graduation_Rate_Popup_dimension])
  /*  */

    const lineChartData = {
        label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        value: [5, 6, 5, 6, 7, 7, 8,]
    }

    return (
        <>
            <div>
                <Dialog header="Header"
                    className="custmDialog w-[80%]  md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
                    visible={visible}
                    onHide={onHide}>
                    <div>
                        <div className="bg_bg_brand_neutral_100 flex max-md:flex-wrap items-center justify-between 2xl:gap-[1.563vw] gap-5 2xl:py-[0.677vw] py-[13px] 2xl:px-[1.25vw] px-5">
                            <div>
                                <Image src={'/images/eoo.png'} width={102} height={70} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw]" />
                            </div>
                            <div className="2xl:w-[16.094vw] w-[300px]">
                                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">PREMIER TEACHING</div> */}
                                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold"><span className="font-normal">Equitable</span> Opportunities & Outcomes</div>
                            </div>
                            <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.</p>
                            </div>
                        </div>
                        <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4   2xl:h-[3.125vw] h-[65px] xl:h-[55px]">
                            <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>
                            <div className="2xl:text-[0.938vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                                <div className="white_text_color  text-[16px] xl:text-[0.885vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Four-Year Graduation Rate
                                </p></div>
                            </div>
                        </div>
                        <ScrollPanel className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] w-full custm_ScrollPanel">
                            <div className="bg_blue_color_900 2xl:p-[1.25vw] p-5 2xl:space-y-[1.25vw] space-y-[20px]">
                                {/*col*/}
                                <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-[1.25vw] gap-5">
                                    <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 ">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-12 md:col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                      {/* 4Y Graduation Rate */}
                                                      CY: 2022-23
                                                    </div>
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                        {metric1}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mt-4">
                                                 {value2}
                                                </div>
                                                <div className="2xl:text-[0.521vw] xl:text-[10px] text-[#9CA1AB] font-normal uppercase">
                                                    {/* LY Var: <span className="text-[#31C48D]">-%</span> */}
                                                </div>
                                                {/* <div className="h-[16px] 3xl:h-[0.833vw]">
                                                    <Linechartwithgradient
                                                        grid={{
                                                            top: 0,
                                                            left: 5,
                                                            right: 10,
                                                            bottom: 0,
                                                            containLabel: true,
                                                        }}
                                                        lineStyle={{ color: "#31C48D", width: 1.5 }}
                                                        areaStyle={{
                                                            color: new echarts.graphic.LinearGradient(
                                                                0,
                                                                0,
                                                                0,
                                                                1,
                                                                [
                                                                    {
                                                                        offset: 0.9,
                                                                        color: "#31C48D00",
                                                                    },
                                                                    {
                                                                        offset: 0.5,
                                                                        color: "#31C48D42",
                                                                    },
                                                                ]
                                                            ),
                                                        }}
                                                        data={lineChartData}
                                                    />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                      4Y Graduation Rate
                                                    </div>
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                         2022-2023
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                   82%
                                                </div>
                                                <div className="2xl:text-[0.521vw] xl:text-[10px] text-[#9CA1AB] font-normal uppercase">
                                                    LY Var: <span className="text-[#31C48D]">10%</span>
                                                </div>
                                                <div className="h-[16px] 3xl:h-[0.833vw]">
                                                    <Linechartwithgradient
                                                        grid={{
                                                            top: 0,
                                                            left: 5,
                                                            right: 10,
                                                            bottom: 0,
                                                            containLabel: true,
                                                        }}
                                                        lineStyle={{ color: "#31C48D", width: 1.5 }}
                                                        areaStyle={{
                                                            color: new echarts.graphic.LinearGradient(
                                                                0,
                                                                0,
                                                                0,
                                                                1,
                                                                [
                                                                    {
                                                                        offset: 0.9,
                                                                        color: "#31C48D00",
                                                                    },
                                                                    {
                                                                        offset: 0.5,
                                                                        color: "#31C48D42",
                                                                    },
                                                                ]
                                                            ),
                                                        }}
                                                        data={lineChartData}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                      4Y Graduation Rate
                                                    </div>
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                         2021-2022
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                   95%
                                                </div>
                                                <div className="2xl:text-[0.521vw] xl:text-[10px] text-[#9CA1AB] font-normal uppercase">
                                                    LY Var: <span className="text-[#31C48D]">30%</span>
                                                </div>
                                                <div className="h-[16px] 3xl:h-[0.833vw]">
                                                    <Linechartwithgradient
                                                        grid={{
                                                            top: 0,
                                                            left: 5,
                                                            right: 10,
                                                            bottom: 0,
                                                            containLabel: true,
                                                        }}
                                                        lineStyle={{ color: "#31C48D", width: 1.5 }}
                                                        areaStyle={{
                                                            color: new echarts.graphic.LinearGradient(
                                                                0,
                                                                0,
                                                                0,
                                                                1,
                                                                [
                                                                    {
                                                                        offset: 0.9,
                                                                        color: "#31C48D00",
                                                                    },
                                                                    {
                                                                        offset: 0.5,
                                                                        color: "#31C48D42",
                                                                    },
                                                                ]
                                                            ),
                                                        }}
                                                        data={lineChartData}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                {/*col*/}
                                <div>
                                    <ChartWrapper
                                        formatDownloadedData={Graduation_Rate_Popup_dimension}
                                        formatFileName={"Four-Year Graduation Rate"}
                                        ExportIcon={true}
                                        titleshow={true}
                                        title={"Four-Year Graduation Rate Students Graduating on Time"}
                                        data={
                                            <>
                                                <div>
                                                    <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 2xl:mt-[0.417vw] mt-1.5">
                                                        {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw]">View By:</div>
                                                            <div>
                                                                <Dropdown value={selectedDimension} onChange={(e) => setselectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                                                    placeholder="Select Dimension" className="w-full md:w-[309px] 2xl:w-[18.229vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
                                                            </div>
                                                        </div> */}
                                                        <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                        <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">
                                                            Choose Year:
                                                        </div>
                                                        <div>
                                                        <Dropdown
                                                            showClear
                                                            value={selectedYear}
                                                            onChange={(e) => setSelectedYear(e.value)}
                                                            options={props.options}
                                                            optionLabel="name"
                                                            placeholder="Select Year"
                                                            className="w-[200px]  2xl:w-[11.198vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown"
                                                            panelClassName="custom_Dropdownpanel"
                                                        />
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className='overflow-auto'>
                                                     <div className="h-[155px] xl:h-[21.185vw] 2xl:h-[17.385vw] 3xl:h-[15.385vw] max-md:w-[1000px]">
                                                        <LoaderContainer height={'100%'} loading={Graduation_Rate_Popup_dimensionloading}>
                                                        <Barlinechart
                                                            legends={{
                                                                show:false,
                                                                left: 10,
                                                                bottom: 7,
                                                                textStyle: {
                                                                    fontSize: 10,
                                                                    color: "#FFFFFF",
                                                                },
                                                                itemWidth: 9,
                                                                itemHeight: 9,
                                                            }}
                                                            grid={{
                                                                top: 25,
                                                                left: 40,
                                                                right: 30,
                                                                bottom: 40,
                                                                containLabel: true
                                                            }}
                                                            // lineName1="Average"
                                                            lineName1="Total Graduated"
                                                            // Name1={"Percent of students"}
                                                            Name1={"Graduation Rate"}
                                                            barcolor={"#B7E1CD"}
                                                            colors={['#E6DE32']}
                                                            // data={{
                                                            //     labels: ["Asian", "Black or AA", "Hispanic", "Two or More", "White"],
                                                            //     values: ["90", "80", "75", "85", "80"],
                                                            //     values2: ["80", "80", "80", "80", "80"],
                                                            // }}
                                                            data={{
                                                                labels: ChartData.Label,
                                                                values: ChartData.data?.["GRADUATION_RATE"],
                                                                values2: ChartData.data?.["TOTAL_GRADUATED"],
                                                            }}
                                                            xAxisName={selectedDimension.name}
                                                            xAxisNameGap={"30"}
                                                            xAxisNamePosition={"center"}
                                                            yAxisName={"Percent of students"}
                                                            yAxisNameGap={"45"}
                                                            yAxisNamePosition={"middle"}
                                                            formatter={"{c}%"}
                                                            xaxisLabel={{
                                                                interval: 0,
                                                                fontSize: 10,
                                                                color: '#344054',
                                                                textStyle: {
                                                                    color: "#E5E7EB"
                                                                }
                                                            }}
                                                            xaxisTick={{
                                                                show: false,
                                                            }}
                                                            xaxisLine={{
                                                                show: true,
                                                                lineStyle: {
                                                                    color: "#374151"
                                                                }
                                                            }}
                                                            // min={0}
                                                            // max={100}
                                                            // interval={20}
                                                            yaxisLabel={{
                                                                show: true,
                                                                formatter: "{value}%",
                                                                color: '#E5E7EB',
                                                                fontSize: 12
                                                            }}
                                                            yaxisLine={{
                                                                show: true,
                                                                lineStyle: {
                                                                    color: "#374151"
                                                                }
                                                            }}
                                                            yaxisSplitlines={{
                                                                show: true,
                                                                lineStyle: {
                                                                    type: 'dashed',
                                                                    color: '#344054',
                                                                }
                                                            }}
                                                            label1={{
                                                                show: true,
                                                                position: "top",
                                                                formatter: params => FormatNum(params.value, 1) + "%",
                                                                color: "#ffff",
                                                                fontSize: 11
                                                            }}
                                                            itemstyle1={{
                                                                borderRadius: [4, 4, 0, 0],
                                                                color: "#B7E1CD"
                                                            }}
                                                            barWidth={65}
                                                            lineColor1={"#F8826B"}
                                                            tooltip={{
                                                                Category: selectedDimension?.name,
                                                                metric1: "Graduation Rate",
                                                                metric2: "Total Graduated"
                                                              }}
                                                            ChartSplitLine={ChartData?.ChartSplitLine}

                                                        />
                                                        </LoaderContainer>
                                                    </div>
                                                    </div>
                                                    <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                                                        <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                                                        Students enrolled in early middle college have five years to complete high school - and are not counted against the four-year graduation rate.</div>
                                                </div>
                                            </>
                                        }
                                    />
                                </div>

                            </div>
                        </ScrollPanel>
                    </div>
                </Dialog>
            </div>
        </>
    );
}
