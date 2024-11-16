"use client";
import { useState, useRef, useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import ChartWrapper from "../chartwrapper";

import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from "primereact/dropdown";

import Linechartwithgradient from "../charts/linechartwithgradient";
import * as echarts from "echarts";

import BubbleChartSecond from "../charts/bubblechartsecond";
import CulturalBarChart from "../charts/culturalbarchart";
import CulturalBarChartSecond from "../charts/culturalbarchartsecond";
import Barlinechart from "../charts/barlinechart";
import { useDispatch, useSelector } from "react-redux";
import {fetchState_Assessment_Mathematics_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import { ChartSplitLine, FormatNum } from "../utils";

export default function CultureofExcellenceFourth(props) {
  const { visible, onHide, value2, metric1} = props;
  const lineChartData = {
    label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
    value: [5, 6, 5, 6, 7, 7, 8],
  };

  const [selectedDimension, setSelectedDimension] = useState({ name: "Student Group", code: "STUDENT_GROUP" });
  const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null)
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
const State_Assessment_Mathematics_Popup_dimensionloading = useSelector(state => state.indicatorpopup.State_Assessment_Mathematics_Popup_dimensionloading)
const State_Assessment_Mathematics_Popup_dimension = useSelector(state => state.indicatorpopup.State_Assessment_Mathematics_Popup_dimension)
/* */

/* API Calls */
const dispatch = useDispatch();

useEffect(()=>{
  if(selectedDimension && visible){
    dispatch(fetchState_Assessment_Mathematics_Popup_dimension({
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

/* */
const ChartData = useMemo(()=>{
  let SplitLine;
  let Labels = []
  let data = State_Assessment_Mathematics_Popup_dimension.reduce((acc,item)=>{
    let {[selectedDimension.code]:Dimension, STATEWIDE_AVERAGE, ...rest} = item
    SplitLine = STATEWIDE_AVERAGE;
    Object.entries(rest).forEach(([key,value])=>{
      if(!acc[key]){
        acc[key] = {[Dimension]:0}
        Labels.push(Dimension)
      }else {
        acc[key] = {...acc[key], [Dimension]: 0 }
      }
      acc[key][Dimension] += value
      Labels.push(Dimension)
    })

    return acc
  },{})

  // Labels = [...new Set(Labels)].sort()  //Sort the Data
  Labels = selectedDimension?.code == "STUDENT_GROUP" ? [...new Set(Labels)] : [...new Set(Labels)].sort()
  

  for (let Name in data){
      data[Name] = Labels.map(key => data[Name][key] || 0)
  }

  return {data: data, Label: Labels, ChartSplitLine: ChartSplitLine({y: SplitLine})}
},[State_Assessment_Mathematics_Popup_dimension])
/* */


  const BarCharData = {
    labels: ["department", "Administrators", "Paraprofessionals", "Teachers"],
    values: [
      {
        department: "2021",
        Administrators: 77,
        Paraprofessionals: 52,
        Teachers: 57,
      },
      {
        department: "2022",
        Administrators: 90,
        Paraprofessionals: 55,
        Teachers: 51,
      },
      {
        department: "2023",
        Administrators: 89,
        Paraprofessionals: 56,
        Teachers: 47,
      },
      {
        department: "2024",
        Administrators: 87,
        Paraprofessionals: 40,
        Teachers: 37,
      },
    ],
  };
  console.log("Excel Data",State_Assessment_Mathematics_Popup_dimension)
  const State_Assessment_Mathematics_Popup_dimensionExcelData = State_Assessment_Mathematics_Popup_dimension?.map((item) => {
    return {
      "Student_Group": item["STUDENT_GROUP"],
      "STUDENTS_ASSESSED": item["STUDENTS_ASSESSED"],
      "KPS_PROFICIENT": item["KPS_PROFICIENT"] + "%",
      "STATEWIDE_AVERAGE": item["STATEWIDE_AVERAGE"],
    }
  })
  return (
    <>
      <div>
        <Dialog
          header="Header"
          className="custmDialog w-[80%] md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
          visible={visible}
          onHide={onHide}
          blockScroll={true}
        >
          <div>
            <div className="bg_bg_brand_neutral_100 flex items-center justify-between 2xl:gap-[1.563vw] gap-5 2xl:py-[0.677vw] py-[13px] 2xl:px-[1.25vw] px-5">
              <div>
                <Image
                  src={"/images/Logo.png"}
                  width={102}
                  height={70}
                  alt="Equitable Opportunities & Outcome"
                  className="2xl:w-[5.313vw] 2xl:h-[3.646vw]"
                />
              </div>
              <div className="2xl:w-[16.094vw] w-[300px]">
                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">
                  PREMIER TEACHING
                </div> */}
                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold">
                  <span className="font-normal">Culture of</span> Excellence
                </div>
              </div>
              <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                <p>
                Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.

                </p>
              </div>
            </div>
            <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4   2xl:h-[3.125vw] h-[65px] xl:h-[55px]">
              <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center">
                <i className="ru-arrow-down"></i>
              </div>
              <div className="text-[16px] xl:text-[0.885vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm">
                  <i className="ru-dots"></i>
                </div>
                <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]">
                  <p> M-STEP State Assessment Mathematics</p>
                </div>
              </div>
            </div>
            <ScrollPanel
               className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] w-full custm_ScrollPanel"
            >
              <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw]  2xl:space-y-[1.25vw] space-y-[20px]">
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:gap-[1.25vw] gap-5">
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px] flex items-center">
                        <div className="text-[#9CA1AB] 2xl:text-[0.833vw] font-medium leading-5 2xl:leading-[1.042vw]">
                          CY: 2023-24
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw]  font-medium leading-3 2xl:leading-[1.25vw]">
                            {metric1}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mt-4">
                          {value2}
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
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px] flex items-center">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                          AY: 2023
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          165
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
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px] flex items-center">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                          AY: 2022
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                          187
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
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

                <div>
                  <ChartWrapper
                    formatDownloadedData={State_Assessment_Mathematics_Popup_dimensionExcelData}
                    formatFileName={"M-STEP State Assessment Mathematics"}
                    ExportIcon={true}
                    titleshow={true}
                    title={"M-STEP State Assessment Mathematics"}
                    data={
                      <>
                        <div>
                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 my-3 2xl:gap-[1.25vw] gap-5">
                            {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                              <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">
                                View By:
                              </div>
                              <div>
                                <Dropdown
                                  value={selectedDimension}
                                  onChange={(e) => setSelectedDimension(e.value)}
                                  options={Dimensions}
                                  optionLabel="name"
                                  placeholder="Select Dimension"
                                  className="w-[200px]  2xl:w-[11.198vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown"
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

                          <div className="overflow-auto">
                          <div className="h-[255px] xl:h-[21.185vw] 2xl:h-[17.385vw] 3xl:h-[15.385vw] max-md:w-[1000px]">
                          <LoaderContainer height={'100%'} loading={State_Assessment_Mathematics_Popup_dimensionloading}>
                                                      <Barlinechart
                                                        legends={{
                                                            show: false,
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
                                                        lineName1="Students Assessed"
                                                        // Name1={"Percent of students Proficient"}
                                                        Name1={"KPS Proficient"}
                                                        barcolor={"#EDC948"}
                                                        colors={['#F8826B']}
                                                        // data={{
                                                        //     labels: ["Male", "Female", "Others"],
                                                        //     values: ["48", "61", "30",],
                                                        //     values2: ["61", "61", "61", ],
                                                        // }}
                                                        data={{
                                                              labels: ChartData.Label,
                                                              values2: ChartData.data?.["STUDENTS_ASSESSED"],
                                                              values: ChartData.data?.["KPS_PROFICIENT"],
                                                          }}
                                                        xAxisName={selectedDimension.name}
                                                        xAxisNameGap={"30"}
                                                        xAxisNamePosition={"center"}
                                                        yAxisName={"Percent of students Proficient"}
                                                        yAxisNameGap={"60"}
                                                        yAxisNamePosition={"middle"}
                                                        yAxisName1={"Percent of students Proficient"}
                                                        yAxisNameGap1={"40"}
                                                        yAxisNamePosition1={"middle"}
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
                                                        // interval={10}
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
                                                        yaxisLabel1={{
                                                          show: false,
                                                          formatter: "{value}%",
                                                          color: '#E5E7EB',
                                                          fontSize: 12
                                                        }}
                                                        yaxisLine1={{
                                                            show: true,
                                                            lineStyle: {
                                                                color: "#374151"
                                                            }
                                                        }}
                                                        // yaxisSplitlines1={{
                                                        //     show: true,
                                                        //     lineStyle: {
                                                        //         type: 'dashed',
                                                        //         color: '#344054',
                                                        //     }
                                                        // }}
                                                        label1={{
                                                            show: true,
                                                            position: "top",
                                                            formatter: params => FormatNum(params.value, 1) + "%",
                                                            color: "#ffff",
                                                            fontSize: 11
                                                        }}
                                                        itemstyle1={{
                                                            borderRadius: [4, 4, 0, 0],
                                                            color: "#EDC948"
                                                        }}
                                                        tooltip={{
                                                          Category: selectedDimension?.name,
                                                          metric1: "Percent Proficient",
                                                          metric2: "Students Assessed"
                                                        }}
                                                        barWidth={65} 
                                                        ChartSplitLine={ChartData?.ChartSplitLine}
                                                        />
                                                        
                                                        </LoaderContainer>
                                                    </div>


                            <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                              <Image
                                src="/images/info_icon.svg"
                                alt="info"
                                width={17}
                                height={17}
                              />
                            Data is for grades 3-7. M-STEP is not administered in grade 8
                            </div>
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
