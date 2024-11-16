"use client";
import { useState, useRef, useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchEquitable_Initiative_popup_dimension_1, fetchEquitable_Initiative_popup_dimension_2,
  fetchEquitable_Opportunity_Plan_of_Action
} from "../../redux/slices/popup";
import { FormatNum } from "../utils";
import LoaderContainer from "../LoaderContainer";

export default function EquitableOpportunitiesOutcome(props) {
  const { visible, onHide, TileName, TopTiledata, TopBardata, TopBarLabel, Tile, downloaddata } = props;

  // const events = [
  //   { status: 'Ordered', date: 'Jun 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-ordered' },
  //   { status: 'Processing', date: 'Dec 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', initiative1: 'Initiative 1.1.2', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
  //   { status: 'Shipped', date: 'Jun 2024', datesubno: '1.2', initiative: 'Initiative 1.3.2', initiative1: 'Initiative 1.3.2', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
  //   { status: 'Ordered', date: 'Dec 2024', datesubno: '1.1', initiative: 'Initiative 1.3.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
  //   { status: 'Ordered', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.3.2', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
  //   { status: 'Shipped', date: 'Jun 2025', datesubno: '1.3', initiative: 'Initiative 1.3.3', initiative1: 'Initiative 1.3.4', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
  //   { status: 'Shipped', date: 'Jun 2026', datesubno: '1.4', initiative: 'Initiative 1.4.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
  // ];

  const [selectedDimension, setselectedDimension] = useState({name: "School Year", code: "School_Year"});
  const Dimensions = [
    // { name: 'New York', code: 'NY' },
    // { name: 'Rome', code: 'RM' },
    // { name: 'London', code: 'LDN' },
    // { name: 'Istanbul', code: 'IST' },
    // { name: 'Paris', code: 'PRS' }
    {name: "School Year", code: "School_Year"}
  ];

  const lineChartData = {
    label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
    value: [5, 6, 5, 6, 7, 7, 8,]
  }

  /* Redux States */
  const Equitable_Initiative_popup_dimension_1loading = useSelector(state => state.popup.Equitable_Initiative_popup_dimension_1loading)
  const Equitable_Initiative_popup_dimension_1 = useSelector(state => state.popup.Equitable_Initiative_popup_dimension_1)

  const Equitable_Initiative_popup_dimension_2loading = useSelector(state => state.popup.Equitable_Initiative_popup_dimension_2loading)
  const Equitable_Initiative_popup_dimension_2 = useSelector(state => state.popup.Equitable_Initiative_popup_dimension_2)

  const Equitable_Opportunity_Plan_of_Actionloading = useSelector(state => state.popup.Equitable_Opportunity_Plan_of_Actionloading)
  const Equitable_Opportunity_Plan_of_Action = useSelector(state => state.popup.Equitable_Opportunity_Plan_of_Action)
  /*  */

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    setIsAuthenticated(JSON?.parse(sessionStorage.getItem("isAuthenticated")))
  },[JSON?.parse(sessionStorage.getItem("isAuthenticated"))])

  /* API Calls */
  const dispatch = useDispatch()
  useEffect(()=>{
    if(selectedDimension && visible){
      if (Tile == 1){
        dispatch(fetchEquitable_Initiative_popup_dimension_1({
          "elasticQueryName": "",
          "filters": [],
          "dynamicColumns": [
            {
              "columnName": "#{dimension1}",
              "columnValue": `"${selectedDimension.code}"`,
              "excludeKeyword": false
            }
          ],
        }))
      } else if (Tile == 2){
        dispatch(fetchEquitable_Initiative_popup_dimension_2({
            "elasticQueryName": "",
            "filters": [],
            "dynamicColumns": [
              {
                "columnName": "#{dimension1}",
                "columnValue": `"${selectedDimension.code}"`,
                "excludeKeyword": false
              }
            ],
        }))
      }
    }
  },[visible, selectedDimension, Tile])

  useEffect(()=>{
    if (visible){
      dispatch(fetchEquitable_Opportunity_Plan_of_Action({
        "elasticQueryName": "",
          "filters": [],
          "dynamicColumns": [],
      }))
    }
  },[visible])
  /*  */

  /*  */
  const [activeTileBarData,setactiveTileBarData] = useState([])
  useEffect(()=>{
    if(selectedDimension){
      if (Tile == 1){
        setactiveTileBarData(Equitable_Initiative_popup_dimension_1)
      } else if (Tile == 2){
        setactiveTileBarData(Equitable_Initiative_popup_dimension_2)
      }
    }
  },[selectedDimension, Tile, Equitable_Initiative_popup_dimension_1, Equitable_Initiative_popup_dimension_2])

  const ChartbyBoard = useMemo(()=>{
    let Labels = []
    let data = activeTileBarData.reduce((acc,item)=>{
      let {[selectedDimension?.code]: Dimension,Status,Board,VALUE} = item
      if (!acc[Board]){
        acc[Board] = {[Status]:{[Dimension]:0}}
        Labels[Board] = [Dimension]
      } else if (acc[Board] && !acc[Board][Status]){
        acc[Board] = {...acc[Board],[Status]: {[Dimension]: 0}}
        Labels[Board].push(Dimension)
      } else if (!acc[Board][Status][Dimension]){
        acc[Board][Status] = {...acc[Board][Status],[Dimension]: 0}
        Labels[Board].push(Dimension)
      }
      acc[Board][Status][Dimension] += VALUE || 0
      return acc
    },{})

    for (let key in Labels) {
      Labels[key] = [...new Set(Labels[key])].sort()
    }

    for (let Board in data){
      for (let status in data[Board]){
        data[Board][status] = Labels[Board].map(key => data[Board][status][key] || 0)
      }
    }

    return {data: data, Label: Labels}
  },[activeTileBarData])
  /*  */

  /* CallBacks */
  const [activeTabBoard,setactiveTabBoard] = useState(0)
  const getActiveTabBoard = (name) => {
    setactiveTabBoard(name)
  }
  /* */

  /* TimeLine Eveents */
const events = useMemo(()=>{
  let array_len = Equitable_Opportunity_Plan_of_Action.length
  let Initiative = {}
  let data = Equitable_Opportunity_Plan_of_Action.reduce((acc,item,index)=>{
  
    if (!acc?.[item['DURATION']]) {
      acc[item['DURATION']] = {[item['YEAR']]:0};
    } else if  (acc[item['DURATION']] && !acc[item['DURATION'][item['YEAR']]]) acc[item['DURATION']] = {...acc[item['DURATION']],[item['YEAR']]:0}

    if (!Initiative?.[item['YEAR']]) Initiative[item['YEAR']] = [{Board: item?.['BOARD'], DESCRIPTION: item?.DESCRIPTION}]
    else Initiative?.[item['YEAR']].push({Board: item?.['BOARD'], DESCRIPTION: item?.DESCRIPTION})

    return acc
  },{})

  let index = 0;
  let events = {}
  for (let range in data){
    events[range] = []
    for (let date in data[range]){
      let Boards = [...new Set(Initiative?.[date])]?.filter(item => item?.Board)
      let value = {
          status: index == 0 ? 'Ordered' : index == array_len - 1 ? 'Shipped' : 'Processing',
          date: date,
          datesubno: Boards.length != 0
            ? Boards[0]?.Board?.replace('Initiative ', '')?.slice(0, 3)
            : null,
          initiative: Boards,
          icon: index == 0 ? 'ru-flag' :  Boards.length != 0 ? 'ru-flag' : 'ru-dots',
          color: 'var(--white_text_color)',
          className: index == 0 ? "event-flagIconstart" : Boards.length != 0
            ? 'event-flagIcon'
            : 'event-ordered'
            // : 'event-initiative-show',
          // Description: item?.Description,
        };
      events[range].push(value)
      index+=1
    }
  }

  return events
},[Equitable_Opportunity_Plan_of_Action])
/*  */

  return (
    <>
      <div>
        <Dialog header="Header"
          className=" custmDialog  w-[80%] md:w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
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
                {/* <p>Each initiative represents the initiative KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals...</p> */}
                <p>Each initiative represents the progress KPS is tracking throughout the implementation of the strategic plan. This corresponds to one of the four strategic plan goals.</p>
              </div>
            </div>
            <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4   2xl:h-[3.125vw] md:h-[65px] xl:h-[55px]">
              <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] md:h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>
              <div className="text-[16px] xl:text-[0.885vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                {/* <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Ensure equitable access to resources and opportunities in each school building</p></div> */}
                <div className="white_text_color text-[16px] xl:text-[16px] 2xl:text-[0.885vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>{TopTiledata?.TITLE || ""}</p></div>
              </div>
            </div>
            <ScrollPanel  className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] custm_ScrollPanel">
              <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                {/*col*/}
                <div className="border border_color_interface-stroke-default 2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3 2xl:space-y-[1.25vw] space-y-[20px] rounded-[0.417vw]">
                  {/*col*/}
                  <div className="white_text_color flex flex-wrap items-center justify-between 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.938vw]">
                    <div>Plan Of Action</div>
                    {/* <div>Duration : Jun 23- May 26</div> */}
                    <div>Duration : {events ? Object.keys(events)[0] : '-'}</div>
                  </div>
                  {/*col*/}
                  <div className="w-full overflow-auto">
                    <LoaderContainer loading={Equitable_Opportunity_Plan_of_Actionloading}  width={"100%"} height={'10rem'}>
                    <Timeline value={events ? Object.values(events)[0] : []} align="top" layout="horizontal" className="CustomTimeline"
                      content={(item, index) => (
                        <div className={item?.className}>
                          <div className="flex items-start flex-col 2xl:gap-[0.625vw] gap-2.5">
                            <div className="flex items-center 2xl:gap-[0.417vw] gap-1.5">
                              <div><div className="white_text_color text-sm 2xl:text-[0.729vw] font-medium">{item?.date}</div></div>
                              {Boolean(index || item?.datesubno) &&<div className="bg_brown_primary_950 text_lightBrown_300 2xl:rounded-[0.208vw] 2xl:p-[0.313vw] text_lightBrown_300 2xl:text-[0.625vw] font-normal 2xl:leading-[0.833vw] leading-4 text-xs datesubno"><p>{item?.datesubno}</p></div>}
                            </div>
                            {/* <div className="2xl:space-y-[0.208vw] space-y-1">
                              <div className="bgdark_Blue_color_700 2xl:p-[0.417vw] p-1.5 white_text_color text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw] 2xl:rounded-[0.208vw] initiative">{item?.initiative}</div>
                              <div className="bgdark_Blue_color_700 2xl:p-[0.417vw] p-1.5 white_text_color text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw] 2xl:rounded-[0.208vw] initiative initiativetow">{item?.initiative1}</div>
                            </div> */}
                            {item?.initiative.length != 0 && <div className="2xl:space-y-[0.208vw] space-y-1">
                              {item?.initiative?.map(item =>
                                <div className="bgdark_Blue_color_700 2xl:p-[0.417vw] p-1.5 white_text_color text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw] 2xl:rounded-[0.208vw] initiative cursor-pointer" title={item?.DESCRIPTION}>{item?.Board}</div>
                              )}
                            </div>}
                          </div>
                        </div>
                      )}
                      marker={(item) => (
                        <i className={`p-timeline-event-icon ${item?.icon} ${item?.className}`} style={{ color: item?.color }}></i>
                      )}
                    />
                    <div className="flex flex-nowrap gap-2 mb-4">
                      <div className="flex flex-nowrap gap-1 text-white text-xs items-center">
                        <i className="p-timeline-event-icon ru-flag event-flagIconstart !w-[1.3rem] !h-[1.3rem] scale-75" style={{color: 'var(--white_text_color)'}}/>
                        Initiative Start
                      </div>
                      <div className="flex flex-nowrap gap-1 text-white text-xs items-center">
                        <i className="p-timeline-event-icon ru-dots event-ordered !w-[1.3rem] !h-[1.3rem] scale-75" style={{color: 'var(--white_text_color)'}}/>
                        Initiative In Progress
                      </div>
                      <div className="flex flex-nowrap gap-1 text-white text-xs items-center">
                        <i className="p-timeline-event-icon ru-flag event-flagIcon !w-[1.3rem] !h-[1.3rem] scale-75" style={{color: 'var(--white_text_color)'}}/>
                        Initiative End
                      </div>
                    </div>
                    </LoaderContainer>
                  </div>
                </div>
                {/*col*/}
                <div className="grid grid-cols-1 2xl:gap-[1.25vw] gap-5">
                  {/*col*/}
                  <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl  2xl:pt-[0.833vw] pt-3 2xl:px-[0.833vw]  px-3 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 bg-[#111928] rounded-[4px] pt-[0.833vw] px-[0.833vw]">
                      <div className="col-span-8 2xl:space-y-[0.833vw] space-y-[14px]">
                        <div className="text-[#9CA1AB] 2xl:text-[0.833vw] font-medium leading-5 2xl:leading-[1.042vw]">{TopTiledata?.YEAR ? `CY ${TopTiledata?.YEAR} - Overall`:"-"}</div>
                        <div className="flex items-center justify-between">
                          <div className="">
                            <div className="text-[#FFFFFF] 2xl:text-[1.25vw] font-bold leading-3 2xl:leading-[1.25vw]">{`${TopTiledata?.DONE_PER?.toFixed(1) || "-"}%`}</div>
                            {/* <div className="2xl:text-[0.521vw] text-[#9CA1AB] font-medium uppercase">LY Var: <span className="text-[#31C48D]">-%</span></div> */}
                          </div>
                          {/* <div className="h-[25px] 3xl:h-[1.563vw]">
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
                          </div> */}
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
                          // frontendAngle={20}
                          frontendAngle={0}
                          // frontaxisLine={{
                          //   lineStyle: {
                          //     width: 20,
                          //     color: [
                          //       [0.2, "#D68228"],
                          //       [0.6, "#D68228"],
                          //       [0.8, "rgba(214, 130, 40, 1)"],
                          //     ],
                          //   },
                          // }}
                          data={[{ value: TopTiledata?.DONE_PER }]}
                        />
                      </div>
                    </div>
                    {/*col*/}
                    <div className='overflow-auto'>
                    <div className="h-[161px] xl:h-[14.385vw] max-md:w-[1000px]">
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
                        // min={10}
                        // max={60}
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
                          fontSize: 12,
                          width: 200,
                          overflow: 'truncate',
                        }}
                        yAxisTick={{ show: false }}
                        yAxisLine={{
                          show: true,
                          lineStyle: {
                            color: "#47403C",
                          }
                        }}
                        // yAxisdata={['1.1.3', '1.1.2', '1.1.1']}
                        yAxisdata={TopBarLabel}
                        //barWidth={15}
                        name={'Done'}
                        name2={'In Progress'}
                        name3={'Not Started'}
                        // label={{ show: false }}
                        label= {{ 
                          show: true,
                          fontSize: 'auto',
                          formatter: (params) => params.value ? FormatNum(params.value,1) + "%" : "",
                        }}
                        itemStyle={{
                          color: '#59A14F',
                          borderRadius: 0
                        }}
                        itemStyle2={{
                          color: '#EDC948',
                          borderRadius: 0
                        }}
                        itemStyle3={{
                          color: '#BAB0AC',
                          borderRadius: 0
                        }}
                        // data={[12, 15, 20]}
                        // data1={[5, 15, 8]}
                        // data2={[45, 30, 32]}
                        data={TopBardata?.Done}
                        data1={TopBardata?.["Working on it"]}
                        data2={TopBardata?.["Not yet started"]}
                        ChartDesc={TopBardata?.DESCRIPTION}
                        TileName={TileName}
                        TileTitle={TopTiledata?.TITLE}
                      />
                    </div>
                    </div>
                    {/*col*/}
                  </div>
                  {/*col*/}
                  {isAuthenticated && <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                    <div className="grid grid-cols-12 bg-[#111928] rounded-[4px] p-[0.833vw]">
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
                    
                    <div className="h-[161px] xl:h-[14.385vw]">
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
                  </div>}
                  {/*col*/}
                </div>
                {/*col*/}
                {/* Temp Hided */}
                {/* <div>
                  <ChartWrapper
                    TabsData = {Object.keys(ChartbyBoard.Label)?.sort()}
                    activeTabBoard={getActiveTabBoard}
                    formatDownloadedData={downloaddata}
                    formatFileName={'Equitable Opportunities & Outcome Data'}
                    Description = {TopBardata?.Description}
                    ExportIcon={true}
                    data={
                      <>
                        <div>
                          <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 2xl:mt-[0.417vw] mt-1.5">
                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw]">Choose Dimension:</div>
                            <div>
                              <Dropdown value={selectedDimension} onChange={(e) => setselectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                placeholder="Select a Dimension" className="w-full md:w-[309px] 2xl:w-[18.229vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
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
                              // min={0}
                              // max={100}
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
                              // xAxisdata={['2023', '2023', '2023', '2024', '2024', '2024']}
                              xAxisdata={ChartbyBoard.Label?.[activeTabBoard]}
                              barWidth={50}
                              name={'Done'}
                              name2={'InProgress'}
                              name3={'Not Started'}
                              // label={{ show: false }}
                              label= {{ 
                                show: true,
                                fontSize: 'auto',
                                formatter: (params) => params.value ? FormatNum(params.value,1) + "%" : "",
                              }}
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
                              // data={[30, 40, 60, 30, 20, 40]}
                              // data1={[40, 50, 20, 30, 20, 20]}
                              // data2={[30, 10, 20, 40, 60, 40]}
                              data={ChartbyBoard?.data?.[activeTabBoard]?.Done}
                              data1={ChartbyBoard?.data?.[activeTabBoard]?.["Working on it"]}
                              data2={ChartbyBoard?.data?.[activeTabBoard]?.["Not yet started"]}
                            />
                          </div>
                          <div className="px-6 text-white">
                            {TopBardata?.Description?.[activeTabBoard]}
                          </div>
                        </div>
                      </>
                    }
                  />
                </div> */}
              </div>
            </ScrollPanel>
          </div>
        </Dialog>
      </div>
    </>
  );
}
