"use client";
import { useState, useRef, useEffect,useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import ChartWrapper from "../chartwrapper";
import { Timeline } from "primereact/timeline";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from "primereact/dropdown";
import VerticalStackBarChart from "../charts/verticalstackbarchart";
import HorizontalStackBarChart from "../charts/horizontalstackbarchart";
import Linechartwithgradient from "../charts/linechartwithgradient";
import * as echarts from "echarts";
import MultiplebarChart from "../charts/multiplebarchart";
import { useDispatch, useSelector } from "react-redux";
import {fetchStaff_Engagement_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import { FormatNum, getRankSuffix } from "../utils";
import Barlinechart from "../charts/barlinechart";
import ReactEcharts from 'echarts-for-react';

export default function KeyIndicatorsPopup(props) {
  const { visible, onHide, value2, metric1} = props;
  const lineChartData = {
    label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
    value: [5, 6, 5, 6, 7, 7, 8],
  };
  const events = [
    {
      status: "Ordered",
      date: "Jun 2023",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-dots",
      color: "var(--white_text_color)",
      className: "event-ordered",
    },
    {
      status: "Processing",
      date: "Dec 2023",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-flag",
      color: "var(--white_text_color)",
      className: "event-flagIcon",
    },
    {
      status: "Shipped",
      date: "Jun 2024",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-flag",
      color: "var(--white_text_color)",
      className: "event-flagIcon",
    },
    {
      status: "Ordered",
      date: "Dec 2024",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-dots",
      color: "var(--white_text_color)",
      className: "event-initiative-show",
    },
    {
      status: "Ordered",
      date: "Jun 2025",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-dots",
      color: "var(--white_text_color)",
      className: "event-initiative-show",
    },
    {
      status: "Shipped",
      date: "Jun 2025",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-flag",
      color: "var(--white_text_color)",
      className: "event-flagIcon",
    },
    {
      status: "Shipped",
      date: "Jun 2026",
      datesubno: "1.1",
      initiative: "Initiative 1.1.1",
      icon: "ru-flag",
      color: "var(--white_text_color)",
      className: "event-flagIcon",
    },
  ];


  const [selectedDimension, setSelectedDimension] = useState({ name: "Role", code: "Role" });
  const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
  useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

  const Dimensions = [
    // { name: "New York", code: "NY" },
    // { name: "Rome", code: "RM" },
    // { name: "London", code: "LDN" },
    // { name: "Istanbul", code: "IST" },
    // { name: "Paris", code: "PRS" },

    // { name: "School Year", code: "School_Year" },
    { name: "Role", code: "Role" },
  ];

/* redux state */
const Staff_Engagement_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Staff_Engagement_Popup_dimensionloading)
const Staff_Engagement_Popup_dimension = useSelector(state => state.indicatorpopup.Staff_Engagement_Popup_dimension)
/* */

/* API Calls */
const dispatch = useDispatch();

useEffect(()=>{
  if(selectedDimension && visible){
    dispatch(fetchStaff_Engagement_Popup_dimension({
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
// const chartdata = useMemo(()=>{
//   let Labels = []
//   const colors = ['#cfcfcf', '#7f7f7f', '#3f3f3f']
//   let data = Staff_Engagement_Popup_dimension.reduce((acc, item) => {
//       let { [selectedDimension.code]: Dimension, ...rest } = item
//       Object.entries(rest).forEach(([key, value]) => {
//           if (!acc[key]) {
//               acc[key] = { [Dimension]: 0 }
//               Labels.push(Dimension)
//           } else {
//               acc[key] = {...acc[key], [Dimension]: 0 }
//           }
//           acc[key][Dimension] += value
//           Labels.push(Dimension)
//       })
//       return acc
//   },{})

//   Labels = [...new Set(Labels)].sort()  //Sort the Data

//   for (let Name in data) {
//       data[Name] = Labels.map((key,i) => ({value: data[Name][key], itemStyle: {color: colors[i % Labels.length]}}) || 0)
//   }

//   return { data: data, Label: Labels }

// },[Staff_Engagement_Popup_dimension])
/*  */

const CustomChartConfig = useMemo(() => {
  // const colors = ["#cfcfcf", "#a9a9a9", "#848484", "#5e5e5e", "#484848", "#323232", "#3f3f3f"]

  const minmaxofvalues = ((arr)=>{
    const data = arr.map(item => item?.PERCENTILE)
    const min = Math.min(...data)
    const max = Math.max(...data)

    return {min:min,max:max}
  })(Staff_Engagement_Popup_dimension)

  function interpolateSize(value, {min, max}, startSize, endSize) {

    function getSize(value) {
        // Linear interpolation formula
        return startSize + (endSize - startSize) * (value - min) / ((max - min) || 1);
    }

    return getSize(value);
  }

  const Option = {
    tooltip: {
        // trigger: 'item',
        formatter: params => {
          const {name,value,value1} = params.data
          return `<div style="min-width:8rem;">
            <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
              <p style="width:40%">Role:</p>
              <p style="font-weight:bold;">${name}</p>
            </div>
            <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
              <p style="width:40%">Percentile Rank:</p>
              <p style="font-weight:bold;">${getRankSuffix(value)}</p>
            </div>
            <div style="display:flex;width:'100%';justify-content:space-between;gap:5px;">
              <p style="width:40%">Total Staff:</p>
              <p style="font-weight:bold;">${FormatNum(value1, 1)}</p>
            </div>
          </div>`
        }
    },
    series: [{
        type: 'graph',
        layout: 'force', // Use force layout for collision avoidance
        force: {
            repulsion: 400, // Adjust this value to control spacing
            gravity: 0.1
        },
        // draggable: true,
        // roam: true,
        // data: [
        //     {name: 'A', value: 10},
        //     {name: 'B', value: 20},
        //     {name: 'C', value: 30},
        //     {name: 'D', value: 40},
        //     {name: 'E', value: 50}
        // ],
        data: Staff_Engagement_Popup_dimension.map(item=>({
          name: item?.ROLE,
          value: item?.PERCENTILE,
          value1: item?.TOTAL_STAFF
        }))?.sort((a,b)=> a?.value - b?.value),
        symbolSize: function (val,params) {
            // Adjust the size based on your data
            // return 150; // Square root for better scaling
            return interpolateSize(val,minmaxofvalues,110,150); // Square root for better scaling
        },
        label: {
            show: true,
            // color: '#000',
            formatter: params => `${params.name}\n\n${getRankSuffix(params.value)}`
        },
        itemStyle: {
            color: function (params) {
                var colors = ['#cfcfcf', '#7f7f7f', '#3f3f3f'];
                return colors[params.dataIndex % colors.length];
            },
            borderColor: '#000',
            borderWidth: 2
        },
        // tooltip: {
        //   valueFormatter: value => getRankSuffix(value)
        // },
        emphasis: {
          disabled: true // Disables the emphasis state
        },
    }]
  };

  return Option
}, [Staff_Engagement_Popup_dimension])

const BarCharData = {
    labels: ['department', 'Administrators', 'Paraprofessionals', 'Teachers'],
    values: [
      { department: '2021', Administrators: 77, Paraprofessionals: 52, Teachers: 57, },
      { department: '2022', Administrators: 90, Paraprofessionals: 55, Teachers: 51, },
      { department: '2023', Administrators: 89, Paraprofessionals: 56, Teachers: 47, },
      { department: '2024', Administrators: 87, Paraprofessionals: 40, Teachers: 37, },
    ]
  }
  return (
    <>
      <div>
        <Dialog
          header="Header"
          className="custmDialog  w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
          visible={visible}
          onHide={onHide}
        >
          <div>
            <div className="bg_bg_brand_neutral_100 flex items-center justify-between 2xl:gap-[1.563vw] gap-5 2xl:py-[0.677vw] py-[13px] 2xl:px-[1.25vw] px-5">
              <div>
                <Image
                  src={"/images/diverse-staff-logo.png"}
                  width={95}
                  height={60}
                  alt="Equitable Opportunities & Outcome"
                  className="2xl:w-[4.948vw] 2xl:h-[3.125vw]"
                />
              </div>
              <div className="2xl:w-[22.094vw] w-[500px]">
                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">
                  PREMIER TEACHING
                </div> */}
                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold">
                <span className="font-normal">High Impact,</span> Diverse Staff
                </div>
              </div>
              <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-light leading-4 2xl:leading-[0.885vw]">
                <p>
                Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.
                </p>
              </div>
            </div>
            <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4 2xl:h-[3.125vw] h-[65px]  xl:h-[55px]">
              <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center">
                <i className="ru-arrow-down"></i>
              </div>
              <div className="2xl:text-[0.938vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm">
                  <i className="ru-dots"></i>
                </div>
                <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]">
                  <p>Staff Engagement Index</p>
                </div>
              </div>
            </div>
            <ScrollPanel
               className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[33.458vw] w-full custm_ScrollPanel"
            >
              <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                <div className="grid grid-cols-3 2xl:gap-[1.25vw] gap-5">
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            {/* Average Ranking */}
                            Administrators
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                            {metric1}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mt-4">
                          {getRankSuffix(value2)}
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
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
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            Average Ranking
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                            Paraprofessionals
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          51
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
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
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            45
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                            Teachers
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          51
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
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
                  </div> */}
                </div>

                <div>
                  <ChartWrapper
                    formatDownloadedData={Staff_Engagement_Popup_dimension}
                    formatFileName={"Staff Engagement Index"}
                    ExportIcon={true}
                    titleshow={true}
                    title={
                      "Staff Engagement Index - Percentile Rank by Role"
                    }
                    data={
                      <>
                        <div>

                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 my-3 2xl:gap-[1.25vw] gap-5">
                            {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">View By:</div>
                            <div>
                              <Dropdown value={selectedDimension} onChange={(e) => setSelectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                placeholder="Select a City" className="w-full 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
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
                            <div>
                            {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                              <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">Breakdown by:</div>
                              <div>
                                <Dropdown value={selectedDimension} onChange={(e) => setSelectedDimension(e.value)} options={cities} optionLabel="name"
                                  placeholder="Select a City" className="w-full md:w-[75px] 2xl:w-[3.906vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
                              </div>
                            </div> */}
                            </div>
                          </div>


                          <div className="h-[371px] xl:h-[19.323vw]">
                            <LoaderContainer height={'100%'} loading={Staff_Engagement_Popup_dimensionloading}>
                            {/* <MultiplebarChart
                              // data={BarCharData}
                              xAxisName={`Percentile Rank by ${selectedDimension.name}`}
                              xAxisNameGap={"30"}
                              xAxisNamePosition={"middle"}
                              yAxisName={"Percentile Rank"}
                              yAxisNameGap={"35"}
                              yAxisNamePosition={"middle"}
                              // min={0}
                              // max={90}
                              legend={{
                                bottom: 15,
                                left: 0,
                                itemWidth: 10,
                                itemHeight: 10,
                                textStyle: {
                                  color: "#E5E7EB",
                                },
                              }}
                              grid={{
                                top: 20,
                                left: 60,
                                right: 20,
                                bottom:75
                              }}
                              color1={"#EDC948"}
                              color2={"#B07AA1"}
                              name1={"Total Staff"}
                              name2={"Percentile"}
                              name3={""}
                              data={{
                                labels: chartdata.Label,
                                values: chartdata.data?.["TOTAL_STAFF"],
                                values2: chartdata.data?.["PERCENTILE"],
                              }}
                              tooltipformater={value => getRankSuffix(value)}
                              // color3={"#B7E1CD"}
                            /> */}
                            {/* <Barlinechart
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
                              lineName1="Percentile"
                              Name1={"Percentile"}
                              barcolor={"#B7E1CD"}
                              colors={['#E6DE32']}
                              data={{
                                  labels: chartdata.Label,
                                  values: chartdata.data?.["PERCENTILE"],
                              }}
                              xAxisName={selectedDimension.name}
                              xAxisNameGap={"30"}
                              xAxisNamePosition={"center"}
                              yAxisName={"Percentile of Rank"}
                              yAxisNameGap={"50"}
                              yAxisNamePosition={"middle"}
                              formatter={"{c}%"}
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
                              yaxisLabel={{
                                  show: true,
                                  formatter: "{value}",
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
                                  formatter: (params) => getRankSuffix(params.value),
                                  color: "#ffff",
                                  fontSize: 11
                              }}
                              itemstyle1={{
                                  borderRadius: [4, 4, 0, 0],
                                  color: "#EDC948"
                              }}
                              barWidth={65}
                              lineColor1={"#F8826B"}
                              tooltip={{
                                  Category: selectedDimension?.name,
                                  metric1: "Percentile",
                              }}
                              suffixth={true}
                            /> */}
                            <ReactEcharts
                              option={CustomChartConfig}
                              opts={{ renderer: 'svg' }}
                              style={{ width: '100%', height: '100%' }}
                            />
                            </LoaderContainer>
                          </div>
                          <div className="text-[#ffff] text-xs text-center mb-2">Percentile Rank by Role</div>
                          <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                            <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                            Data derived from Gallup Q12 Employee Engagement Survey. Percentiles refer to comparison to other K-12 education industries worldwide.
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
