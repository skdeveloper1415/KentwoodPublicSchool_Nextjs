"use client";
import { useState, useRef, useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import ChartWrapper from '../../components/chartwrapper'
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
import {fetchStaff_DIversity_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import MultiplebarChart from "../charts/multiplebarchart";
import { FormatNum } from "../utils";
import ReactEcharts from 'echarts-for-react';


export default function Staffdiversity(props) {
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

    const [selectedDimension, setSelectedDimension] = useState({ name: "Role", code: "ROLE" });
    const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
    useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

    const Dimensions = [
        // { name: 'New York', code: 'NY' },
        // { name: 'Rome', code: 'RM' },
        // { name: 'London', code: 'LDN' },
        // { name: 'Istanbul', code: 'IST' },
        // { name: 'Paris', code: 'PRS' }
        
        // { name: "School Year", code: "School_Year" },
        { name: "Role", code: "Role" },
    ];

    /* redux state */
const Staff_DIversity_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Staff_DIversity_Popup_dimensionloading)
const Staff_DIversity_Popup_dimension = useSelector(state => state.indicatorpopup.Staff_DIversity_Popup_dimension)
/* */

/* API Calls */
const dispatch = useDispatch();

useEffect(()=>{
  if(selectedDimension && visible){
    dispatch(fetchStaff_DIversity_Popup_dimension({
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
const ChartData = useMemo(()=>{
    let Labels = []
    let data = Staff_DIversity_Popup_dimension.reduce((acc,item)=>{
      let {[selectedDimension.code]:Dimension,...rest} = item
      if (!acc[Dimension]){
        acc[Dimension] = {[rest?.["RACE"]]: {[rest?.["DISTRICT"]]: rest?.["KPS_VALUES"]}}
        Labels.push(Dimension)
      } else if (!acc[Dimension][rest?.["RACE"]]){
        acc[Dimension] = {...acc[Dimension], [rest?.["RACE"]]: {[rest?.["DISTRICT"]]: rest?.["KPS_VALUES"]}}
      } else {
        acc[Dimension][rest?.["RACE"]] = {...acc[Dimension][rest?.["RACE"]], [rest?.["DISTRICT"]]: rest?.["KPS_VALUES"]}
      }

      return acc
    },{})

    Labels = [...new Set(Labels)].sort()  //Sort the Data
    let _data = {}
    for (let dimension in data){
        for (let race in data[dimension]){
            for (let key in data[dimension][race]){
                if(!_data[race]){
                    _data[race] = {[key]:[]}
                } else if (!_data[race][key]){
                    _data[race] = {..._data[race],[key]:[]}
                }
                _data[race][key].push(data[dimension][race][key])
            }
        }
    }

    return {data: _data, Label: Labels}
  },[Staff_DIversity_Popup_dimension])

  const CustomChartConfig = useMemo(() => {
    const colors = ["#cfcfcf", "#a9a9a9", "#848484", "#5e5e5e", "#484848", "#323232", "#3f3f3f"]
    let Option = {
        // title: {
        //     text: 'Staff Retention Over Time'
        // },
        tooltip: {
            // trigger: 'axis',
            // axisPointer: {
            //     type: 'shadow',
            // }
            formatter: params => {
                const [seriesname,category] = params?.seriesName?.split(',')
                return `<div style="min-width:9rem;">
                    <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
                        <p style="width:40%">District:</p>
                        <p style="font-weight:bold;">${category}</p>
                    </div>
                    <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
                        <p style="width:40%">Race:</p>
                        <p style="font-weight:bold;">${seriesname}</p>
                    </div>
                    <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
                        <p style="width:40%">Role:</p>
                        <p style="font-weight:bold;">${params?.name}</p>
                    </div>
                    <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
                        <p style="width:40%">Percent:</p>
                        <p style="font-weight:bold;">${FormatNum(params?.value, 1)}%</p>
                    </div>
                </div>`
            }
        },
        grid: {
            top: '10%',   // Adjust grid to leave space for the top axis
            bottom: '20%' // Adjust grid to leave space for the bottom axis labels
        },
        yAxis: [
            {
                type: 'category',
                position: 'top', // Move main category axis to the top
                // data: ['1-Year', '5-Year', '10-Year'],
                data: ChartData?.Label,
                splitLine: {     // Add split lines between categories
                    show: true,
                    lineStyle: {
                        color: '#374151'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                    show: false  // Remove ticks on bottom axis
                },
                axisLine: {
                    show: true,   // Line for the bottom axis
                    lineStyle: {
                        color: '#374151'
                      }
                },
                axisLabel:{
                    color: '#E5E7EB',
                }
            },
            {
                type: 'category',
                position: 'bottom', // Series names as the bottom x-axis
                // data: ['Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall'],
                data: Array(ChartData?.Label.length || 0).fill(["Statewide", "KPS"]).flat(),
                axisTick: {
                    alignWithLabel: true,
                    show: false  // Remove ticks on bottom axis
                },
                axisLine: {
                    show: true,   // Line for the bottom axis
                    lineStyle: {
                        color: '#374151'
                      }
                },
                axisLabel: {
                    // rotate: 45,  // Rotate the bottom x-axis labels by 45 degrees
                    interval: 0, // Ensure all labels are shown, not skipped
                    textStyle: {
                        fontSize: 12 // Adjust font size if needed
                    },
                    color: '#E5E7EB',
                },
            }
            
        ],
        xAxis: [
            {
                name: "Percent of Staff",
                nameLocation: "middle",
                nameGap: 40,
                nameTextStyle: {
                    fontSize: 12,             
                    // fontWeight: 100,
                    color: '#E5E7EB',
                },

                type: 'value',
                axisLabel: {
                    formatter: '{value} %',
                    color: '#E5E7EB',
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: "#374151",
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#374151'
                    }
                },
            }
        ],
        
        series: Object.entries(ChartData?.data || {}).reduce((acc,[key,value],i)=>{
            Object.entries(value || {}).forEach(([key1,value1])=>{
                acc.push({
                    name: `${key},${key1}`,
                    type: 'bar',
                    stack: key1,
                    data: value1,
                    label: {
                        show: true,
                        position: 'insideTop',
                        // formatter: '{c}%',
                        color: '#E5E7EB',
                        formatter: (params) => params?.value > 20 ? FormatNum(params?.value, 1) + "%" : ""
                    },
                    itemStyle: {
                        color: colors[i]
                    },
                    tooltip:{
                        valueFormatter: value => FormatNum(value, 1) + "%"
                    }
                })
            })
            return acc
        },[])
    };

    return Option
}, [ChartData])
  /*  */

    const lineChartData = {
        label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        value: [5, 6, 5, 6, 7, 7, 8,]
    }
    return (
        <>
            <div>
                <Dialog header="Header"
                    className="custmDialog w-[80%] md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
                    visible={visible}
                    onHide={onHide}>
                    <div>
                        <div className="bg_bg_brand_neutral_100 flex items-center justify-between 2xl:gap-[1.563vw] gap-5 2xl:py-[0.677vw] py-[13px] 2xl:px-[1.25vw] px-5">
                            <div>
                                <Image src={'/images/diverse-staff-logo.png'} width={102} height={70} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw]" />
                            </div>
                            <div className="2xl:w-[16.094vw] w-[300px]">
                                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">PREMIER TEACHING</div> */}
                                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold"><span className="font-normal">High Impact,</span> Diverse Staff</div>
                            </div>
                            <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.</p>
                            </div>
                        </div>
                        <div className="brand-neutral-50 items-center 2xl:gap-[0.833vw] gap-4 2xl:h-[3.125vw] h-[65px]  xl:h-[55px] flex justify-between">
                            <div className="flex gap-[10px]">
                                <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>

                                <div className="2xl:text-[0.938vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                                    <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                                    <div className="white_text_color text-[16px] xl:text-[16px] 3xl:text-[0.833vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Staff Diversity
                                    </p></div>
                                </div>
                            </div>
                            {/* <Image src={'/images/diverse-staff-logo.png'} width={70} height={40} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw] flex justify-end mr-[20px] xl:mr-[20px] 3xl:mr-[1.042vw]" /> */}
                        </div>
                        <ScrollPanel
className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[33.458vw] w-full custm_ScrollPanel">
                            <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                                {/*col*/}
                                <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-[1.25vw] gap-5">
                                    <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 flex items-center 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div className=" ">

                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        CY:2023-24
                                                        <div className="text-[#FFFFFF] text-[14px] xl:text-[14px] 3xl:text-[0.938vw] 2xl:text-[0.938vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                            {metric1}
                                                        </div>
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
                                    {/* <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 flex items-center 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#FFFFFF] text-[14px] xl:text-[14px] 3xl:text-[0.938vw] 2xl:text-[0.938vw]font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        AY:2023
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    8,452
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
                                    <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 flex items-center 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#FFFFFF] text-[14px] xl:text-[14px] 3xl:text-[0.938vw] 2xl:text-[0.938vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        AY:2022
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    2,545
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
                                        formatDownloadedData={Staff_DIversity_Popup_dimension}
                                        formatFileName={"Staff Diversity"}
                                        ExportIcon={true}
                                        titleshow={true}
                                        title={"Staff Diversity - Demographics by Role"}
                                        data={
                                            <>
                                                <div>
                                                    <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 2xl:mt-[0.417vw] mt-1.5">
                                                        {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw]">View By:</div>
                                                            <div>
                                                                <Dropdown
                                                                value={selectedDimension}
                                                                onChange={(e) => setSelectedDimension(e.value)}
                                                                options={Dimensions}
                                                                optionLabel="name"
                                                                placeholder="Select Dimension"
                                                                className="w-full 2xl:h-[1.51vw] h-[24px] custom_Dropdown"
                                                                panelClassName="custom_Dropdownpanel"
                                                                />
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
                                                    <div className="h-[371px] xl:h-[310px]
                                                     3xl:h-[15.625vw] max-md:w-[1000px]">
                                                        <LoaderContainer height={'100%'} loading={Staff_DIversity_Popup_dimensionloading}>
                                                        {/* <Barlinechart
                                                            legends={{
                                                                show: false,
                                                                bottom: 0,
                                                                left: 10,
                                                                icon: "roundRect",
                                                                itemWidth: 10,
                                                                itemHeight: 10,
                                                                textStyle: {
                                                                    color: "#fff"
                                                                },
                                                                // data: [
                                                                //     { name: 'bars', icon: 'roundRect' },
                                                                //     { name: 'K12 Enrollment', icon: 'roundRect', itemStyle: { color: '#B07AA1' } },
                                                                // ]
                                                                data: [
                                                                        { name: 'KPS White', icon: 'roundRect' },
                                                                        { name: 'KPS Others', icon: 'roundRect', itemStyle: { color: '#B07AA1' } },
                                                                    ]
                                                            }}
                                                            xaxisLabel={{
                                                                interval: 0,
                                                                fontSize: 8,
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
                                                                formatter: "{c}%",
                                                                color: "#ffff",
                                                                fontSize: 11
                                                            }}
                                                            itemstyle1={{
                                                                borderRadius: [4, 4, 0, 0],
                                                                color: "#B07AA1"
                                                            }}
                                                            // Name1={"bars"}
                                                            // lineName1={"K12 Enrollment"}
                                                            grid={{
                                                                top: '10%',
                                                                bottom: '20%',
                                                                left: '60',
                                                                right: '5%'
                                                            }}
                                                            barWidth={65}

                                                            colors={['#E6DE32']}
                                                            // data={{
                                                            //     labels: ["Asian", "Black or AA", "Hispanic", "Two or More", "White"],
                                                            //     values: ["60", "37", "55", "58", "25"],

                                                            // }}
                                                            lineName1="KPS Others"
                                                            Name1={"KPS White"}
                                                            data={{
                                                                labels: ChartData.Label,
                                                                values: ChartData.data?.["KPS_WHITE"],
                                                                values2: ChartData.data?.["KPS_OTHERS"],
                                                            }}
                                                            xAxisName={selectedDimension.name}
                                                            xAxisNameGap={"30"}
                                                            xAxisNamePosition={"center"}
                                                            yAxisName={"Percent of students"}
                                                            yAxisNameGap={"45"}
                                                            yAxisNamePosition={"middle"}
                                                            tooltip={{
                                                                Category: selectedDimension?.name,
                                                                metric1: "KPS White",
                                                                metric2: "KPS Others"
                                                              }}
                                                        /> */}
                                                        {/* <MultiplebarChart
                                                            // data={BarCharData}
                                                            // xAxisName={`Percentile Rank by ${selectedDimension.name}`}
                                                            xAxisNameGap={"30"}
                                                            xAxisNamePosition={"middle"}
                                                            yAxisName={"Percent of Staff"}
                                                            yAxisNameGap={"35"}
                                                            yAxisNamePosition={"middle"}
                                                            // min={0}
                                                            // max={90}
                                                            legend={{
                                                                show: false,
                                                                bottom: 0,
                                                                left: 10,
                                                                icon: "roundRect",
                                                                itemWidth: 10,
                                                                itemHeight: 10,
                                                                textStyle: {
                                                                    color: "#fff"
                                                                },
                                                                data: [
                                                                    { name: 'KPS White', icon: 'roundRect' },
                                                                    { name: 'KPS Others', icon: 'roundRect', itemStyle: { color: '#B07AA1' } },
                                                                ]
                                                            }}
                                                            grid={{
                                                                top: 20,
                                                                left: 60,
                                                                right: 35,
                                                                bottom:75
                                                            }}
                                                            color1={'#cfcfcf'}
                                                            color2={'#3f3f3f'}
                                                            color3={'#cfcfcf'}
                                                            color4={'#3f3f3f'}
                                                            labelcolor1={'#000'} 
                                                            labelcolor3={'#000'} 
                                                            name1={"KPS White"}
                                                            name2={"KPS Others"}
                                                            axislabelpercent1={true}
                                                            // axislabelpercent2={true}
                                                            tooltipformater={value => FormatNum(value,1) + "%"}
                                                            labelpercent1={true}
                                                            labelpercent2={true}
                                                            labelpercent3={true}
                                                            StackCombo={true}
                                                            series3={true}
                                                            series4={true}
                                                            name3={"Statewide White"}
                                                            name4={"Statewide Others"}
                                                            data={{
                                                                labels: ChartData.Label,
                                                                values: ChartData.data?.["KPS_WHITE"],
                                                                values2: ChartData.data?.["KPS_OTHERS"],
                                                                values3: ChartData.data?.["STATEWIDE_WHITE"],
                                                                values4: ChartData.data?.["STATEWIDE_OTHERS"],
                                                        }} /> */}
                                                        <ReactEcharts
                                                            option={CustomChartConfig}
                                                            opts={{ renderer: 'svg' }}
                                                            style={{ width: '100%', height: '100%' }}
                                                        />
                                                        </LoaderContainer>

                                                    </div>
                                                    </div>

                                                    <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                                                        <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                                                        Data represent total headcounts. Headcounts count each employee once, regardless of whether the employee works full time.
                                                    </div>
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
