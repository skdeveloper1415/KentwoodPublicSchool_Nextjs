"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Image from "next/image";
import { Work_Sans } from "next/font/google";
import * as echarts from "echarts";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Link from "next/link";
import { ScrollPanel } from "primereact/scrollpanel";
import LandingChart from "../components/charts/landingchart";
import Layout from "../components/layout/pagelayout";

import { useDispatch, useSelector } from "react-redux";
import { fetchStacked_Horizontal } from "../redux/slices/home";
import {
  fetchCulture_Key_Initiative_Bar, fetchCulture_Key_Initiative_Toptile, fetchEquitable_Key_Initiative_Bar, fetchEquitable_Key_Initiative_Toptile,
  fetchWhole_Child_Key_Initiative_Bar, fetchWhole_Child_Key_Initiative_Toptile, fetchHigh_Impact_Key_Initiative_Bar, fetchHigh_Impact_Key_Initiative_Toptile, fetchBenchmark_Assessment_Reading_Toptile,
  fetchBenchmark_Assessment_Reading_Bar, fetchBenchmark_Assessment_Mathematics_Toptile, fetchBenchmark_Assessment_Mathematics_Bar, fetchState_Assessment_ELA_Toptile, fetchState_Assessment_ELA_Bar, fetchFreshmen_on_Track_Toptile,
  fetchFreshmen_on_Track_Bar, fetchAdvanced_Placement_Toptile, fetchAdvanced_Placement_Bar, fetchSAT_Assessment_Toptile, fetchSAT_Assessment_Bar, fetchChronic_Absenteeism_Toptile, fetchChronic_Absenteeism_Bar, fetchStudent_Belonging_Toptile,
  fetchStudent_Belonging_Bar, fetchOut_of_School_Suspensions_Toptile, fetchOut_of_School_Suspensions_Bar, fetchStaff_Engagement_Toptile, fetchStaff_Engagement_Bar, fetchStaff_DIversity_Toptile, fetchStaff_DIversity_Bar, fetchStaff_Retention_Toptile,
  fetchStaff_Retention_Bar, fetchFund_Balance_Toptile, fetchFund_Balance_Bar, fetchGraduation_Rate_Toptile, fetchGraduation_Rate_Bar, fetchState_Assessment_Mathematics_Toptile, fetchState_Assessment_Mathematics_Bar, fetchFooter_Query
} from "../redux/slices/home";
import { FormatNum, getRankSuffix } from "../components/utils";
import LoaderContainer from "../components/LoaderContainer";
import { setState } from "../redux/slices/globalState";
import { Button } from "primereact/button";
import axios from "axios";
import { toast } from "react-toastify";

const worksans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  console.log('isAuthenticated: ', isAuthenticated);
  const [userInfo, setUserInfo] = useState()
  console.log('userInfo: ', userInfo);
  const userData = useSelector((state) => state.global.userData);
  /* redux States */

  const Stacked_Horizontalloading = useSelector(state => state.home.Stacked_Horizontalloading)
  const Stacked_Horizontal = useSelector(state => state.home.Stacked_Horizontal)

  const Benchmark_Assessment_Reading_Toptileloading = useSelector(state => state.home.Benchmark_Assessment_Reading_Toptileloading)
  const Benchmark_Assessment_Reading_Toptile = useSelector(state => state.home.Benchmark_Assessment_Reading_Toptile)

  const Benchmark_Assessment_Mathematics_Toptileloading = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Toptileloading)
  const Benchmark_Assessment_Mathematics_Toptile = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Toptile)

  const State_Assessment_ELA_Toptileloading = useSelector(state => state.home.State_Assessment_ELA_Toptileloading)
  const State_Assessment_ELA_Toptile = useSelector(state => state.home.State_Assessment_ELA_Toptile)

  const Freshmen_on_Track_Toptileloading = useSelector(state => state.home.Freshmen_on_Track_Toptileloading)
  const Freshmen_on_Track_Toptile = useSelector(state => state.home.Freshmen_on_Track_Toptile)

  const Graduation_Rate_Toptileloading = useSelector(state => state.home.Graduation_Rate_Toptileloading)
  const Graduation_Rate_Toptile = useSelector(state => state.home.Graduation_Rate_Toptile)

  const Advanced_Placement_Toptileloading = useSelector(state => state.home.Advanced_Placement_Toptileloading)
  const Advanced_Placement_Toptile = useSelector(state => state.home.Advanced_Placement_Toptile)

  const SAT_Assessment_Toptileloading = useSelector(state => state.home.SAT_Assessment_Toptileloading)
  const SAT_Assessment_Toptile = useSelector(state => state.home.SAT_Assessment_Toptile)

  const Chronic_Absenteeism_Toptileloading = useSelector(state => state.home.Chronic_Absenteeism_Toptileloading)
  const Chronic_Absenteeism_Toptile = useSelector(state => state.home.Chronic_Absenteeism_Toptile)

  const Student_Belonging_Toptileloading = useSelector(state => state.home.Student_Belonging_Toptileloading)
  const Student_Belonging_Toptile = useSelector(state => state.home.Student_Belonging_Toptile)

  const Out_of_School_Suspensions_Toptileloading = useSelector(state => state.home.Out_of_School_Suspensions_Toptileloading)
  const Out_of_School_Suspensions_Toptile = useSelector(state => state.home.Out_of_School_Suspensions_Toptile)

  const Staff_Engagement_Toptileloading = useSelector(state => state.home.Staff_Engagement_Toptileloading)
  const Staff_Engagement_Toptile = useSelector(state => state.home.Staff_Engagement_Toptile)

  const Staff_DIversity_Toptileloading = useSelector(state => state.home.Staff_DIversity_Toptileloading)
  const Staff_DIversity_Toptile = useSelector(state => state.home.Staff_DIversity_Toptile)

  const Staff_Retention_Toptileloading = useSelector(state => state.home.Staff_Retention_Toptileloading)
  const Staff_Retention_Toptile = useSelector(state => state.home.Staff_Retention_Toptile)

  const Fund_Balance_Toptileloading = useSelector(state => state.home.Fund_Balance_Toptileloading)
  const Fund_Balance_Toptile = useSelector(state => state.home.Fund_Balance_Toptile)

  const State_Assessment_Mathematics_Toptileloading = useSelector(state => state.home.State_Assessment_Mathematics_Toptileloading)
  const State_Assessment_Mathematics_Toptile = useSelector(state => state.home.State_Assessment_Mathematics_Toptile)

  const Footer_Queryloading = useSelector(state => state.home.Footer_Queryloading)
  const Footer_Query = useSelector(state => state.home.Footer_Query)
  /* */


  /* API Calls */
  const dispatch = useDispatch();
  useEffect(()=>{
    const hasVisited = sessionStorage.getItem('hasVisitedGoalsPage');
    if(hasVisited){
      sessionStorage.removeItem('hasVisitedGoalsPage')
    }
  },[])

  useEffect(() => {

    dispatch(fetchStacked_Horizontal({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Reading_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Mathematics_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_ELA_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_Mathematics_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFreshmen_on_Track_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchGraduation_Rate_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchAdvanced_Placement_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchSAT_Assessment_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchChronic_Absenteeism_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStudent_Belonging_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchOut_of_School_Suspensions_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Engagement_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_DIversity_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Retention_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFund_Balance_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFooter_Query({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

  }, [])
  /* */
  useLayoutEffect(() => {
    setUserInfo(JSON?.parse(sessionStorage.getItem("userInfo")))
    setIsAuthenticated(JSON?.parse(sessionStorage.getItem("isAuthenticated")))
  }, [userData])
  /*  */
  const KeyInitiatives = useMemo(() => {

    return Stacked_Horizontal.reduce((acc, item) => {
      if (!acc[item["METRIC_NAME"]]) {
        // acc[item["METRIC_NAME"]] = {Total:0}
        acc[item["METRIC_NAME"]] = {}
      }
      // acc[item["METRIC_NAME"]] = {...acc[item["METRIC_NAME"]],[item["Status"]]:item["VALUE"],["Total"]:acc[item["METRIC_NAME"]].Total+item["VALUE"]}
      acc[item["METRIC_NAME"]] = { ...acc[item["METRIC_NAME"]], [item["STATUS"]]: item["VALUE"] }
      return acc
    }, {})

  }, [Stacked_Horizontal])
  /*  */

  /* Handle Navigation */
  const handleTabNavigation = (index) => {
    dispatch(setState({ ActiveTabTile: index }));
  }
  /*  */

  // google Login

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: tokenResponse => {
      fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token="${tokenResponse.access_token}".`)
        .then(response => response.json())
        .then(data => {
          if (data?.email != undefined && data?.email != null) {
            axios.post(`${process.env.REACT_APP_URI}api/auth`, {
              userEmail: data?.email
            }).then((response) => {
              if (response?.data == true) {
                console.log('response?.data: ', response?.data);
                console.log('data: ', data);
                sessionStorage.setItem("userInfo", JSON.stringify(data));
                sessionStorage.setItem("isAuthenticated", !!data);
                sessionStorage.setItem("userEmailId", `${data?.email}`);
                sessionStorage.setItem("userName", `${data?.name}`);
                dispatch(setState({ userData: data }))
                toast.success("Logged in Successfully");
              } else {
                console.log('✌️response --->', 'false');
                // toast.error("Logged in Failed and contact administrator");
                toast.error("Loggin Failed, Please Contact Administrator");
              }
            }).catch((error) => {
              console.log('✌️error --->', error);
            });
          }
        })
        .catch(error => console.log(error));
    },

  });

  const handleGoogleLogout = async () => {
    try {
      await googleLogout();

      sessionStorage.removeItem("userInfo")
      sessionStorage.removeItem("userEmailId");
      sessionStorage.setItem("isAuthenticated", false)
      sessionStorage.removeItem("userName");
      dispatch(setState({ userData: {} }))
      // navigate('/')
      toast.success("Logged out Successfully");
      // Handle successful logout
    } catch (error) {
      // Handle logout error
      console.error('Logout error:', error);
      // Perform any necessary cleanup or error handling
    }
  };

  return (
    <>
      <div className="relative bannervideo h-[140vh]">
        <video autoPlay loop muted>
          <source src="/images/landingvideo.webm" type="video/webm" />
        </video>
        <div className="absolute left-0 top-[0px] right-0 bottom-0 z-[2]">
          <Layout
            pageTitle="Strategic Plan Dashboard"
            parentPageName="Kentwood Public School Strategic Dashboard"
            pageName="Strategic Plan Dashboard"
            setActiveIndexList={handleTabNavigation}
            handleGoogleLogout={handleGoogleLogout}
            handleGoogleLogin={handleGoogleLogin}
            isAuthenticated={isAuthenticated}
          >
            <div className="relative pointer-events-none hidden lg:block">
              <div className="flex justify-center items-center fixed top-5 right-0 left-0 z-[20] select-none max-lg:z-10">
                <Image src="/images/svg/small-logo.svg" width={146} height={39} alt="" onClick={() => window.open('https://www.kentwoodps.org/ourdistrict/strategic-plan/', '_blank')} className="cursor-pointer pointer-events-auto" />
              </div>
            </div>
            <div className="px-[20px] xl:px-[20px] 3xl:px-[4vw] 3xl:mt-[1.563vw]">
              <div className="flex mb-[30px] xl:mb-[30px] 3xl:mb-[1.563vw] justify-between">
                <div>
                  <h6 className="text-white text-20px] 3xl:text-[1.25vw] font-semibold "> Welcome to the Kentwood Public School (KPS) Strategic Plan Dashboard!</h6>
                  <p className="text-[#E1D6D6] text-[17px] 3xl:text-[1vw] font-light leading-[160%]">We are excited to present our strategic plan for the next 3-5 years, which reflects the vision and input of our KPS community.</p>
                  {/* <p className="text-[#CCD0D8] text-[10px] 3xl:text-[0.729vw] font-light mt-[8px] xl:mt-[8px] 3xl:mt-[0.417vw]">Our strategic plan is built around four central goals:</p> */}
                  <h6 className="text-white text-[14px] 3xl:text-[0.833vw] font-semibold  mt-[12px] xl:mt-[10px] 3xl:mt-[0.625vw]"> Our strategic plan is built around four central goals:</h6>
                </div>
                {/* {isAuthenticated ?
                  <Link
                    href="" onClick={handleGoogleLogout}
                    className="logText h-[35px] bg-[#773310] text-[14px] xl:text-[14px] 2xl:text-[0.729vw] 3xl:text-[0.729vw]
             px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[12px] xl:py-[11px] 3xl:py-[0.600vw] white_text_color font-normal rounded-sm flex justify-center items-center  w-[170px]
             xl:w-[170px]  3xl:w-[8.854vw]"
                  >
                    <Image src={'/images/googleLogo.png'} className="googleLogo is-mar-right-2 " width={38} height={38} alt="Profile" />
                    Sign Out
                  </Link>
                  :
                  <Link
                    href="" onClick={handleGoogleLogin}
                    className="logText h-[35px] bg-[#773310] text-[14px] xl:text-[14px] 2xl:text-[0.729vw] 3xl:text-[0.729vw]
             px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[12px] xl:py-[11px] 3xl:py-[0.600vw] white_text_color font-normal rounded-sm flex justify-center items-center  w-[170px]
             xl:w-[170px]  3xl:w-[8.854vw]"
                  >
                    <Image src={'/images/googleLogo.png'} className="googleLogo is-mar-right-2 " width={38} height={38} alt="Profile" />
                    Sign In
                  </Link>
                } */}
              </div>
              <div className="pb-[20px] 3xl:pb-[1.042vw] landing-page-top ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[15px] xl:gap-[24px] 3xl:gap-[1.563vw] landing-page-main mb-5">
                  {/* col 1 */}
                  <Link href={"/goals"} className="col">
                    <div className="boxBg" onClick={() => handleTabNavigation(0)}>
                      <div>
                        <Image
                          src={"images/img1-new.png"}
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
                        <div className="grid grid-cols-1 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                            <div className="space-y-[10px] xl:space-y-[10px] 3xl:space-y-[0.521vw]">
                              <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                                Key Initiatives
                              </div>
                              <div className="h-[70px] 3xl:h-[3.646vw]">
                                <LoaderContainer loading={Stacked_Horizontalloading} width={'100%'} height={'100%'}>
                                  <LandingChart
                                    legend={{
                                      show: true,
                                      left: "2%",
                                      bottom: "12%",
                                      textStyle: {
                                        fontSize: 10,
                                        color: "#6C768B",
                                        fontWeight: 500,
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
                                    yAxisdata2={["30%"]}
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
                                    data={KeyInitiatives["Culture_of_Excellence"]}
                                  />
                                </LoaderContainer>
                              </div>
                            </div>
                          </div>
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw] 3xl:mb-[20px]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Indicators
                            </div>
                            <div className="mt-[12px] 3xl:mt-[0.625vw]">
                              <div className="grid grid-cols-2 gap-[12px] 3xl:gap-[0.625vw]">
                                {isAuthenticated && <>
                                  <LoaderContainer loading={Benchmark_Assessment_Reading_Toptileloading} height={'5rem'}>
                                    <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw] rounded-[8px] 3xl:rounded-[0.417vw]">
                                      <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                        i-Ready Benchmark Assessment - Reading
                                      </div>
                                      <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                        <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                          {Benchmark_Assessment_Reading_Toptile[0]?.KPS_AVERAGE}
                                          {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                      </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </LoaderContainer>
                                  <LoaderContainer loading={Benchmark_Assessment_Mathematics_Toptileloading} height={'5rem'}>
                                    <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                      <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]" title="i-Ready Benchmark Assessment - Mathematics">
                                        i-Ready Benchmark Assessment - Math...
                                      </div>
                                      <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                        <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600]  leading-[1.3]">
                                          {FormatNum(Benchmark_Assessment_Mathematics_Toptile[0]?.KPS_AVERAGE, 1)}
                                          {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                      </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </LoaderContainer>
                                </>}
                                <LoaderContainer loading={State_Assessment_ELA_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      M-STEP State Assessment ELA
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {State_Assessment_ELA_Toptile[0]?.KPS_PROFICIENT?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                <LoaderContainer loading={State_Assessment_Mathematics_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]" title="M-STEP State Assessment Mathematics">
                                      M-STEP State Assessment Math...
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600] leading-[1.3]">
                                        {State_Assessment_Mathematics_Toptile[0]?.KPS_PROFICIENT?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_down_red.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                <LoaderContainer loading={SAT_Assessment_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      SAT <br /> Assessment
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600] leading-[1.3]">
                                        {SAT_Assessment_Toptile[1]?.VALUE}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* col 2 */}
                  <Link href={"/goals"} className="col">
                    <div className="boxBg" onClick={() => handleTabNavigation(1)}>
                      <div>
                        <Image
                          src={"images/img2-new.png"}
                          width={100}
                          height={100}
                          className="w-full h-[234px] 3xl:h-[12.188vw] object-cover"
                          alt=""
                        />
                      </div>
                      <div className="p-[16px] 3xl:p-[0.833vw]">
                        <div className="text-white text-[16px] 2xl:text-[18px] 3xl:text-[1.25vw] uppercase  leading-[1.3]">
                          Equitable{" "}
                          <span className="text-[#B6B6B6] font-bold">
                            Opportunities <br />& Outcomes
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                            <div className="space-y-[10px] xl:space-y-[10px] 3xl:space-y-[0.521vw]">
                              <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                                Key Initiatives
                              </div>
                              <div className="h-[70px] 3xl:h-[3.646vw]">
                                <LoaderContainer loading={Stacked_Horizontalloading} width={'100%'} height={'100%'}>
                                  <LandingChart
                                    legend={{
                                      show: true,
                                      left: "2%",
                                      bottom: "12%",
                                      textStyle: {
                                        fontSize: 10,
                                        color: "#6C768B",
                                        fontWeight: 500,
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
                                    yAxisdata2={["30%"]}
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
                                    data={KeyInitiatives["Equitable_Opportunities_and_Outcome"]}
                                  />
                                </LoaderContainer>
                              </div>
                            </div>
                          </div>
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw] 3xl:mb-[20px]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Indicators
                            </div>
                            <div className="mt-[12px] 3xl:mt-[0.625vw]">
                              <div className="grid grid-cols-2 gap-[12px] 3xl:gap-[0.625vw]">
                                <LoaderContainer loading={Freshmen_on_Track_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw] rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Freshman on <br />
                                      Track
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {Freshmen_on_Track_Toptile[0]?.PER_ON_TRACK?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                <LoaderContainer loading={Graduation_Rate_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Four-Year <br />
                                      Graduation Rate
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600]  leading-[1.3]">
                                        {Graduation_Rate_Toptile[0]?.GRADUATION_RATE?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_down_red.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                
                                <LoaderContainer loading={Fund_Balance_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Fund <br />
                                      Balance
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {Fund_Balance_Toptile[0]?.FUND_BALANCE_PER?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                {isAuthenticated && <LoaderContainer loading={Advanced_Placement_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Advanced <br />
                                      Placement (AP) - White
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {/* {Advanced_Placement_Toptile[0]?.VALUE?.toFixed(0) + "%"} */}
                                        {Footer_Query?.find(item => item?.METRIC_NAME == "Advanced Placement(AP) - White")?.VALUE?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>}
                                {/* <LoaderContainer loading={SAT_Assessment_Toptileloading} height={'5rem'}>
                                <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                  <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                    SAT <br /> Assessment
                                  </div>
                                  <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                    <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600] leading-[1.3]">
                                      {SAT_Assessment_Toptile[1]?.VALUE}
                                    </div>
                                  </div>
                                </div>
                                </LoaderContainer> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* col 3 */}
                  <Link href={"/goals"} className="col">
                    <div className="boxBg" onClick={() => handleTabNavigation(2)}>
                      <div>
                        <Image
                          src={"images/img3-new.png"}
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
                        <div className="grid grid-cols-1 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                            <div className="space-y-[10px] xl:space-y-[10px] 3xl:space-y-[0.521vw]">
                              <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                                Key Initiatives
                              </div>
                              <div className="h-[70px] 3xl:h-[3.646vw]">
                                <LoaderContainer loading={Stacked_Horizontalloading} width={'100%'} height={'100%'}>
                                  <LandingChart
                                    legend={{
                                      show: true,
                                      left: "2%",
                                      bottom: "12%",
                                      textStyle: {
                                        fontSize: 10,
                                        color: "#6C768B",
                                        fontWeight: 500,
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
                                    yAxisdata2={["30%"]}
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
                                    data={KeyInitiatives["Whole_Child_Environment"]}
                                  />
                                </LoaderContainer>
                              </div>
                            </div>
                          </div>
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw] 3xl:mb-[20px]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Indicators
                            </div>
                            <div className="mt-[12px] 3xl:mt-[0.625vw]">
                              <div className="grid grid-cols-2 gap-[12px] 3xl:gap-[0.625vw]">
                                <LoaderContainer loading={Chronic_Absenteeism_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw] rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Chronic <br />
                                      Absenteeism
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {Chronic_Absenteeism_Toptile[0]?.CHRONIC_ABSENTEEISM_RATE?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                {isAuthenticated && <>
                                  <LoaderContainer loading={SAT_Assessment_Toptileloading} height={'5rem'}>
                                    <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                      <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                        Student <br />
                                        Belonging
                                      </div>
                                      <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                        <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600]  leading-[1.3]">
                                          {Student_Belonging_Toptile[0]?.PER_POSITIVE?.toFixed(0) + "%"}
                                          {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_down_red.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </LoaderContainer>
                                  <LoaderContainer loading={Out_of_School_Suspensions_Toptileloading} height={'5rem'}>
                                    <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                      <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                        Out of School <br />
                                        Suspensions
                                      </div>
                                      <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                        <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                          {Out_of_School_Suspensions_Toptile[0]?.OSS_RATE?.toFixed(0) + "%"}
                                          {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                        </div>
                                      </div>
                                    </div>
                                  </LoaderContainer>
                                </>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* col 3 */}
                  <Link href={"/goals"} className="col">
                    <div className="boxBg" onClick={() => handleTabNavigation(3)}>
                      <div>
                        <Image
                          src={"images/img4-new.png"}
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
                        <div className="grid grid-cols-1 gap-[8px] 3xl:gap-[0.833vw] mt-[16px] 3xl:mt-[0.833vw]">
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw]">
                            <div className="space-y-[10px] xl:space-y-[10px] 3xl:space-y-[0.521vw]">
                              <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                                Key Initiatives
                              </div>
                              <div className="h-[70px] 3xl:h-[3.646vw]">
                                <LoaderContainer loading={Stacked_Horizontalloading} width={'100%'} height={'100%'}>
                                  <LandingChart
                                    legend={{
                                      show: true,
                                      left: "2%",
                                      bottom: "12%",
                                      textStyle: {
                                        fontSize: 10,
                                        color: "#6C768B",
                                        fontWeight: 500,
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
                                    yAxisdata2={["30%"]}
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
                                    data={KeyInitiatives["High_Impact_Diverse_Staff"]}
                                  />
                                </LoaderContainer>
                              </div>
                            </div>
                          </div>
                          <div className="boxBg2 p-[12px] 3xl:p-[0.625vw] 3xl:mb-[20px]">
                            <div className="text-white text-[14px] 3xl:text-[0.729vw]">
                              Key Indicators
                            </div>
                            <div className="mt-[12px] 3xl:mt-[0.625vw]">
                              <div className="grid grid-cols-2 gap-[12px] 3xl:gap-[0.625vw]">
                                {isAuthenticated && <LoaderContainer loading={Staff_DIversity_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw] rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Staff <br />
                                      Engagement Index
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {getRankSuffix(Staff_Engagement_Toptile[0]?.PERCENTILE)}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>}
                                <LoaderContainer loading={Staff_DIversity_Toptileloading} height={'5rem'}>
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Staff <br />
                                      Diversity
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw] font-[600]  leading-[1.3]">
                                        {`${Staff_DIversity_Toptile[0]?.KPS_WHITE.toFixed(0)} : ${Staff_DIversity_Toptile[0]?.KPS_OTHERS.toFixed(0)}`}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_down_red.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>
                                {isAuthenticated && <LoaderContainer loading={Staff_Retention_Toptileloading} height={'5rem'} >
                                  <div className="bg-[#322D2B] p-[14px] 3xl:p-[0.729vw rounded-[8px] 3xl:rounded-[0.417vw]">
                                    <div className="text-white text-[10px] 3xl:text-[0.625vw] leading-[120%]">
                                      Staff <br />
                                      Retention (10Y Retention Rate)
                                    </div>
                                    <div className="mt-[7px] 3xl:mt-[0.365vw]">
                                      <div className="flex gap-1 items-center text-white text-[16px] 2xl:text-[17px] 3xl:text-[0.885vw]  font-[600] leading-[1.3]">
                                        {Staff_Retention_Toptile[1]?.VALUE?.toFixed(0) + "%"}
                                        {/* <span
                                        className="flex gap-1.5 items-center bg-[#FDE8E8] text-[#374151] font-[500]  text-[10px] 2xl:text-[10px] 3xl:text-[0.521vw] 
                                    px-[8px] 3xl:px-[0.317vw] py-[4px] 3xl:py-[0.208vw] rounded-sm"
                                      >
                                        LY Var: -%
                                        <Image
                                          src="/images/arrow_up_green.svg"
                                          width={10}
                                          height={10}
                                          alt=""
                                        />
                                      </span> */}
                                      </div>
                                    </div>
                                  </div>
                                </LoaderContainer>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className=" text-white powered-by pb-[15px] lg:hidden">
          <span className="text-sm gap-2 flex justify-end">
            <p className="powered-by-text">Powered by</p>
            <Image src="/k12logo.png" width={150} height={25} className="" alt="" />
          </span>
        </div>
            </div>
          </Layout>
        </div>
        <div className="absolute bottom-4 right-4 text-white powered-by hidden lg:block">
          <span className="text-sm gap-2 flex">
            <p className="powered-by-text">Powered by</p>
            <Image src="/k12logo.png" width={150} height={25} className="ml-auto" alt="" />
          </span>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard;
