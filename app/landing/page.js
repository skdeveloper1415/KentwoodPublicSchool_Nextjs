"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import Horizontalbarchart2 from "../../components/charts/horizontalbarchart2";
import Horizontalbarchartsignal from "../../components/charts/horizontalbarchartsignal";
import Linechartwithgradient from "../../components/charts/linechartwithgradient";
import { Work_Sans } from "next/font/google";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as echarts from "echarts";
import Layout from "../../components/layout/pagelayout";
import Gaugechart from "../../components/charts/gaugechart";
import Link from "next/link";
import CultureofExcellenceKeyIndicators from "../../components/popup/cultureofexcellencekeyindicatorspopup";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import { fetchStacked_Horizontal, fetchSpeedometer, fetchFooter_Query} from "../../redux/slices/home";
import LoaderContainer from "../../components/LoaderContainer";
import { setState } from "../../redux/slices/globalState";


const worksans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const ReduxTest = useSelector((state) => state.global.ReduxTest)
  console.log("ReduxTest", ReduxTest)
  const handleClick = () => {
    setIsActive(!isActive);
  };

  const [culturalExcellence, setCulturalExcellence] = useState(false)
  const lineChartData = {
    label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
    value: [5, 6, 5, 6, 7, 7, 8],
  };

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },

    ]
  };

  /* Redux States */
  const Stacked_Horizontalloading = useSelector(state => state.home.Stacked_Horizontalloading)
  const Stacked_Horizontal = useSelector(state => state.home.Stacked_Horizontal)

  const Speedometerloading = useSelector(state => state.home.Speedometerloading)
  const Speedometer = useSelector(state => state.home.Speedometer)

  const Footer_Queryloading = useSelector(state => state.home.Footer_Queryloading)
  const Footer_Query = useSelector(state => state.home.Footer_Query)
  /*  */

  /* API Calls */
  const dispatch = useDispatch();

  useEffect(()=>{

    dispatch(fetchStacked_Horizontal({
        "elasticQueryName": "",
        "filters": [],
        "dynamicColumns": [],
    }))

    dispatch(fetchSpeedometer({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFooter_Query({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

  },[])
  /*  */

  /*  */
  const KeyInitiatives = useMemo(()=>{

    return Stacked_Horizontal.reduce((acc,item)=>{
      if (!acc[item["METRIC_NAME"]]){
        // acc[item["METRIC_NAME"]] = {Total:0}
        acc[item["METRIC_NAME"]] = {}
      }
      // acc[item["METRIC_NAME"]] = {...acc[item["METRIC_NAME"]],[item["Status"]]:item["VALUE"],["Total"]:acc[item["METRIC_NAME"]].Total+item["VALUE"]}
      acc[item["METRIC_NAME"]] = {...acc[item["METRIC_NAME"]],[item["Status"]]:item["VALUE"]}
      return acc
    },{})

  },[Stacked_Horizontal])

  const KeyIndicators = useMemo(()=>{

    return Speedometer.reduce((acc,item)=>{
      let {METRIC_NAME,...rest} = item
      acc[METRIC_NAME] = rest
      return acc
    },{})

  },[Speedometer])

  useEffect(()=>{
    if(!Footer_Queryloading && isActive){
      setIsActive(Footer_Queryloading)
    }
  },[Footer_Queryloading])
  /*  */

  /* Handle Navigation */
  const handleTabNavigation = (index) => {
    dispatch(setState({ ActiveTabTile: index }));
  }
  /*  */


  return (
    <>
      <div className="landingWrap">
        <Layout
          pageTitle="Strategic Plan Dashboard"
          parentPageName="Kentwood Public School Strategic Dashboard"
          pageName="Strategic Plan Dashboard"
          setActiveIndexList={handleTabNavigation}
        >

          <div className="px-[30px] 2xl:px-[70px] 3xl:px-[7.031vw]">
            <div className="flex items-center justify-between mt-[30px] xl:mt-[60px] 3xl:mt-[3.125vw]">
              <div className="col">
                <Image
                  src={"images/kpsLogo.png"}
                  width={480}
                  height={128}
                  alt=""
                  className="max-w-[350px]"
                />
              </div>

              {/* <Link href={'/goals'} className="col">
                <div className="bggradient rounded-[8px] 3xl:rounded-[0.417vw] p-[16px] 3xl:p-[0.833vw]">
                  <div className="text-[26px] 3xl:text-[1.563vw] text-white font-bold text-end">
                    STRATEGIC <span className="text-[#B6B6B6]">GOAL</span>
                  </div>
                  <div className="h-[50px]">
                    <Horizontalbarchartsignal
                      legend={{
                        show: false,
                      }}
                      grid={{
                        top: "2%",
                        left: "3%",
                        right: "5%",
                        bottom: "3%",
                        containLabel: true,
                      }}
                      xAxisLabel={{ show: false }}
                      xAxisSplitLine={{ show: false }}
                      yAxisLabel={{ show: false }}
                      name={"Actual"}
                      barWidth={32}
                      showBackground={true}
                      backgroundStyle={{
                        color: "#D0D1D1",
                        borderRadius: [100, 100, 100, 100],
                      }}
                      label={{
                        show: true,
                        position: "inside",
                        color: "white",
                        formatter: "{c}%",
                        fontSize: 16,
                      }}
                      itemStyle={{
                        color: "#498E71",
                        borderRadius: [100, 100, 100, 100],
                      }}
                      data={[87]}
                    />
                  </div>
                  <div className="text-white text-[14px] 3xl:text-[0.833vw] uppercase">
                    13 out of 15 Goals are achieved
                  </div>
                </div>
              </Link> */}
            </div>

            <div className="mt-[60px] 3xl:mt-[3.125vw]">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[15px] xl:gap-[24px] 3xl:gap-[1.563vw]">
                {/* col 1 */}
                <Link href={'/goals'} className="col">
                  <div className="boxBg" onClick={()=>handleTabNavigation(0)}>
                    <div>
                      <Image
                        src={"images/img1.png"}
                        width={100}
                        height={100}
                        className="w-full h-[234px] 3xl:h-[12.188vw] object-cover"
                        alt=""
                      />
                    </div>
                    <div className="p-[16px] 3xl:p-[0.833vw]">
                      <div className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[1.25vw] uppercase leading-[1.3]">
                        CULTURE OF <br />
                        <span className="text-[#B6B6B6] font-bold">
                          EXCELLENCE
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="space-y-[18px] xl:space-y-[24px] 3xl:space-y-[1.563vw]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Initiatives
                            </div>
                            <div className="h-[90px] 3xl:h-[4.688vw]">
                            <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
                              <Horizontalbarchart2
                                legend={{
                                  show: true,
                                  left: "2%",
                                  bottom: "0%",
                                  textStyle: {
                                    fontSize: 10,
                                    color: "#6C768B",
                                  },
                                  itemWidth: 8,
                                  itemHeight: 8,
                                }}
                                grid={{
                                  top: "-60%",
                                  left: "2%",
                                  right: "2%",
                                  bottom: "0%",
                                  containLabel: true,
                                }}
                                xAxisLabel={{ show: false }}
                                xAxisSplitLine={{
                                  show: false,
                                }}
                                yAxisLabel={{
                                  show: false,
                                }}
                                yAxisTick={{ show: false }}
                                yAxisLine={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                yAxisTick2={{ show: false }}
                                yAxisLabelTwo={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                // yAxisdata2={["30%"]}
                                name={"Actual"}
                                barWidth={28}
                                showBackground={true}
                                label={{
                                  show: false,
                                  position: "inside",
                                  color: "#344054",
                                  formatter: "{c}",
                                  fontSize: 12,
                                }}
                                itemStyle={{
                                  color: "#768FB5",
                                  borderRadius: [4, 4, 4, 4],
                                }}
                                data = {KeyInitiatives["Culture_of_Excellence"]}
                              />
                            </LoaderContainer>
                            </div>
                          </div>
                        </div>
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="text-white text-[14px] 3xl:text-[0.729vw] text-nowrap">
                            {/* Key Indicators */}
                            ELA/Math Proficient %
                          </div>
                          <div className='h-[100px]'>
                            <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
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
                              //   show:false,
                              //   lineStyle: {
                              //     width: 20,
                              //     color: [
                              //       [0.6, "#D68228"],
                              //       [1, "rgba(214, 130, 40, 1)"],
                              //     ],
                              //   },
                              // }}
                              data={[{ value: KeyIndicators["Culture_of_Excellence"]?.VALUE}]}
                            />
                            </LoaderContainer>
                          </div>
                          {/* <div className="text-[#fff] flex justify-center items-center text-[17px] xl:text-[17px] 3xl:text-[0.885vw]">2 OUT OF 4</div> */}
                          <div className="text-[#fff] flex justify-center items-center text-[8px] xl:text-[8px] 3xl:text-[0.45vw]">{KeyIndicators["Culture_of_Excellence"]?.ACHEIVE_GOAL || 0} Indicators to Acheive Goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* col 2 */}
                <Link href={'/goals'} className="col">
                  <div className="boxBg" onClick={() => handleTabNavigation(1)}>
                    <div>
                      <Image
                        src={"images/img2.png"}
                        width={100}
                        height={100}
                        className="w-full h-[234px] 3xl:h-[12.188vw] object-cover"
                        alt=""
                      />
                    </div>
                    <div className="p-[16px] 3xl:p-[0.833vw]">
                      <div className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[1.25vw] uppercase  leading-[1.3]">
                        Equitable {' '}
                        <span className="text-[#B6B6B6] font-bold">
                          Opportunities <br />& Outcomes
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="space-y-[18px] xl:space-y-[24px] 3xl:space-y-[1.563vw]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Initiatives
                            </div>
                            <div className="h-[90px] 3xl:h-[4.688vw]">
                            <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
                              <Horizontalbarchart2
                                legend={{
                                  show: true,
                                  left: "2%",
                                  bottom: "0%",
                                  textStyle: {
                                    fontSize: 10,
                                    color: "#6C768B",
                                  },
                                  itemWidth: 8,
                                  itemHeight: 8,
                                }}
                                grid={{
                                  top: "-60%",
                                  left: "2%",
                                  right: "2%",
                                  bottom: "0%",
                                  containLabel: true,
                                }}
                                xAxisLabel={{ show: false }}
                                xAxisSplitLine={{
                                  show: false,
                                }}
                                yAxisLabel={{
                                  show: false,
                                }}
                                yAxisTick={{ show: false }}
                                yAxisLine={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                yAxisTick2={{ show: false }}
                                yAxisLabelTwo={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                // yAxisdata2={["30%"]}
                                name={"Actual"}
                                barWidth={28}
                                showBackground={true}
                                label={{
                                  show: false,
                                  position: "inside",
                                  color: "#344054",
                                  formatter: "{c}",
                                  fontSize: 12,
                                }}
                                itemStyle={{
                                  color: "#768FB5",
                                  borderRadius: [4, 4, 4, 4],
                                }}
                                data = {KeyInitiatives["Equitable_Opportunities_and_Outcome"]}
                              />
                            </LoaderContainer>
                            </div>
                          </div>
                        </div>
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                            {/* Key Indicators */}
                            4Y Grad Rate
                          </div>
                          <div className='h-[100px]'>
                          <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
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
                              //   lineStyle: {
                              //     width: 20,
                              //     color: [
                              //       [0.6, "#D68228"],
                              //       [0.8, "rgba(214, 130, 40, 1)"],
                              //     ],
                              //   },
                              // }}
                              data={[{ value: KeyIndicators["Equitable_Opportunities_and_Outcome"]?.VALUE }]}
                            />
                          </LoaderContainer>
                          </div>
                          {/* <div className="text-[#fff] flex justify-center items-center text-[17px] xl:text-[17px] 3xl:text-[0.885vw]">3 OUT OF 4</div> */}
                          <div className="text-[#fff] flex justify-center items-center text-[8px] xl:text-[8px] 3xl:text-[0.45vw]">{KeyIndicators["Equitable_Opportunities_and_Outcome"]?.ACHEIVE_GOAL || 0} Indicators to Acheive Goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* col 3 */}
                <Link href={'/goals'} className="col">
                  <div className="boxBg" onClick={() => handleTabNavigation(2)}>
                    <div>
                      <Image
                        src={"images/img3.png"}
                        width={100}
                        height={100}
                        className="w-full h-[234px] 3xl:h-[12.188vw] object-cover"
                        alt=""
                      />
                    </div>
                    <div className="p-[16px] 3xl:p-[0.833vw]">
                      <div className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[1.25vw] uppercase  leading-[1.3]">
                        Whole-Child <br />
                        <span className="text-[#B6B6B6] font-bold">
                          Environments
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="space-y-[18px] xl:space-y-[24px] 3xl:space-y-[1.563vw]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Initiatives
                            </div>
                            <div className="h-[90px] 3xl:h-[4.688vw]">
                          <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
                              <Horizontalbarchart2
                                legend={{
                                  show: true,
                                  left: "2%",
                                  bottom: "0%",
                                  textStyle: {
                                    fontSize: 10,
                                    color: "#6C768B",
                                  },
                                  itemWidth: 8,
                                  itemHeight: 8,
                                }}
                                grid={{
                                  top: "-60%",
                                  left: "2%",
                                  right: "2%",
                                  bottom: "0%",
                                  containLabel: true,
                                }}
                                xAxisLabel={{ show: false }}
                                xAxisSplitLine={{
                                  show: false,
                                }}
                                yAxisLabel={{
                                  show: false,
                                }}
                                yAxisTick={{ show: false }}
                                yAxisLine={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                yAxisTick2={{ show: false }}
                                yAxisLabelTwo={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                // yAxisdata2={["30%"]}
                                name={"Actual"}
                                barWidth={28}
                                showBackground={true}
                                label={{
                                  show: false,
                                  position: "inside",
                                  color: "#344054",
                                  formatter: "{c}",
                                  fontSize: 12,
                                }}
                                itemStyle={{
                                  color: "#768FB5",
                                  borderRadius: [4, 4, 4, 4],
                                }}
                                data = {KeyInitiatives["Whole_Child_Environment"]}
                              />
                              </LoaderContainer>
                            </div>
                          </div>
                        </div>
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                            {/* Key Indicators */}
                            Student Belonging
                          </div>
                          <div className='h-[100px]'>
                          <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
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
                              //   lineStyle: {
                              //     width: 20,
                              //     color: [
                              //       [0.6, "#D68228"],
                              //       [0.8, "rgba(214, 130, 40, 1)"],
                              //     ],
                              //   },
                              // }}
                              data={[{ value: KeyIndicators["Whole Child Environment"]?.VALUE}]}
                            />
                            </LoaderContainer>
                          </div>
                          {/* <div className="text-[#fff] flex justify-center items-center text-[17px] xl:text-[17px] 3xl:text-[0.885vw]">3 OUT OF 3</div> */}
                          <div className="text-[#fff] flex justify-center items-center text-[8px] xl:text-[8px] 3xl:text-[0.45vw]">{KeyIndicators["Whole Child Environment"]?.ACHEIVE_GOAL || 0} Indicators to Acheive Goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* col 3 */}
                <Link href={'/goals'} className="col">
                  <div className="boxBg" onClick={() => handleTabNavigation(3)}>
                    <div>
                      <Image
                        src={"images/img2.png"}
                        width={100}
                        height={100}
                        className="w-full h-[234px] 3xl:h-[12.188vw] object-cover"
                        alt=""
                      />
                    </div>
                    <div className="p-[16px] 3xl:p-[0.833vw]">
                      <div className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[1.25vw] uppercase  leading-[1.3]">
                        High Impact,&nbsp;
                        <span className="text-[#B6B6B6] font-bold">
                          Diverse <br /> Staff
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="space-y-[18px] xl:space-y-[24px] 3xl:space-y-[1.563vw]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Initiatives
                            </div>
                            <div className="h-[90px] 3xl:h-[4.688vw]">
                            <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
                              <Horizontalbarchart2
                                legend={{
                                  show: true,
                                  left: "2%",
                                  bottom: "0%",
                                  textStyle: {
                                    fontSize: 10,
                                    color: "#6C768B",
                                  },
                                  itemWidth: 8,
                                  itemHeight: 8,
                                }}
                                grid={{
                                  top: "-60%",
                                  left: "2%",
                                  right: "2%",
                                  bottom: "0%",
                                  containLabel: true,
                                }}
                                xAxisLabel={{ show: false }}
                                xAxisSplitLine={{
                                  show: false,
                                }}
                                yAxisLabel={{
                                  show: false,
                                }}
                                yAxisTick={{ show: false }}
                                yAxisLine={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                yAxisTick2={{ show: false }}
                                yAxisLabelTwo={{
                                  show: false,
                                  lineStyle: {
                                    color: "#E4E7EC",
                                  },
                                }}
                                // yAxisdata2={["30%"]}
                                name={"Actual"}
                                barWidth={28}
                                showBackground={true}
                                label={{
                                  show: false,
                                  position: "inside",
                                  color: "#344054",
                                  formatter: "{c}",
                                  fontSize: 12,
                                }}
                                itemStyle={{
                                  color: "#768FB5",
                                  borderRadius: [4, 4, 4, 4],
                                }}
                                data = {KeyInitiatives["High_Impact_Diverse_Staff"]}
                              />
                            </LoaderContainer>
                            </div>
                          </div>
                        </div>
                        <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                          <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                            {/* Key Indicators */}
                            Fund Balance
                          </div>
                          <div className='h-[100px]'>
                          <LoaderContainer width={"100%"} height={"100%"} loading={Speedometerloading}>
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
                              //   lineStyle: {
                              //     width: 20,
                              //     color: [
                              //       [0.6, "#D68228"],
                              //       [0.8, "rgba(214, 130, 40, 1)"],
                              //     ],
                              //   },
                              // }}
                              data={[{ value: KeyIndicators["High Impact Diverse Staff"]?.VALUE}]}
                            />
                          </LoaderContainer>
                          </div>
                          {/* <div className="text-[#fff] flex justify-center items-center text-[17px] xl:text-[17px] 3xl:text-[0.885vw]">2 OUT OF 4</div> */}
                          <div className="text-[#fff] flex justify-center items-center text-[8px] xl:text-[8px] 3xl:text-[0.45vw]">{KeyIndicators["High Impact Diverse Staff"]?.ACHEIVE_GOAL || 0} Indicators to Acheive Goal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>

          <div className={isActive ? 'sliderHide active sticky bottom-0' : 'sliderHide sticky bottom-0'}>
            <div className="divOne">
              <div className="bg-[#272321] shadow-[0px_1px_24px_0px_rgba(0,0,0,0.25)] p-[16px] 3xl:p-[0.833vw] xl:pl-[24px] 3xl:pl-[1.667vw] mt-[30px] xl:mt-[60px] 3xl:mt-[3.125vw]">
                <div className="flex gap-[10px] 3xl:gap-[0.521vw] overflow-hidden">
                  <div className={`${worksans.className}`}>
                    <div className="space-y-[8px] 3xl:space-y-[0.417vw]" onClick={handleClick}>
                      <div className="text-white text-[14px] 3xl:text-[0.729vw] font-semibold text-end leading-[1.2]">
                        Your <br /> Tracks
                      </div>

                      <div className="text-white text-[12px] 3xl:text-[0.625vw] text-end flex items-center">
                        Hide
                        <i className="ru-arrow-circle-left ml-[4px] 3xl:ml-[0.208vw]"></i>
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 custslider">
                    <Slider {...settings}>
                      {/* <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2]">
                              M-STEP State <br /> Assessment ELA
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div>
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end">
                                    175
                                  </div>
                                </div>
                                <div className="bg-[#DEF7EC] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw]">
                                  PY Var: 80%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2]">
                              i-Ready Benchmark <br /> Assessment - Mathe..
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div>
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end">
                                    180
                                  </div>
                                </div>
                                <div className="bg-[#DEF7EC] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw]">
                                  LP Var: 10%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2]">
                              M-STEP State <br /> Assessment ELA
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div>
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end">
                                    88%
                                  </div>
                                </div>
                                <div className="bg-[#FDE8E8] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw]">
                                  PY Var: 12%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2]">
                              M-STEP State <br /> Assessment Mathematics
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div>
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end">
                                    90%
                                  </div>
                                </div>
                                <div className="bg-[#DEF7EC] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw]">
                                  py Var: 30%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2]">
                              Freshman on Track
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div>
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end">
                                    98%
                                  </div>
                                </div>
                                <div className="bg-[#DEF7EC] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw]">
                                  py Var: 19%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      {Footer_Query.map(item=>
                        <div>
                        <div className="bg-[#322D2B] rounded-[4px] 3xl:rounded-[0.208vw] p-[16px] 3xl:p-[0.833vw]">
                          {/* <div onClick={() => setCulturalExcellence(true)} className="flex items-center justify-between"> */}
                          <div className="flex items-center justify-between gap-[2rem]">
                            <div className="text-white text-[12px] 3xl:text-[0.625vw] leading-[1.2] text-wrap">
                              {item?.METRIC_NAME}
                            </div>
                            <div className="flex items-center gap-[14px] 3xl:gap-[0.729vw]">
                              {/* <div className="h-[45px] 3xl:h-[2.344vw]">
                                <Linechartwithgradient
                                  grid={{
                                    top: 0,
                                    left: 2,
                                    right: 2,
                                    bottom: 2,
                                    containLabel: true,
                                  }}
                                  lineStyle={{ color: "#73706D", width: 1.5 }}
                                  areaStyle={{
                                    color: new echarts.graphic.LinearGradient(
                                      0,
                                      0,
                                      0,
                                      1,
                                      [
                                        {
                                          offset: 0.8,
                                          color: "#322D2B",
                                        },
                                        {
                                          offset: 0.1,
                                          color: "#73706D",
                                        },
                                      ]
                                    ),
                                  }}
                                  data={lineChartData}
                                />
                              </div> */}
                              <div className="col">
                                <div className={`${worksans.className}`}>
                                  <div className="text-[#E5E7EB] text-[18px] 3xl:text-[0.938vw] font-semibold text-end" title={item?.TITLE}>
                                    {item?.METRIC_NAME == "Staff DIversity" ? item?.KPS_WHITE?.toFixed(0) +' : ' + item?.KPS_OTHERS?.toFixed(0) : item?.VALUE?.toFixed(0)}{item?.TITLE?.includes("%") || item?.TITLE?.toLowerCase()?.includes("rate") ? "%" : ""}
                                  </div>
                                </div>
                                <div className="bg-[#DEF7EC] rounded-[3px] 3xl:rounded-[0.156vw] px-[4px] 3xl:px-[0.208vw] py-[2px] 3xl:py-[0.104vw] text-[#374151] text-[10px] 3xl:text-[0.521vw] text-nowrap">
                                  LY Var: -%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      )}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="divTwo">
              <div className="bg-[#111928] min-h-[110px] 3xl:min-h-[5.729vw] inline-block shadow-[0px_1px_24px_0px_rgba(0,0,0,0.25)] p-[16px] 3xl:p-[0.833vw] xl:pl-[24px] 3xl:pl-[1.667vw] mt-[30px] xl:mt-[60px] 3xl:mt-[3.125vw]">
                <div className="flex gap-[10px] 3xl:gap-[0.521vw]">
                  <div className={`${worksans.className}`}>
                    <div className="space-y-[8px] 3xl:space-y-[0.417vw]" onClick={handleClick}>
                      <div className="text-white text-[14px] 3xl:text-[0.729vw] font-semibold text-end leading-[1.2]">
                        Your <br /> Tracks
                      </div>

                      <div className="text-white text-[12px] 3xl:text-[0.625vw] text-end flex items-center">
                        Hide
                        <i className="ru-arrow-circle-left ml-[4px] 3xl:ml-[0.208vw]"></i>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


          </div>
        </Layout>
        <CultureofExcellenceKeyIndicators
          visible={culturalExcellence}
          onHide={() => {
            setCulturalExcellence(false)
          }}

        />

        {/* setCulturalExcellence */}
      </div>
    </>
  );
};

export default Dashboard;
