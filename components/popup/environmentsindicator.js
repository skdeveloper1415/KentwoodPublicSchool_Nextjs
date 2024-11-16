"use client";
import { useState, useRef, useEffect, useMemo } from "react";
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
import Barlinechart from "../charts/barlinechart";
import { useDispatch, useSelector } from "react-redux";
import {fetchChronic_Absenteeism_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import { FormatNum } from "../utils";
import { ChartSplitLine } from "../utils";

export default function KeyIndicatorsPopup(props) {
  const { visible, onHide, value2,metric1} = props;
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

  const [selectedDimension, setselectedDimension] = useState({ name: "Student Group", code: "STUDENT_GROUP" });
  const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
  useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

  const Dimensions = [
    // { name: "New York", code: "NY" },
    // { name: "Rome", code: "RM" },
    // { name: "London", code: "LDN" },
    // { name: "Istanbul", code: "IST" },
    // { name: "Paris", code: "PRS" },

        // { name: "School Year", code: "School_Year" },
        { name: "Student Group", code: "STUDENT_GROUP" },
        // { name: "Ethnicity", code: "ETHNICITY" },
        // { name: "SPED", code: "SPED" },
        // { name: "Language", code: "LANGUAGE" },
        // { name: "Gender", code: "GENDER" },
        // { name: "Grade", code: "GRADE" },
  ];

/* redux state */
const Chronic_Absenteeism_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Chronic_Absenteeism_Popup_dimensionloading)
const Chronic_Absenteeism_Popup_dimension = useSelector(state => state.indicatorpopup.Chronic_Absenteeism_Popup_dimension)
/* */

/* API Calls */
const dispatch = useDispatch();

useEffect(()=>{
  if(selectedDimension && visible){
    dispatch(fetchChronic_Absenteeism_Popup_dimension({
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
    let data = Chronic_Absenteeism_Popup_dimension.reduce((acc, item) => {
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

    return { data: data, Label: Labels, ChartSplitLine: ChartSplitLine({y: SplitLine}) }
  }, [Chronic_Absenteeism_Popup_dimension])
/*  */

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
          className="custmDialog w-[80%] md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
          visible={visible}
          onHide={onHide}
        >
          <div>
            <div className="bg_bg_brand_neutral_100 grid grid-cols-12 flex items-center justify-between 2xl:gap-[1.563vw] gap-[20px] 3xl:gap-[1.25vw] 2xl:py-[0.833vw] py-3 2xl:px-[1.25vw] px-5">
              <div className="grid grid-cols-1 md:grid-cols-3 flex items-center col-span-12 md:col-span-4">
                <div className="col-span-1"><Image src={'/images/wce.png'} width={102} height={70} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw]" /></div>
                <div className="2xl:w-[16.094vw] col-span-2">
                  {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">PREMIER TEACHING</div> */}
                  <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold"><span className="font-normal">Whole-Child</span> Environments</div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals. </p>
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
                  <p>Chronic Absenteeism</p>
                </div>
              </div>
            </div>
            <ScrollPanel
               className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] w-full custm_ScrollPanel"
            >
              <div className="bg_blue_color_900 2xl:p-[1.25vw] p-5 2xl:space-y-[1.25vw] space-y-[20px]">
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-[1.25vw] gap-5">
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-12 md:col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            {/* Percentage of Absent */}
                            CY: 2023-24
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
                  {/* <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            Percentage of Absent
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                            Black or AA
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          44%
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
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                            Percentage of Absent
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                            White
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          40%
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
                  </div> */}
                </div>

                <div>
                  <ChartWrapper
                    formatDownloadedData={Chronic_Absenteeism_Popup_dimension}
                    formatFileName={"Chronic Absenteeism"}
                    ExportIcon={true}
                    titleshow={true}
                    title={
                      "Student Chronic Absenteeism - Missing 10 percent of School"
                    }
                    data={
                      <>
                        <div>

                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 my-3 2xl:gap-[1.25vw] gap-5">
                            {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                              <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">View By:</div>
                              <div>
                                <Dropdown value={selectedDimension} onChange={(e) => setselectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                  placeholder="Electrisity" className="w-full 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
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
                          <div className="h-[371px] xl:h-[19.323vw] max-md:w-[1000px]">
                            <LoaderContainer height={'100%'} loading={Chronic_Absenteeism_Popup_dimensionloading}>
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
                              lineName1="Chronic Absentee Students"
                              // Name1={"Percent of students"}
                              Name1={"Chronic Absenteeism Rate"}
                              barcolor={"#B7E1CD"}
                              colors={['#E6DE32']}
                              // data={{
                              //   labels: ["Asian", "Black or AA", "Hispanic", "Two or More", "White"],
                              //   values: ["16", "44", "79", "33", "40"],
                              //   values2: ["35", "35", "35", "35", "35"],
                              // }}
                              data={{
                                labels: ChartData.Label,
                                values: ChartData.data?.["CHRONIC_ABSENTEEISM_RATE"],
                                values2: ChartData.data?.["CHRONIC_ABSENTEE_STUDENTS"],
                            }}
                              xAxisName={selectedDimension.name}
                              xAxisNameGap={"30"}
                              xAxisNamePosition={"center"}
                              yAxisName={"Percent of students"}
                              yAxisNameGap={"40"}
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
                                // formatter: "{c}%",
                                formatter: (params) => FormatNum(params.value,1)+"%",
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
                                metric1: "Chronic Absenteeism Rate",
                                metric2: "Chronic Absentee Students"
                              }}
                              ChartSplitLine={ChartData?.ChartSplitLine}

                            />
                            </LoaderContainer>
                          </div>
                          </div>
                          <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                            <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                            Chronically absent students are defined as missing 10 percent or more possible days during the school year, and were enrolled in KPS for at least 10 consecutive days.</div>
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
