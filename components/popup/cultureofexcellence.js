"use client";
import { useState, useRef } from "react";
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

export default function CultureofExcellence(props) {
  const { visible, onHide } = props;

  const events = [
    { status: 'Ordered', date: 'Jun 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-ordered' },
    { status: 'Processing', date: 'Dec 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
    { status: 'Shipped', date: 'Jun 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
    { status: 'Ordered', date: 'Dec 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
    { status: 'Ordered', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
    { status: 'Shipped', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
    { status: 'Shipped', date: 'Jun 2026', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
  ];

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  const lineChartData = {
    label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
    value: [5, 6, 5, 6, 7, 7, 8,]
  }

  return (
    <>
      <div>
        <Dialog header="Header"
          className="custmDialog  w-[80%] md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
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
                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals...</p>
              </div>
            </div>
            <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4   2xl:h-[3.125vw] h-[65px] xl:h-[55px]">
              <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>
              <div className="text-[16px] xl:text-[0.885vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                <div className="white_text_color  text-[16px] xl:text-[16px] 2xl:text-[0.885vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Ensure equitable access to resources and opportunities in each school building</p></div>
              </div>
            </div>
            <ScrollPanel  className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] custm_ScrollPanel">
              <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                {/*col*/}
                <div className="border border_color_interface-stroke-default 2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3 2xl:space-y-[1.25vw] space-y-[20px] rounded-[0.417vw]">
                  {/*col*/}
                  <div className="white_text_color flex flex-wrap items-center justify-between 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.938vw]">
                    <div>Plan Of Action</div>
                    <div>Duration : Jun 23- May 26</div>
                  </div>
                  {/*col*/}
                  <div className="w-full overflow-auto">
                    <Timeline value={events} align="top" layout="horizontal" className="CustomTimeline"
                      content={(item) => (
                        <div className={item.className}>
                          <div className="flex items-start flex-col 2xl:gap-[0.625vw] gap-2.5">
                            <div className="flex items-center 2xl:gap-[0.417vw] gap-1.5">
                              <div><div className="white_text_color text-sm 2xl:text-[0.729vw] font-medium">{item.date}</div></div>
                              <div className="bg_brown_primary_950 text_lightBrown_300 2xl:rounded-[0.208vw] 2xl:p-[0.313vw] text_lightBrown_300 2xl:text-[0.625vw] font-normal 2xl:leading-[0.833vw] leading-4 text-xs datesubno"><p>{item.datesubno}</p></div>
                            </div>
                            <div className="2xl:space-y-[0.208vw] space-y-1">
                              <div className="bgdark_Blue_color_700 2xl:p-[0.417vw] p-1.5 white_text_color text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw] 2xl:rounded-[0.208vw] initiative">{item.initiative}</div>
                              <div className="bgdark_Blue_color_700 2xl:p-[0.417vw] p-1.5 white_text_color text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw] 2xl:rounded-[0.208vw] initiative initiativetow">{item.initiative}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      marker={(item) => (
                        <i className={`p-timeline-event-icon ${item.icon} ${item.className}`} style={{ color: item.color }}></i>
                      )}
                    />
                  </div>
                </div>
                {/*col*/}
                <div className="grid grid-cols-2 2xl:gap-[1.25vw] gap-5">
                  {/*col*/}
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3  2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3 bg-[#111928] rounded-[4px] px-[0.833vw] pt-[0.833vw]">
                      <div className="col-span-8 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div className="text-[#9CA1AB] 2xl:text-[0.833vw] font-medium leading-5 2xl:leading-[1.042vw]">CY 2024 - Overall</div>
                        <div className="flex items-center justify-between">
                          <div className="">
                            <div className="text-[#FFFFFF] 2xl:text-[1.25vw] font-bold leading-3 2xl:leading-[1.25vw]">55%</div>
                            {/* <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-medium uppercase">LY Var: <span className="text-[#31C48D]">10%</span></div> */}
                          </div>
                          <div className="h-[25px] 3xl:h-[1.563vw]">
                            <Linechartwithgradient
                              grid={{
                                top: 0,
                                left: 5,
                                right: 10,
                                bottom: 0,
                                containLabel: true
                              }}
                              lineStyle={{ color: '#31C48D', width: 1.5 }}
                              areaStyle={{
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  {
                                    offset: 0.9,
                                    color: '#31C48D00'
                                  },
                                  {
                                    offset: 0.5,
                                    color: '#31C48D42'
                                  }
                                ])
                              }}
                              data={lineChartData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 h-[100px]">
                        <Gaugechart
                          backstartAngle={180}
                          backendAngle={0}
                          backaxisLine={{
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
                          frontendAngle={20}
                          frontaxisLine={{
                            lineStyle: {
                              width: 20,
                              color: [
                                [0.2, "#D68228"],
                                [0.6, "#D68228"],
                                [0.8, "rgba(214, 130, 40, 1)"],
                              ],
                            },
                          }}
                          data={[{ value: 70, },]}
                        />
                      </div>
                    </div>
                    {/*col*/}
                    <div className="h-[161px] xl:h-[8.385vw]">
                      <HorizontalStackBarChart
                        legend={{
                          left: 40,
                          bottom: 0,
                          textStyle: {
                            fontSize: 10,
                            color: "#FFFFFF",
                          },
                          itemWidth: 9,
                          itemHeight: 9,
                        }}
                        grid={{
                          top: 0,
                          left: 20,
                          right: 30,
                          bottom: 25,
                          containLabel: true
                        }}
                        min={10}
                        max={60}
                        xAxisLabel={{
                          show: true,
                          fontSize: 12,
                          color: '#fff',
                          formatter: '{value}%'
                        }}
                        xAxisSplitLine={{
                          show: true,
                          lineStyle: {
                            type: "dashed",
                            color: "#504843"
                          }
                        }}
                        yAxisLabel={{
                          color: "#fff",
                          fontSize: 12
                        }}
                        yAxisTick={{ show: false }}
                        yAxisLine={{
                          show: true,
                          lineStyle: {
                            color: "#47403C",
                          }
                        }}
                        yAxisdata={['1.1.3', '1.1.2', '1.1.1']}
                        barWidth={15}
                        name={'Done'}
                        name2={'InProgress'}
                        name3={'Not Started'}
                        label={{ show: false }}
                        itemStyle={{
                          color: '#498E71',
                          borderRadius: 0
                        }}
                        itemStyle2={{
                          color: '#335D76',
                          borderRadius: 0
                        }}
                        itemStyle3={{
                          color: '#72685C',
                          borderRadius: 0
                        }}
                        data={[12, 15, 20]}
                        data1={[5, 15, 8]}
                        data2={[45, 30, 32]}
                      />
                    </div>
                    {/*col*/}
                  </div>
                  {/*col*/}
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3 bg-[#111928] rounded-[4px] p-[0.833vw]">
                      <div className="col-span-8 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div className="text-[#9CA1AB] 2xl:text-[0.833vw] font-medium leading-5 2xl:leading-[1.042vw]">CY 2024 - Overall</div>
                        <div className="flex items-center justify-between">
                          <div className="">
                            <div className="text-[#FFFFFF] 2xl:text-[1.25vw] font-bold leading-3 2xl:leading-[1.25vw]">45%</div>
                            {/* <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-medium uppercase">LY Var: <span className="text-[#31C48D]">10%</span></div> */}
                          </div>
                          <div className="h-[25px] 3xl:h-[1.563vw]">
                            <Linechartwithgradient
                              grid={{
                                top: 0,
                                left: 5,
                                right: 10,
                                bottom: 0,
                                containLabel: true
                              }}
                              lineStyle={{ color: '#31C48D', width: 1.5 }}
                              areaStyle={{
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                  {
                                    offset: 0.9,
                                    color: '#31C48D00'
                                  },
                                  {
                                    offset: 0.5,
                                    color: '#31C48D42'
                                  }
                                ])
                              }}
                              data={lineChartData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-4 h-[100px] w-full">
                        <Gaugechart
                          backstartAngle={180}
                          backendAngle={0}
                          backaxisLine={{
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
                          frontendAngle={20}
                          frontaxisLine={{
                            lineStyle: {
                              width: 20,
                              color: [
                                [0.2, "#D68228"],
                                [0.6, "#D68228"],
                                [0.8, "rgba(214, 130, 40, 1)"],
                              ],
                            },
                          }}
                          data={[{ value: 70, },]}
                        />
                      </div>
                    </div>
                    {/*col*/}
                    <div className="h-[161px] xl:h-[8.385vw]">
                      <HorizontalStackBarChart
                        legend={{
                          left: 40,
                          bottom: 0,
                          textStyle: {
                            fontSize: 10,
                            color: "#FFFFFF",
                          },
                          itemWidth: 9,
                          itemHeight: 9,
                        }}
                        grid={{
                          top: 0,
                          left: 20,
                          right: 30,
                          bottom: 25,
                          containLabel: true
                        }}
                        min={10}
                        max={60}
                        xAxisLabel={{
                          show: true,
                          fontSize: 12,
                          color: '#fff',
                          formatter: '{value}%'
                        }}
                        xAxisSplitLine={{
                          show: true,
                          lineStyle: {
                            type: "dashed",
                            color: "#504843"
                          }
                        }}
                        yAxisLabel={{
                          color: "#fff",
                          fontSize: 12
                        }}
                        yAxisTick={{ show: false }}
                        yAxisLine={{
                          show: true,
                          lineStyle: {
                            color: "#47403C",
                          }
                        }}
                        yAxisdata={['1.1.3', '1.1.2', '1.1.1']}
                        barWidth={15}
                        name={'Done'}
                        name2={'InProgress'}
                        name3={'Not Started'}
                        label={{ show: false }}
                        itemStyle={{
                          color: '#498E71',
                          borderRadius: 0
                        }}
                        itemStyle2={{
                          color: '#335D76',
                          borderRadius: 0
                        }}
                        itemStyle3={{
                          color: '#72685C',
                          borderRadius: 0
                        }}
                        data={[12, 15, 20]}
                        data1={[5, 15, 8]}
                        data2={[45, 30, 32]}
                      />
                    </div>
                    {/*col*/}
                  </div>
                  {/*col*/}
                </div>
                {/*col*/}
                <div>
                  <ChartWrapper
                    ExportIcon={true}
                    data={
                      <>
                        <div>
                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 2xl:mt-[0.417vw] mt-1.5">
                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw]">Choose Sub Initiatives:</div>
                            <div>
                              <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                placeholder="Select a City" className="w-full md:w-[309px] 2xl:w-[18.229vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
                            </div>
                          </div>
                          <div className="h-[371px] xl:h-[19.323vw]">
                            <VerticalStackBarChart
                              legend={{
                                left: 20,
                                bottom: 10,
                                textStyle: {
                                  fontSize: 10,
                                  color: "#FFFFFF",
                                },
                                itemWidth: 9,
                                itemHeight: 9,
                              }}
                              grid={{
                                top: 30,
                                left: 30,
                                right: 30,
                                bottom: 50,
                                containLabel: true
                              }}
                              min={0}
                              max={100}
                              yAxisName={'Percent %'}
                              xAxisName={'Year'}
                              AxisnameStyle={{
                                color: "#fff",
                                fontSize: 10
                              }}
                              yAxisLabel={{
                                show: true,
                                fontSize: 10,
                                color: '#fff',
                                formatter: '{value}%'
                              }}
                              yAxisSplitLine={{
                                show: true,
                                lineStyle: {
                                  type: "dashed",
                                  color: "#504843"
                                }
                              }}
                              xAxisLabel={{
                                color: "#fff",
                                fontSize: 10
                              }}
                              xAxisTick={{ show: false }}
                              yAxisLine={{
                                show: true,
                                lineStyle: {
                                  color: "#47403C",
                                }
                              }}
                              xAxisdata={['2023', '2023', '2023', '2024', '2024', '2024']}
                              barWidth={50}
                              name={'Done'}
                              name2={'InProgress'}
                              name3={'Not Started'}
                              label={{ show: false }}
                              itemStyle={{
                                color: '#498E71',
                                borderRadius: 0
                              }}
                              itemStyle2={{
                                color: '#335D76',
                                borderRadius: 0
                              }}
                              itemStyle3={{
                                color: '#7A3033',
                                borderRadius: 0
                              }}
                              data={[30, 40, 60, 30, 20, 40]}
                              data1={[40, 50, 20, 30, 20, 20]}
                              data2={[30, 10, 20, 40, 60, 40]}
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
