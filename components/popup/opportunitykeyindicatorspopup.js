"use client";
import { useState, useRef } from "react";
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

export default function OpportunityKeyIndicatorsPopup(props) {
  const { visible, onHide } = props;
  const lineChartData = {
    label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
    value: [5, 6, 5, 6, 7, 7, 8],
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
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
                <Image src={'/images/eoo.png'} width={102} height={70} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw]" />
              </div>
              <div className="2xl:w-[16.094vw] w-[300px]">
                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">PREMIER TEACHING</div> */}
                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold"><span className="font-normal">Equitable</span> Opportunities & Outcomes</div>
              </div>
              <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals...</p>
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
                  <p>Freshman on Track</p>
                </div>
              </div>
            </div>
            <ScrollPanel
              className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[33.458vw] w-full custm_ScrollPanel"
            >
              <div className="bg_blue_color_900 p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                <div className="grid grid-cols-3 2xl:gap-[1.25vw] gap-5">
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                          Percentage of Grade 9
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                          CY: 2023-24
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                        95%
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
                          {/* LY Var: <span className="text-[#31C48D]">30%</span> */}
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
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                          Percentage of Grade 9
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                          Year 2022-2023
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                        85%
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
                          {/* LY Var: <span className="text-[#31C48D]">10%</span> */}
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
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                      <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div>
                          <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                          Percentage of Grade 9
                          </div>
                          <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                          Year 2021-2022
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                        82%
                        </div>
                        <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-normal uppercase">
                          {/* LY Var: <span className="text-[#31C48D]">30%</span> */}
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
                </div>

                <div>
                  <ChartWrapper
                    ExportIcon={true}
                    titleshow={true}
                    title={"Freshman on Track Students Passing Grade 9 - 2023-24"}
                    data={
                      <>
                        <div>

                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 my-3 2xl:gap-[1.25vw] gap-5">
                            <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">Viewed By:</div>
                            <div>
                              <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                placeholder="Select a City" className="w-[200px]  2xl:w-[11.198vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
                            </div>
                            </div>
                          </div>


                          <div className="h-[371px] xl:h-[19.323vw]">
                            <MultiplebarChart
                              data={BarCharData}
                              xAxisName={"Percentile Rank by Role - Year"}
                              xAxisNameGap={"30"}
                              xAxisNamePosition={"middle"}
                              yAxisName={"Percentile Rank"}
                              yAxisNameGap={"30"}
                              yAxisNamePosition={"middle"}
                              min={0}
                              max={90}
                              legend={{
                                bottom: 0,
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
                              color3={"#B7E1CD"}
                            />
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
