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
import { useDispatch, useSelector } from "react-redux";
import {fetchAssessment_Mathematics_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";

export default function CultureofExcellenceKeyIndicatorsSecond(props) {
  const { visible, onHide,value2, metric1} = props;
  const lineChartData = {
    label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
    value: [5, 6, 5, 6, 7, 7, 8],
  };

  const [selectedDimension, setselectedDimension] = useState({ name: "School", code: "SCHOOL"});
  const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null)
  useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

  const Dimensions = [
    // { name: "New York", code: "NY" },
    // { name: "Rome", code: "RM" },
    // { name: "London", code: "LDN" },
    // { name: "Istanbul", code: "IST" },
    // { name: "Paris", code: "PRS" },

    // { name: "School Year", code: "School_Year" },
    { name: "School", code: "SCHOOL" },
    // { name: "Ethnicity", code: "ETHNICITY" },
    // { name: "SPED", code: "SPED" },
    // { name: "Language", code: "LANGUAGE" },
    // { name: "Gender", code: "GENDER" },
    // { name: "Grade", code: "GRADE" },
  ];

/* redux state */
const Assessment_Mathematics_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Assessment_Mathematics_Popup_dimensionloading)
const Assessment_Mathematics_Popup_dimension = useSelector(state => state.indicatorpopup.Assessment_Mathematics_Popup_dimension)
/* */

/* API Calls */
const dispatch = useDispatch();
useEffect(()=>{
  if(selectedDimension && visible){
    dispatch(fetchAssessment_Mathematics_Popup_dimension({
      "elasticQueryName": "",
      "filters":  selectedYear ? [
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

  let data = Assessment_Mathematics_Popup_dimension
  ?.filter(item => item[selectedDimension.code])
  .reduce((acc,item)=>{
    let {KPS_AVERAGE, PERFORMANCE_RELATIVE, [selectedDimension.code]:Dimension} = item
    // acc.push([[KPS_AVERAGE,PERFORMANCE_RELATIVE,4000,Dimension,Dimension]])
    acc.push({value: [PERFORMANCE_RELATIVE,KPS_AVERAGE], name: Dimension})
    return acc
  },[])

  return {data:data}
},[Assessment_Mathematics_Popup_dimension])
/*  */

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
  return (
    <>
      <div>
        <Dialog
          header="Header"
          className="custmDialog w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
          visible={visible}
          onHide={onHide}
        >
          <div>
            <div className="bg_bg_brand_neutral_100 flex items-center justify-between 2xl:gap-[1.563vw] gap-52 xl:py-[0.677vw] py-[13px] 2xl:px-[1.25vw] px-5">
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
            <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4    2xl:h-[3.125vw] h-[65px] xl:h-[55px]">
              <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center">
                <i className="ru-arrow-down"></i>
              </div>
              <div className="text-[16px] xl:text-[0.885vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm">
                  <i className="ru-dots"></i>
                </div>
                <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]">
                  <p> i-Ready Benchmark Assessment - Mathematics</p>
                </div>
              </div>
            </div>
            <ScrollPanel
               className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] w-full custm_ScrollPanel"
            >
              <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                <div className="grid grid-cols-3 2xl:gap-[1.25vw] gap-5">
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
                    formatDownloadedData={Assessment_Mathematics_Popup_dimension}
                    formatFileName={"i-Ready Benchmark Assessment - Mathematics"}
                    ExportIcon={true}
                    titleshow={true}
                    title={"i-Ready Benchmark Assessment - Mathematics "}
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
                                  onChange={(e) => setselectedDimension(e.value)}
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

                          <div>
                            <div className="h-[400px] xl:h-[20.323vw]">
                              <LoaderContainer height={'100%'} loading={Assessment_Mathematics_Popup_dimensionloading}>
                                <BubbleChartSecond
                                data={ChartData.data}
                                tooltip={{Category: selectedDimension?.name}}
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
                              Data represent student growth from Fall 2023 to
                              Spring 2024 for grades K-8
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
