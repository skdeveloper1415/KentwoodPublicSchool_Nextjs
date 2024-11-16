"use client";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Inter } from "next/font/google";
import { ScrollPanel } from "primereact/scrollpanel";
import Link from "next/link";
import KeyInitiatives from "../../components/cards/keyinitiatives";
import KeyIndicators from "../../components/cards/keyindicators";
import Image from "next/image";
import Layout from "../../components/layout/pagelayout";
import ImpactDiverseStaff from "../../components/popup/diversestaff";
import KeyIndicatorsPopup from "../../components/popup/keyindicatorspopup";
import WholeChildEnvironment from "../../components/popup/environments";
import WholeChildEnvironmentIndicator from "../../components/popup/environmentsindicator";
import OpportunityKeyIndicatorsPopup from "../../components/popup/opportunitykeyindicatorspopup";
import EquitableOpportunitiesOutcome from "../../components/popup/equitableopportunities";
import CultureofExcellenceKeyIndicators from "../../components/popup/cultureofexcellencekeyindicatorspopup";
import StaffdiversityPopup from "../../components/popup/staffdiversity";
import Advancedplacement from "../../components/popup/advancedplacement";
import { OverlayPanel } from 'primereact/overlaypanel';
import CultureofExcellenceKeyIndicatorsSecond from "../../components/popup/cultureofexcellencekeyindicatorsecond";
import FreshmanonTrack from "../../components/popup/freshmanonTrack";
import FourYearGraduationRate from "../../components/popup/fourYearGraduationRate";
import SatAssessment from "../../components/popup/satAssessment";
import CultureofExcellenceThird from "../../components/popup/culturalexcellencethird";
import CultureofExcellenceFourth from "../../components/popup/culturalexcellancefourth";
import InitiativeCultural from "../../components/popup/initiativecultural";
import Staffintention from "../../components/popup/fundbalance";
import Fundbalance from "../../components/popup/fundbalance";
import Enrollment from "../../components/popup/enrollment";
import KeyIndicatorsWholeChildePopup from "../../components/popup/keyindicatorwholechildepopup";
import Student from "../../components/popup/student";
import { useDispatch, useSelector } from "react-redux";
import { fetchCulture_Key_Initiative_Bar, fetchCulture_Key_Initiative_Toptile, fetchEquitable_Key_Initiative_Bar, fetchEquitable_Key_Initiative_Toptile, 
  fetchWhole_Child_Key_Initiative_Bar, fetchWhole_Child_Key_Initiative_Toptile, fetchHigh_Impact_Key_Initiative_Bar, fetchHigh_Impact_Key_Initiative_Toptile, fetchBenchmark_Assessment_Reading_Toptile, 
  fetchBenchmark_Assessment_Reading_Bar, fetchBenchmark_Assessment_Mathematics_Toptile, fetchBenchmark_Assessment_Mathematics_Bar, fetchState_Assessment_ELA_Toptile, fetchState_Assessment_ELA_Bar, fetchFreshmen_on_Track_Toptile, 
  fetchFreshmen_on_Track_Bar, fetchAdvanced_Placement_Toptile, fetchAdvanced_Placement_Bar, fetchSAT_Assessment_Toptile, fetchSAT_Assessment_Bar, fetchChronic_Absenteeism_Toptile, fetchChronic_Absenteeism_Bar, fetchStudent_Belonging_Toptile, 
  fetchStudent_Belonging_Bar, fetchOut_of_School_Suspensions_Toptile, fetchOut_of_School_Suspensions_Bar, fetchStaff_Engagement_Toptile, fetchStaff_Engagement_Bar, fetchStaff_DIversity_Toptile, fetchStaff_DIversity_Bar, fetchStaff_Retention_Toptile, 
  fetchStaff_Retention_Bar, fetchFund_Balance_Toptile, fetchFund_Balance_Bar, fetchGraduation_Rate_Toptile, fetchGraduation_Rate_Bar, fetchState_Assessment_Mathematics_Toptile, fetchState_Assessment_Mathematics_Bar} from "../../redux/slices/home";
import {fetchCulture_Year, fetchEquitable_Year, fetchWhole_Child_Year, fetchHigh_Impact_Year} from "../../redux/slices/Options"
import LoaderContainer from "../../components/LoaderContainer";
import { FormatNum, GenerateGradiantColorForechartsBars, getRankSuffix, toMillion } from "../../components/utils";


const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// const ChartSplitLine = ({x,y,color})=>{
//   const data = []
//   if(x){
//     data.push(
//       { // Vertical line
//         xAxis: x
//       }
//     )
//   }
//   if(y){
//     data.push(
//       { // Horizontal line
//         yAxis: y
//       }
//     )
//   }

//   return {
//     symbol: 'none', // Remove symbols
//     lineStyle: {
//       type: 'solid',
//       // color: color ? color : '#fff',
//       // color: color ? color : '#5a6b7a',
//       color: color ? color : 'grey',
//       // color: color ? color : '#FFFFFF80',
//       width: 2, // Adjust the width to make it more visible
//       opacity: .5
//     },
//     label:{
//       show: false
//     },
//     data: data,
//     silent: true // This will hide the tooltip for the markLine   
// }
// }


const Goals = () => {
  const globalState = useSelector(state => state.global)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [KeyIndicatorsWholeChilde, setKeyIndicatorsWholeChilde] = useState(false);
  const [ShowStaffdiversity, setShowStaffdiversity] = useState(false);
  const [showFundbalancePopup, setshowFundbalancePopup] = useState(false);

  const [activeIndexList, setActiveIndexList] = useState(globalState?.ActiveTabTile || 0);
  const [activeKeyInitiativeTile,setactiveKeyInitiativeTile] = useState(null)

  const op = useRef(null);

  useEffect(() => {
    setIsAuthenticated(JSON?.parse(sessionStorage.getItem("isAuthenticated")))
  },[])

  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const toggleOverlay = (e) => {
    op.current.toggle(e);
    setOverlayOpen(!isOverlayOpen);
  };

/* redux States */
  const Culture_Key_Initiative_Barloading = useSelector(state => state.home.Culture_Key_Initiative_Barloading)
  const Culture_Key_Initiative_Bar = useSelector(state => state.home.Culture_Key_Initiative_Bar)

  const Culture_Key_Initiative_Toptileloading = useSelector(state => state.home.Culture_Key_Initiative_Toptileloading)
  const Culture_Key_Initiative_Toptile = useSelector(state => state.home.Culture_Key_Initiative_Toptile)
  
  const Equitable_Key_Initiative_Barloading = useSelector(state => state.home.Equitable_Key_Initiative_Barloading)
  const Equitable_Key_Initiative_Bar = useSelector(state => state.home.Equitable_Key_Initiative_Bar)

  const Equitable_Key_Initiative_Toptileloading = useSelector(state => state.home.Equitable_Key_Initiative_Toptileloading)
  const Equitable_Key_Initiative_Toptile = useSelector(state => state.home.Equitable_Key_Initiative_Toptile)

  const Whole_Child_Key_Initiative_Barloading = useSelector(state => state.home.Whole_Child_Key_Initiative_Barloading)
  const Whole_Child_Key_Initiative_Bar = useSelector(state => state.home.Whole_Child_Key_Initiative_Bar)
  
  const Whole_Child_Key_Initiative_Toptileloading = useSelector(state => state.home.Whole_Child_Key_Initiative_Toptileloading)
  const Whole_Child_Key_Initiative_Toptile = useSelector(state => state.home.Whole_Child_Key_Initiative_Toptile)

  const High_Impact_Key_Initiative_Barloading = useSelector(state => state.home.High_Impact_Key_Initiative_Barloading)
  const High_Impact_Key_Initiative_Bar = useSelector(state => state.home.High_Impact_Key_Initiative_Bar)

  const High_Impact_Key_Initiative_Toptileloading = useSelector(state => state.home.High_Impact_Key_Initiative_Toptileloading)
  const High_Impact_Key_Initiative_Toptile = useSelector(state => state.home.High_Impact_Key_Initiative_Toptile)

  const Benchmark_Assessment_Reading_Toptileloading = useSelector(state => state.home.Benchmark_Assessment_Reading_Toptileloading)
  const Benchmark_Assessment_Reading_Toptile = useSelector(state => state.home.Benchmark_Assessment_Reading_Toptile)

  const Benchmark_Assessment_Reading_Barloading = useSelector(state => state.home.Benchmark_Assessment_Reading_Barloading)
  const Benchmark_Assessment_Reading_Bar = useSelector(state => state.home.Benchmark_Assessment_Reading_Bar)
  
  const Benchmark_Assessment_Mathematics_Toptileloading = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Toptileloading)
  const Benchmark_Assessment_Mathematics_Toptile = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Toptile)

  const Benchmark_Assessment_Mathematics_Barloading = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Barloading)
  const Benchmark_Assessment_Mathematics_Bar = useSelector(state => state.home.Benchmark_Assessment_Mathematics_Bar)

  const State_Assessment_ELA_Toptileloading = useSelector(state => state.home.State_Assessment_ELA_Toptileloading)
  const State_Assessment_ELA_Toptile = useSelector(state => state.home.State_Assessment_ELA_Toptile)

  const State_Assessment_ELA_Barloading = useSelector(state => state.home.State_Assessment_ELA_Barloading)
  const State_Assessment_ELA_Bar = useSelector(state => state.home.State_Assessment_ELA_Bar)

  const Freshmen_on_Track_Toptileloading = useSelector(state => state.home.Freshmen_on_Track_Toptileloading)
  const Freshmen_on_Track_Toptile = useSelector(state => state.home.Freshmen_on_Track_Toptile)

  const Freshmen_on_Track_Barloading = useSelector(state => state.home.Freshmen_on_Track_Barloading)
  const Freshmen_on_Track_Bar = useSelector(state => state.home.Freshmen_on_Track_Bar)

  const Graduation_Rate_Toptileloading = useSelector(state => state.home.Graduation_Rate_Toptileloading)
  const Graduation_Rate_Toptile = useSelector(state => state.home.Graduation_Rate_Toptile)

  const Graduation_Rate_Barloading = useSelector(state => state.home.Graduation_Rate_Barloading)
  const Graduation_Rate_Bar = useSelector(state => state.home.Graduation_Rate_Bar)

  const Advanced_Placement_Toptileloading = useSelector(state => state.home.Advanced_Placement_Toptileloading)
  const Advanced_Placement_Toptile = useSelector(state => state.home.Advanced_Placement_Toptile)

  const Advanced_Placement_Barloading = useSelector(state => state.home.Advanced_Placement_Barloading)
  const Advanced_Placement_Bar = useSelector(state => state.home.Advanced_Placement_Bar)

  const SAT_Assessment_Toptileloading = useSelector(state => state.home.SAT_Assessment_Toptileloading)
  const SAT_Assessment_Toptile = useSelector(state => state.home.SAT_Assessment_Toptile)

  const SAT_Assessment_Barloading = useSelector(state => state.home.SAT_Assessment_Barloading)
  const SAT_Assessment_Bar = useSelector(state => state.home.SAT_Assessment_Bar)

  const Chronic_Absenteeism_Toptileloading = useSelector(state => state.home.Chronic_Absenteeism_Toptileloading)
  const Chronic_Absenteeism_Toptile = useSelector(state => state.home.Chronic_Absenteeism_Toptile)

  const Chronic_Absenteeism_Barloading = useSelector(state => state.home.Chronic_Absenteeism_Barloading)
  const Chronic_Absenteeism_Bar = useSelector(state => state.home.Chronic_Absenteeism_Bar)

  const Student_Belonging_Toptileloading = useSelector(state => state.home.Student_Belonging_Toptileloading)
  const Student_Belonging_Toptile = useSelector(state => state.home.Student_Belonging_Toptile)

  const Student_Belonging_Barloading = useSelector(state => state.home.Student_Belonging_Barloading)
  const Student_Belonging_Bar = useSelector(state => state.home.Student_Belonging_Bar)

  const Out_of_School_Suspensions_Toptileloading = useSelector(state => state.home.Out_of_School_Suspensions_Toptileloading)
  const Out_of_School_Suspensions_Toptile = useSelector(state => state.home.Out_of_School_Suspensions_Toptile)

  const Out_of_School_Suspensions_Barloading = useSelector(state => state.home.Out_of_School_Suspensions_Barloading)
  const Out_of_School_Suspensions_Bar = useSelector(state => state.home.Out_of_School_Suspensions_Bar)

  const Staff_Engagement_Toptileloading = useSelector(state => state.home.Staff_Engagement_Toptileloading)
  const Staff_Engagement_Toptile = useSelector(state => state.home.Staff_Engagement_Toptile)

  const Staff_Engagement_Barloading = useSelector(state => state.home.Staff_Engagement_Barloading)
  const Staff_Engagement_Bar = useSelector(state => state.home.Staff_Engagement_Bar)

  const Staff_DIversity_Toptileloading = useSelector(state => state.home.Staff_DIversity_Toptileloading)
  const Staff_DIversity_Toptile = useSelector(state => state.home.Staff_DIversity_Toptile)

  const Staff_DIversity_Barloading = useSelector(state => state.home.Staff_DIversity_Barloading)
  const Staff_DIversity_Bar = useSelector(state => state.home.Staff_DIversity_Bar)

  const Staff_Retention_Toptileloading = useSelector(state => state.home.Staff_Retention_Toptileloading)
  const Staff_Retention_Toptile = useSelector(state => state.home.Staff_Retention_Toptile)

  const Staff_Retention_Barloading = useSelector(state => state.home.Staff_Retention_Barloading)
  const Staff_Retention_Bar = useSelector(state => state.home.Staff_Retention_Bar)

  const Fund_Balance_Toptileloading = useSelector(state => state.home.Fund_Balance_Toptileloading)
  const Fund_Balance_Toptile = useSelector(state => state.home.Fund_Balance_Toptile)

  const Fund_Balance_Barloading = useSelector(state => state.home.Fund_Balance_Barloading)
  const Fund_Balance_Bar = useSelector(state => state.home.Fund_Balance_Bar)

  const State_Assessment_Mathematics_Toptileloading = useSelector(state => state.home.State_Assessment_Mathematics_Toptileloading)
  const State_Assessment_Mathematics_Toptile = useSelector(state => state.home.State_Assessment_Mathematics_Toptile)

  const State_Assessment_Mathematics_Barloading = useSelector(state => state.home.State_Assessment_Mathematics_Barloading)
  const State_Assessment_Mathematics_Bar = useSelector(state => state.home.State_Assessment_Mathematics_Bar)

  /* DropDown Options */
  const Culture_Year = useSelector(state => state.options.Culture_Year);
  const Culture_Yearloading = useSelector(state => state.options.Culture_Yearloading);

  const Equitable_Year = useSelector(state => state.options.Equitable_Year);
  const Equitable_Yearloading = useSelector(state => state.options.Equitable_Yearloading);

  const Whole_Child_Year = useSelector(state => state.options.Whole_Child_Year);
  const Whole_Child_Yearloading = useSelector(state => state.options.Whole_Child_Yearloading);

  const High_Impact_Year = useSelector(state => state.options.High_Impact_Year);
  const High_Impact_Yearloading = useSelector(state => state.options.High_Impact_Yearloading);
  /*  */

/* */


/* API Calls */
const dispatch = useDispatch();

// Dropdown Options
useEffect(()=>{
  dispatch(fetchCulture_Year({
    "elasticQueryName": "",
    "filters": [],
    "dynamicColumns": [],
  }))


  dispatch(fetchEquitable_Year({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
  }))


  dispatch(fetchWhole_Child_Year({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
  }))


  dispatch(fetchHigh_Impact_Year({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
  })) 
},[])
//

useEffect(()=>{
  if(activeIndexList == 0){
    dispatch(fetchCulture_Key_Initiative_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchCulture_Key_Initiative_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Reading_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Reading_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Mathematics_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchBenchmark_Assessment_Mathematics_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_ELA_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_ELA_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_Mathematics_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchState_Assessment_Mathematics_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchSAT_Assessment_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchSAT_Assessment_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))
  } else if(activeIndexList == 1){

    dispatch(fetchEquitable_Key_Initiative_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchEquitable_Key_Initiative_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFreshmen_on_Track_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFreshmen_on_Track_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchGraduation_Rate_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchGraduation_Rate_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchAdvanced_Placement_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchAdvanced_Placement_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFund_Balance_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchFund_Balance_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

  } else if(activeIndexList == 2){

    dispatch(fetchWhole_Child_Key_Initiative_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchWhole_Child_Key_Initiative_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchChronic_Absenteeism_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchChronic_Absenteeism_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStudent_Belonging_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStudent_Belonging_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchOut_of_School_Suspensions_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))
  
    dispatch(fetchOut_of_School_Suspensions_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))
  } else if(activeIndexList == 3){

    dispatch(fetchHigh_Impact_Key_Initiative_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchHigh_Impact_Key_Initiative_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Engagement_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Engagement_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_DIversity_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_DIversity_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Retention_Toptile({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

    dispatch(fetchStaff_Retention_Bar({
      "elasticQueryName": "",
      "filters": [],
      "dynamicColumns": [],
    }))

  }

},[activeIndexList])
/* */

/*  */

const [activeTopTileData,setActiveTopTileData] = useState([])
useEffect(()=>{
  if (activeIndexList == 0){
    setActiveTopTileData(Culture_Key_Initiative_Toptile)
  } else if (activeIndexList == 1) {
    setActiveTopTileData(Equitable_Key_Initiative_Toptile)
  } else if (activeIndexList == 2) {
    setActiveTopTileData(Whole_Child_Key_Initiative_Toptile)
  } else if (activeIndexList == 3) {
    setActiveTopTileData(High_Impact_Key_Initiative_Toptile)
  }
},[activeIndexList, Culture_Key_Initiative_Toptile, Equitable_Key_Initiative_Toptile, Whole_Child_Key_Initiative_Toptile, High_Impact_Key_Initiative_Toptile])

const TopTiles = useMemo(()=>{
  return activeTopTileData.reduce((acc,item)=>{
    let {METRIC_NAME,...rest} = item
    acc[METRIC_NAME] = rest
    return acc
  },{})
},[activeTopTileData])

const [activemainTileBarData,setActivemainTileBarData] = useState([])
useEffect(()=>{
  if (activeIndexList == 0){
    setActivemainTileBarData(Culture_Key_Initiative_Bar)
  } else if (activeIndexList == 1) {
    setActivemainTileBarData(Equitable_Key_Initiative_Bar)
  } else if (activeIndexList == 2) {
    setActivemainTileBarData(Whole_Child_Key_Initiative_Bar)
  } else if (activeIndexList == 3) {
    setActivemainTileBarData(High_Impact_Key_Initiative_Bar)
  }
},[activeIndexList, Culture_Key_Initiative_Bar, Equitable_Key_Initiative_Bar, Whole_Child_Key_Initiative_Bar, High_Impact_Key_Initiative_Bar])

const main_Tiles_Bar = useMemo(()=>{
  let Labels = {}
  let data = activemainTileBarData.reduce((acc,item)=>{
    let {METRIC_NAME,...rest} = item
    if (!acc[METRIC_NAME]){
      acc[METRIC_NAME] = {[rest["STATUS"]]: {[rest["BOARD"]]: 0}, DESCRIPTION: {[rest["BOARD"]]: rest["DESCRIPTION"]}}
      Labels[METRIC_NAME] = [rest["BOARD"]]
    }
    else if (acc[METRIC_NAME] && !acc[METRIC_NAME][rest["STATUS"]]){
      acc[METRIC_NAME] = {...acc[METRIC_NAME],[rest["STATUS"]]: {[rest["BOARD"]]: 0}}
      acc[METRIC_NAME]["DESCRIPTION"] = {...acc[METRIC_NAME]["DESCRIPTION"],[rest["BOARD"]]: rest["DESCRIPTION"]}
      Labels[METRIC_NAME].push(rest["BOARD"])
    }
    else if (!acc[METRIC_NAME][rest["STATUS"]][rest["BOARD"]]){
      acc[METRIC_NAME][rest["STATUS"]] = {...acc[METRIC_NAME][rest["STATUS"]],[rest["BOARD"]]: 0}
      acc[METRIC_NAME]["DESCRIPTION"] = {...acc[METRIC_NAME]["DESCRIPTION"],[rest["BOARD"]]: rest["DESCRIPTION"]}
      Labels[METRIC_NAME].push(rest["BOARD"])
    }
    acc[METRIC_NAME][rest["STATUS"]][rest["BOARD"]] += rest?.VALUE || 0
    return acc
  },{})

  for (let key in Labels) {
    Labels[key] = [...new Set(Labels[key])].sort((a,b) => b?.localeCompare(a))
  }

  for (let Tile in data){
    for (let status in data[Tile]){
      if (status != "DESCRIPTION"){
        data[Tile][status] = Labels[Tile].map(key => data[Tile][status][key] || 0)
      }
    }
  }

  return {data: data, Label: Labels}
},[activemainTileBarData])

/*  */
  // Year Dropdown Opts
  const Culture_Year_opt = useMemo(()=>{
    const data = Culture_Year.reduce((acc,item)=>{
      if (!acc[item?.["METRIC_NAME"]]){
        acc[item?.["METRIC_NAME"]] = []
      }
      acc[item?.["METRIC_NAME"]].push({name: item?.SCHOOL_YEAR, code: item?.SCHOOL_YEAR})
      return acc
    },{})

    for (let tile in data){
      data[tile] = data[tile]?.sort((a,b)=> b?.name?.localeCompare(a?.name))
    }

    return data
  },[Culture_Year])

  const Equitable_Year_opt = useMemo(()=>{
    const data = Equitable_Year.reduce((acc,item)=>{
      if (!acc[item?.["METRIC_NAME"]]){
        acc[item?.["METRIC_NAME"]] = []
      }
      acc[item?.["METRIC_NAME"]].push({name: item?.SCHOOL_YEAR, code: item?.SCHOOL_YEAR})
      return acc
    },{})

    for (let tile in data){
      data[tile] = data[tile]?.sort((a,b)=> b?.name?.localeCompare(a?.name))
    }

    return data
  },[Equitable_Year])

  const Whole_Child_Year_opt = useMemo(()=>{
    const data = Whole_Child_Year.reduce((acc,item)=>{
      if (!acc[item?.["METRIC_NAME"]]){
        acc[item?.["METRIC_NAME"]] = []
      }
      acc[item?.["METRIC_NAME"]].push({name: item?.SCHOOL_YEAR, code: item?.SCHOOL_YEAR})
      return acc
    },{})

    for (let tile in data){
      data[tile] = data[tile]?.sort((a,b)=> b?.name?.localeCompare(a?.name))
    }

    return data
  },[Whole_Child_Year])

  const High_Impact_Year_opt = useMemo(()=>{
    const data = High_Impact_Year.reduce((acc,item)=>{
      if (!acc[item?.["METRIC_NAME"]]){
        acc[item?.["METRIC_NAME"]] = []
      }
      acc[item?.["METRIC_NAME"]].push({name: item?.SCHOOL_YEAR, code: item?.SCHOOL_YEAR})
      return acc
    },{})

    for (let tile in data){
      data[tile] = data[tile]?.sort((a,b)=> b?.name?.localeCompare(a?.name))
    }

    return data
  },[High_Impact_Year])
  // 

  const [ImpactDiverseStaffpopup, setImpactDiverseStaffpopup] = useState(false);
  const [Indicatorspopup, setIndicatorspopup] = useState(false);
  const [WholeChildEnvironmentpopup, setWholeChildEnvironmentspopup] = useState(false);
  const [WholeChildEnvironmentIndicatorpopup, setWholeChildEnvironmentsIndicatorpopup] = useState(false);
  const [enrollmentpopup, setEnrollmentpopup] = useState(false);
  const [studentpopup, setStudentpopup] = useState(false);
  const [OpportunityIndicatorspopup, setOpportunityIndicatorspopup] = useState(false);
  const [EquitableOpporpopup, setEquitableOpporpopup] = useState(false);
  const [CultureIndicatorspopup, setCultureIndicatorspopup] = useState(false);
  const [advancedPlacementPopup, setAdvancedPlacementPopup] = useState(false);
  const [CultureIndicatorssecond, setCultureIndicatorssecond] = useState(false);
  const [freshmanonTrackpopup, setFreshmanonTrackpopup] = useState(false);
  const [fourYearGraduationRatepopup, setFourYearGraduationRatepopup] = useState(false);
  const [satAssessmentPopup, setSatAssessmentPopup] = useState(false);
  const [cultureIndicatorsthird, setCultureIndicatorsthird] = useState(false);
  const [cultureIndicatorsfourth, setCultureIndicatorsfourth] = useState(false);
  const [cultureinitiativeone, setCultureinitiativeone] = useState(false);

  // const APChart_Colors = ["#F076B2","#EDC948","#B7E1CD","#0090FF","#B07AA1"]
  const APChart_Colors = ["#2A5783","#4776A4","#6798C1","#8BBADC","#B9DDF1"]
  const OSSChart_Colors = ["#24693D","#29793E","#6DB562","#94D484","#B3E0A6"]
  const StaffChart_Colors = ["#59504E","#98908C","#98908C","#DCD4D0","#F2F2F2","#98908C"]

  // verticleChartData={Advanced_Placement_Bar.map((item,i) => ({value: item?.AVERAGE_AP_PER, itemStyle: {color: APChart_Colors[i % APChart_Colors.length]}}))}

  const APChart = useMemo(()=>{
    let Labels = []
    let data = Advanced_Placement_Bar.reduce((acc,item)=>{
      let {ETHNICITY,...rest} = item
      if (!acc[ETHNICITY]){
        acc[ETHNICITY] = {[rest?.GROUP]: 0}
        Labels.push(rest?.GROUP)
      }
      else if (!acc[ETHNICITY][rest?.GROUP]){
        acc[ETHNICITY] = {...acc[ETHNICITY],[rest?.GROUP]: 0}
        Labels.push(rest?.GROUP)
      }
      acc[ETHNICITY][rest?.GROUP] += rest?.AVERAGE_AP_PER
      return acc
    },{})

    Labels = [...new Set(Labels)].sort()
    let _data = {}
    let i=0
    for (let Ethnicity in data){
      _data[Ethnicity] = Labels.map(item => ({value: data[Ethnicity][item], itemStyle: {color: APChart_Colors[i % APChart_Colors.length]}}))
      i+=1
    }

    return {value: _data, label: Labels,data:data}
  },[Advanced_Placement_Bar])

  const OSSChart = useMemo(()=>{
    let Labels = []
    let data = Out_of_School_Suspensions_Bar.reduce((acc,item)=>{
      let {STUDENT_GROUP,...rest} = item
      if (!acc[STUDENT_GROUP]){
        acc[STUDENT_GROUP] = {[rest?.["METRIC_NAME"]]: 0}
        Labels.push(rest?.["METRIC_NAME"])
      }
      else if (!acc[STUDENT_GROUP][rest?.["METRIC_NAME"]]){
        acc[STUDENT_GROUP] = {...acc[STUDENT_GROUP],[rest?.["METRIC_NAME"]]: 0}
        Labels.push(rest?.["METRIC_NAME"])
      }
      acc[STUDENT_GROUP][rest?.["METRIC_NAME"]] += rest?.OSS_RATE
      return acc
    },{})

    // Labels = [...new Set(Labels)].sort()
    Labels = [...new Set(Labels)]

    let _data = {}
    let i=0
    for (let STUDENT_GROUP in data){
      _data[STUDENT_GROUP] = Labels.map(item => ({value: data[STUDENT_GROUP][item], itemStyle: {color: OSSChart_Colors[i % OSSChart_Colors.length]}}))
      i+=1
    }

    return {value: _data, label: Labels,data:data}
  },[Out_of_School_Suspensions_Bar])

  // const StaffDiversityChart = useMemo(()=>{
  //   let Labels = []
  //   let data = Staff_DIversity_Bar.reduce((acc,item)=>{
  //     let {Race,...rest} = item
  //     if (!acc[Race]){
  //       acc[Race] = {[rest?.Role]: 0}
  //       Labels.push(rest?.Role)
  //     }
  //     else if (!acc[Race][rest?.Role]){
  //       acc[Race] = {...acc[Race],[rest?.Role]: 0}
  //       Labels.push(rest?.Role)
  //     }
  //     acc[Race][rest?.Role] += rest?.KPS_values
  //     return acc
  //   },{})

  //   Labels = [...new Set(Labels)].sort()
  //   let _data = {}
  //   let i=0
  //   for (let Race in data){
  //     _data[Race] = Labels.map(item => ({value: data[Race][item], itemStyle: {color: StaffChart_Colors[i % StaffChart_Colors.length]}}))
  //     i+=1
  //   }

  //   return {value: _data, label: Labels,data:data}
  // },[Staff_DIversity_Bar])

  const StaffDiversityChart = useMemo(()=>{
    let Labels = []
    let data = Staff_DIversity_Bar.reduce((acc,item)=>{
      let {["ROLE"]:Dimension,...rest} = item
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
    // Chart Option
    const colors = ["#cfcfcf", "#a9a9a9", "#848484", "#5e5e5e", "#484848", "#323232", "#3f3f3f"]
    let Option = {
        title: {
            text: 'Teachers',
            left: 'left',
            top: 'top',
            textStyle: {
              color: '#E5E7EB',            // Title color
              fontSize: 14              // Title font size
            }
        },
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
            top: '30%',   // Adjust grid to leave space for the top axis
            bottom: '20%', // Adjust grid to leave space for the bottom axis labels
            left: '20%'
        },
        yAxis: [
            {
                type: 'category',
                position: 'right', // Move main category axis to the top
                // data: ['1-Year', '5-Year', '10-Year'],
                data: Labels,
                splitLine: {     // Add split lines between categories
                    show: false,
                    lineStyle: {
                        color: '#374151'
                    }
                },
                axisTick: {
                    alignWithLabel: false,
                    show: false  // Remove ticks on bottom axis
                },
                axisLine: {
                    show: false,   // Line for the bottom axis
                    lineStyle: {
                        color: '#374151'
                      }
                },
                axisLabel:{
                    color: '#E5E7EB',
                    show: false,
                }
            },
            {
                type: 'category',
                position: 'left', // Series names as the bottom x-axis
                // data: ['Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall'],
                data: Array(Labels.length || 0).fill(["Statewide", "KPS"]).flat(),
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
                    // interval: 0, // Ensure all labels are shown, not skipped
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
        
        series: Object.entries(_data || {}).reduce((acc,[key,value],i)=>{
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
  },[Staff_DIversity_Bar])
  
  const Fund_Balance_Bar_year = useMemo(() => {
      return [...Fund_Balance_Bar].sort((a,b) => a?.YEAR?.localeCompare(b?.YEAR))

  },[Fund_Balance_Bar])

  const Staff_Engagement_BarChart = useMemo(()=>{
    const minmaxofvalues = ((arr)=>{
      const data = arr.map(item => item?.PERCENTILE)
      const min = Math.min(...data)
      const max = Math.max(...data)
  
      return {min:min,max:max}
    })(Staff_Engagement_Bar)
  
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
              repulsion: 200, // Adjust this value to control spacing
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
          data: Staff_Engagement_Bar.map(item=>({
            name: item?.ROLE,
            value: item?.PERCENTILE,
            value1: item?.TOTAL_STAFF
          }))?.sort((a,b)=> a?.value - b?.value),
          symbolSize: function (val,params) {
              // Adjust the size based on your data
              // return 150; // Square root for better scaling
              return interpolateSize(val,minmaxofvalues,90,120); // Square root for better scaling
          },
          label: {
              show: true,
              // color: '#000',
              width: 75,
              overflow: 'truncate',
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
  },[Staff_Engagement_Bar])

  
  const CulturalIndicatoeColorRange = {
    startColor: "rgb(248, 130, 107)",
    endColor: "rgb(227, 62, 67)"
  }
  const EquitableIndicatoeColorRange = {
    startColor: "rgb(139, 186, 220)",
    endColor: "rgb(42, 87, 131)"
  }
  const WholeIndicatoeColorRange = {
    startColor: "rgb(179, 224, 166)",
    endColor: "rgb(36, 105, 61)"
  }
  const HighIndicatoeColorRange = {
    startColor: "rgb(242, 242, 242)",
    endColor: "rgb(186,176,172)"
  }


  return (

    <div className="goals-bg">
      <Layout
        setActiveIndexList={setActiveIndexList}
        pageTitle="Strategic Plan Dashboard"
        parentPageName="Kentwood Public School Strategic Dashboard"
        pageName="Strategic Plan Dashboard">
        <div className="relative pointer-events-none hidden md:block">
          <div className="flex justify-center items-center fixed top-5 right-0 left-0 z-[100] select-none">
            <Image src="/images/svg/small-logo.svg" width={146} height={39} alt="" onClick={() => window.open('https://www.kentwoodps.org/ourdistrict/strategic-plan/', '_blank')} className="cursor-pointer pointer-events-auto"/>
          </div>
        </div>
        <div className=" ">
          <div className="flex justify-center items-center gap-[50px] mb-[15px] md:mb-[0]">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.042vw] homebanner_status">
              <div className="col-span-12 white_text_color text-[14px] xl:text-[20px] 3xl:text-[1.146vw] text-center font-bold uppercase">
                {activeIndexList === 0 && <>CULTURE OF <span className='opacity-75'>EXCELLENCE</span></>}
                {activeIndexList === 1 && <>Equitable <span className='opacity-75'>Opportunities & Outcomes</span></>}
                {activeIndexList === 2 && <>Whole-Child <span className='opacity-75'>Environments</span></>}
                {activeIndexList === 3 && <>High Impact, <span className='opacity-75'>Diverse Staff</span></>}
              </div>
            </div>
          </div>

          <div className="">
            <div className="px-[20px] lg:px-[20px] 2xl:px-[4.583vw]">
              <div className="flex justify-between items-center gap-[10px] xl:gap-[30px]">
                <h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                  Goals
                </h3>

                <div className="bg-[#484d54] w-full h-[1px]"></div>
                <div>
                  <Link
                    href="" onClick={toggleOverlay}
                    className="bg-[#773310] text-[14px] xl:text-[14px] 2xl:text-[0.729vw] 3xl:text-[0.729vw]
             px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[12px] xl:py-[11px] 3xl:py-[0.600vw] white_text_color font-normal rounded-sm flex items-center  w-[170px]
             xl:w-[170px]  3xl:w-[8.854vw]"
                  >
                    <i className="ru-location text-[14px] xl:text-[18px] mr-3"></i>
                    Key Resources
                  </Link>
                  {isOverlayOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleOverlay}></div>
                  )}
                  <OverlayPanel ref={op} className="customOverlayPanel z-50">
                    <div className="p-[20px] xl:p-[16px] 3xl:p-[1.042vw] bg-[#1F2A37] rounded-xl">
                      <div className="text-[#fff] text-[20px] xl:text-[16px] 3xl:text-[1.042vw] font font-semibold sticky top-0">Resources
                        <ScrollPanel className="h-[300px] xl:h-[310px] 2xl:h-[400px] 3xl:h-[20.625vw]">
                          <div className="flex flex-col gap-8 xl:gap-6 mt-[24px] xl:mt-[14px] 3xl:mt-[1.25vw]">
                            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                              <div className="text-[#fff] text-[16px] xl:text-[12px] 3xl:text-[0.833vw] font-medium">Student Vision Statement Posters</div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">18x28 Poster - All Statements</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image1.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">11 X 17 Poster - Individual Statements </div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                              <div className="text-[#fff] text-[16px] xl:text-[12px] 3xl:text-[0.833vw] font-medium">Documents & Presentations</div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image2.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">Theory of Action</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image3.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">Strategic Plan/Theory of Action Document</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image4.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">Slide Deck - Vision Statements and Goals</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-4 xl:gap-[0.833vw]">
                              <div className="text-[#fff] text-[16px] xl:text-[12px] 3xl:text-[0.833vw] font-medium">Video Resources</div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image5.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">Strategic Plan Kickoff Video September 2022</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-12 gap-[20px] xl:gap-[1.25vw]">
                                <div className="col-span-3">
                                  <Image
                                    src="/images/Statement_image6.svg"
                                    width={90}
                                    height={120}
                                    className="rounded-md w-full h-full object-cover h-fit"
                                    alt="statement image" />
                                </div>
                                <div className="col-span-9 ">
                                  <div className="text-[#fff] text-[14px] 3xl:text-[0.833vw] font-medium mb-[2px] xl:mb-[3px] 3xl:mb-[0.533vw]">Strategic Planning Process Update March 2023</div>
                                  <button className="flex items-center gap-2 px-[12px] xl:px-[10px] 3xl:px-[0.625vw] py-[6px] xl:py-[4px] 3xl:py-[0.321vw] bg-[#D05156] text-[#fff] rounded-md text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-medium">
                                    <Image
                                      src="/images/download.svg"
                                      width={12}
                                      height={12}
                                      className=""
                                      alt="download icon"
                                    />
                                    Download
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollPanel>
                      </div>
                    </div>
                  </OverlayPanel>

                </div>
              </div>

              <div className="mt-[10px] xl:mt-[10px] 3xl:mt-[0.781vw]">
                <div className="flex flex-wrap">
                  <Link
                    href={""}
                    onClick={() => setActiveIndexList(0)}
                    className={`${activeIndexList === 0
                      ? "bg-neutral-600 text-[#fff] font-light"
                      : "white_text_color font-light"
                      } px-[14px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw] text-[14px] 3xl:text-[0.833vw] leading-tight text-center rounded-[8px] 3xl:rounded-[0.417vw] flex justify-center items-center tracking-normal`}
                  >
                    {" "}
                    Culture of&nbsp;<span className="font-bold">Excellence</span>
                  </Link>
                  <Link
                    href={""}
                    onClick={() => setActiveIndexList(1)}
                    className={`${activeIndexList === 1
                      ? "bg-neutral-600 text-[#fff] font-light"
                      : "white_text_color font-light"
                      } px-[14px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw] text-[14px] 3xl:text-[0.833vw] leading-tight text-center rounded-[8px] 3xl:rounded-[0.417vw] flex justify-center items-center tracking-normal`}
                  >
                    Equitable&nbsp;<span className="font-bold">Opportunities & Outcomes</span>
                  </Link>
                  <Link
                    href={""}
                    onClick={() => setActiveIndexList(2)}
                    className={`${activeIndexList === 2
                      ? "bg-neutral-600 text-[#fff] font-light"
                      : "white_text_color font-light"
                      } px-[14px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw] text-[14px] 3xl:text-[0.833vw] leading-tight text-center rounded-[8px] 3xl:rounded-[0.417vw] flex justify-center items-center tracking-normal`}
                  >
                    Whole-Child&nbsp;<span className="font-bold">Environments</span>
                  </Link>
                  <Link
                    href={""}
                    onClick={() => setActiveIndexList(3)}
                    className={`${activeIndexList === 3
                      ? "bg-neutral-600 text-[#fff] font-light"
                      : "white_text_color font-light"
                      } px-[14px] 3xl:px-[0.833vw] py-[12px] 3xl:py-[0.625vw] text-[14px] 3xl:text-[0.833vw] leading-tight text-center rounded-[8px] 3xl:rounded-[0.417vw] flex justify-center items-center tracking-normal`}
                  >
                    High Impact,&nbsp;<span className="font-bold">Diverse Staff</span>
                  </Link>
                </div>
                <div className="mt-[15px] 2xl:mt-[0.781vw] 3xl:mt-[0.781vw]">
                  <div>
                    {activeIndexList === 0 ? (
                      <>
                        <div className="mb-[10px]">
                          <p className="text-sm xl:text-[16px] 3xl:text-[0.833vw] leading-tight tracking-normal text-[#8a8e93] font-light">
                            Establish, implement and uphold a common standard of excellence for school climate and instruction.
                          </p>
                        </div>
                        {/* <ScrollPanel className="h-[300px] xl:h-[305px] 2xl:h-[450px] 3xl:h-[25.521vw]"> */}
                        <ScrollPanel className="h-screen">
                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Initiatives
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            {/* <ScrollPanel className="h-[360px] xl:h-[360px] 2xl:h-[310px] 3xl:h-[15.625vw]"> */}
                            {/* <div className={`grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.042vw] ${inter.className}`}> */}
                            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[15px] 3xl:gap-[0.781vw] ${inter.className}`}>
                              <LoaderContainer height={"26rem"} loading={Culture_Key_Initiative_Barloading}>
                                <KeyInitiatives
                                  // subtext={"Implement evidence-based instructional practices that are culturally relevant and aligned with high standards of excellence."}
                                  // description={"Duration: Jun 23-May 26"}
                                  // value={"55%"}
                                  subtext={TopTiles["Tile_1"]?.TITLE || ""}
                                  description={`Duration: ${TopTiles["Tile_1"]?.DURATION || '-'}`}
                                  value={TopTiles["Tile_1"]?.DONE_PER}
                                  metricType={"Percentage"}
                                  // pyvar={"10"}
                                  onClick={() => {setactiveKeyInitiativeTile(1);setCultureinitiativeone(true)}}
                                  // data1={[0, 18, 41]}
                                  // data2={[23, 18, 21]}
                                  // data3={[23, 18, 22]}
                                  // dataset={["1.1.3", "1.2.1", "1.1.1"]}
                                  data1={main_Tiles_Bar?.data?.Tile_1?.Done}
                                  data2={main_Tiles_Bar?.data?.Tile_1?.["Working on it"]}
                                  data3={main_Tiles_Bar?.data?.Tile_1?.["Not yet started"]}
                                  chartDesc={main_Tiles_Bar?.data?.Tile_1?.["DESCRIPTION"]}
                                  dataset={main_Tiles_Bar?.Label?.Tile_1}
                                />
                              </LoaderContainer>
                              <LoaderContainer loading={Culture_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Empower educators through a professional learning community (PLC) model to increase student achievement."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"80%"}
                                subtext={TopTiles["Tile_2"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_2"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_2"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                onClick={() => {setactiveKeyInitiativeTile(2);setCultureinitiativeone(true)}}
                                // data1={[23]}
                                // data2={[23]}
                                // data3={[23]}
                                data1={main_Tiles_Bar?.data?.Tile_2?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_2?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_2?.["Not yet started"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_2?.["DESCRIPTION"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_2}
                                barWidth={35}
                                // dataset={["1.1.3"]}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Culture_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Create a classroom culture framework that cultivates high achievement and belonging."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"60%"}
                                subtext={TopTiles["Tile_3"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_3"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_3"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                onClick={() => {setactiveKeyInitiativeTile(3);setCultureinitiativeone(true)}}
                                // data1={[21, 18, 41, 25]}
                                // data2={[23, 18, 21, 21]}
                                // data3={[23, 18, 22, 16]}
                                // data4={[11, 18, 22, 19]}
                                data1={main_Tiles_Bar?.data?.Tile_3?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_3?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_3?.["Not yet started"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_3?.["DESCRIPTION"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_3}


                                // dataset={["1.3.4", "1.3.3", "1.3.2", "1.3.1"]}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Culture_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Expand a multi-tiered system of supports (MTSS) framework in all schools."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"25%"}
                                subtext={TopTiles["Tile_4"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_4"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_4"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                onClick={() => {setactiveKeyInitiativeTile(4);setCultureinitiativeone(true)}}
                                // data1={[23]}
                                // data2={[23]}
                                // data3={[23]}
                                barWidth={35}
                                // dataset={["1.1.3"]}
                                data1={main_Tiles_Bar?.data?.Tile_4?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_4?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_4?.["Not yet started"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_4?.["DESCRIPTION"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_4}
                              />
                              </LoaderContainer>
                            </div>
                          </div>

                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Indicators
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              {isAuthenticated && <>
                              <LoaderContainer loading={Benchmark_Assessment_Reading_Barloading}>
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"i-Ready Benchmark Assessment - Reading"}
                                // statetext={"Reading 2023-24"}
                                // kpstext={"Reading 2023-24"}
                                // value1={"180"}
                                // value2={"180"}
                                // metric2={"Performance Relative to National Norm (Percentile)"}
                                metric2={"Average School Performance Relative to National Norm (Percentile)"}
                                metric1={"KPS Average (Median % Typical Growth Achieved)"}
                                // metrictitle2={"Performance Relative to National Norm(Percentile)"}
                                metrictitle2={"Average School Performance Relative to National Norm (Percentile)"}
                                metrictitle1={"KPS Average (Median % Typical Growth Achieved)"}
                                value2={getRankSuffix(Benchmark_Assessment_Reading_Toptile[0]?.PERFORMANCE_RELATIVE)}
                                value1={Benchmark_Assessment_Reading_Toptile[0]?.KPS_AVERAGE?.toFixed(0) + "%"}
                                abovestateavrg={"Above State Avg"}
                                onClick={() => setCultureIndicatorspopup(true)}
                                BarLabel={Benchmark_Assessment_Reading_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Benchmark_Assessment_Reading_Bar.map(item => ({value: item?.KPS_AVERAGE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Benchmark_Assessment_Reading_Bar.map(item => item?.KPS_AVERAGE), CulturalIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Benchmark_Assessment_Reading_Bar, CulturalIndicatoeColorRange, "KPS_AVERAGE", "YEAR")}
                                formatter={'{value}%'}
                                // Barlabel = {{
                                //   show: true,
                                //   fontSize: 'auto',
                                //   formatter: (params) => params.value ? FormatNum(params.value,0) : "",
                                //   }}
                                seriesname = {"KPS Average (Median % Typical Growyh Achieved)"}
                                tooltipformater={value => value + "%"}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Benchmark_Assessment_Mathematics_Barloading}>
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"i-Ready Benchmark Assessment - Mathematics"}
                                // statetext={"Mathematics 2023-24"}
                                // kpstext={"Mathematics 2023-24"}
                                // value1={"180"}
                                // value2={"180"}
                                // metric2={"Performance Relative to National Norm (Percentile)"}
                                metric2={"Average School Performance Relative to National Norm (Percentile)"}
                                metric1={"KPS Average (Median % Typical Growth Achieved)"}
                                metrictitle2={"Average School Performance Relative to National Norm (Percentile)"}
                                metrictitle1={"KPS Average (Median % Typical Growth Achieved)"}
                                value2={getRankSuffix(Benchmark_Assessment_Mathematics_Toptile[0]?.PERFORMANCE_RELATIVE)}
                                value1={FormatNum(Benchmark_Assessment_Mathematics_Toptile[0]?.KPS_AVERAGE,1) + "%"}
                                onClick={() => setCultureIndicatorssecond(true)}
                                BarLabel={Benchmark_Assessment_Mathematics_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Benchmark_Assessment_Mathematics_Bar.map(item => ({value: item?.KPS_AVERAGE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Benchmark_Assessment_Mathematics_Bar.map(item => item?.KPS_AVERAGE),CulturalIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Benchmark_Assessment_Mathematics_Bar,CulturalIndicatoeColorRange,"KPS_AVERAGE","YEAR")}
                                formatter={value => value?.toFixed(0)+"%"}
                                // Barlabel = {{
                                //   show: true,
                                //   fontSize: 'auto',
                                //   formatter: (params) => params.value ? FormatNum(params.value,0) : "",
                                //   }}
                                seriesname={"KPS Average (Median % Typical Growth Achieved)"}
                                tooltipformater={value => value + "%"}
                              />
                              </LoaderContainer>
                              </>}
                              <LoaderContainer loading={State_Assessment_ELA_Barloading}>
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"M-STEP State Assessment ELA"}
                                // statetext={"ELA 2023-24"}
                                // kpstext={"ELA 2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                metric2={"Statewide Average"}
                                metric1={"KPS ELA Proficient %"}
                                value2={FormatNum(State_Assessment_ELA_Toptile[0]?.STATEWIDE_AVERAGE,1) + '%'}
                                value1={FormatNum(State_Assessment_ELA_Toptile[0]?.KPS_PROFICIENT,1) + "%"}
                                onClick={() => setCultureIndicatorsthird(true)}
                                BarLabel={State_Assessment_ELA_Bar.map(item => item?.YEAR)}
                                // verticleChartData={State_Assessment_ELA_Bar.map(item => ({value: item?.KPS_AVERAGE, itemStyle: {color:'#335D76'}}))}
                                verticleChartData={GenerateGradiantColorForechartsBars(State_Assessment_ELA_Bar, CulturalIndicatoeColorRange, "KPS_AVERAGE", "YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"KPS ELA Proficient % "}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={State_Assessment_Mathematics_Barloading}>
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"M-STEP State Assessment Mathematics"}
                                // statetext={"Mathematics 2023-24"}
                                // kpstext={"Mathematics 2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={FormatNum(State_Assessment_Mathematics_Toptile[0]?.STATEWIDE_AVERAGE,1) + '%'}
                                value1={FormatNum(State_Assessment_Mathematics_Toptile[0]?.KPS_PROFICIENT,1) + "%"}
                                metric2={"Statewide Average"}
                                metric1={"KPS Math Proficient %"}
                                onClick={() => setCultureIndicatorsfourth(true)}
                                BarLabel={State_Assessment_ELA_Bar.map(item => item?.YEAR)}
                                // verticleChartData={State_Assessment_Mathematics_Bar.map(item => ({value: item?.KPS_AVERAGE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(State_Assessment_Mathematics_Bar.map(item => item?.KPS_AVERAGE), CulturalIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(State_Assessment_Mathematics_Bar, CulturalIndicatoeColorRange, "KPS_AVERAGE", "YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"KPS Math Proficient %"}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={SAT_Assessment_Barloading}>
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"SAT Assessment"}
                                // statetext={"Students Passing Grade 9 - 2023-24"}
                                // kpstext={"Students Passing Grade 9 - 2023-24"}
                                // statetext={"2023-24"}
                                // kpstext={"2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={SAT_Assessment_Toptile[0]?.STATEWIDE_AVERAGE?.toFixed(1)}
                                value1={SAT_Assessment_Toptile[1]?.VALUE?.toFixed(1)}
                                metric2={"Statewide Average"}
                                metric1={"Average SAT Score (Total Score)"}
                                // max='100'
                                // interval='50'
                                // verticleChartData={[{ value: 30, itemStyle: { color: '#7A3033' } }, { value: 80, itemStyle: { color: '#335D76' } }, { value: 50, itemStyle: { color: '#7A3033' } }, { value: 90, itemStyle: { color: '#498E71' } }, { value: 70, itemStyle: { color: '#335D76' } },]}
                                onClick={() => setSatAssessmentPopup(true)}
                                BarLabel={SAT_Assessment_Bar.map(item => item?.YEAR)}
                                // verticleChartData={SAT_Assessment_Bar.map(item => ({value: item?.AVERAGE_SAT_SCORE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(SAT_Assessment_Bar.map(item => item?.AVERAGE_SAT_SCORE), CulturalIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(SAT_Assessment_Bar, CulturalIndicatoeColorRange,"AVERAGE_SAT_SCORE", "YEAR")}
                                Barlabel = {{
                                  show: true,
                                  fontSize: 'auto',
                                  formatter: (params) => params.value ? FormatNum(params.value,1) : "",
                                  }}
                                formatter={'{value}'}
                                seriesname={"Average SAT Score (Total Score)"}
                              />
                              </LoaderContainer>
                            </div>
                          </div>
                        </ScrollPanel>
                      </>
                    ) : null}
                  </div>
                  <div>
                    {activeIndexList === 1 ? (
                      <>
                        <div className="mb-[10px]">
                        <p className="text-sm xl:text-[16px] 3xl:text-[0.833vw] leading-tight tracking-normal text-[#8a8e93] font-light">
                            Celebrate diversity, while elevating equity of opportunities and outcomes for each student
                          </p>
                        </div>
                        {/* <ScrollPanel className="h-[300px] xl:h-[305px] 2xl:h-[450px] 3xl:h-[25.521vw]"> */}
                        <ScrollPanel className="h-screen equitable-main">
                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Initiatives
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            {/* <ScrollPanel className="h-[360px] xl:h-[360px] 2xl:h-[310px] 3xl:h-[15.625vw]"> */}
                            {/* <div className={`grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.042vw] ${inter.className}`}> */}
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              <LoaderContainer height={"26rem"} loading={Equitable_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Ensure equitable access to resources and opportunities in each school building"}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"55%"}
                                subtext={TopTiles["Tile_1"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_1"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_1"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                onClick={() => {setactiveKeyInitiativeTile(1);setEquitableOpporpopup(true)}}
                                chartDesc={main_Tiles_Bar?.data?.Tile_1?.["DESCRIPTION"]}
                                data1={main_Tiles_Bar?.data?.Tile_1?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_1?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_1?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_1}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Equitable_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Establish a district-wide strategy to ensure equitable opportunities and outcomes for historically under-resourced and special..."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"80%"}
                                subtext={TopTiles["Tile_2"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_2"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_2"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                // data1={[23]}
                                // data2={[23]}
                                // data3={[23]}
                                barWidth={35}
                                // dataset={["1.1.3"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_2?.["DESCRIPTION"]}
                                data1={main_Tiles_Bar?.data?.Tile_2?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_2?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_2?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_2}
                                onClick={() => {setactiveKeyInitiativeTile(2);setEquitableOpporpopup(true)}}
                              />
                              </LoaderContainer>
                            </div>
                          </div>

                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Indicators
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              <LoaderContainer loading={Freshmen_on_Track_Barloading}>
                              <KeyIndicators
                                subtitle={"Equitable Opportunities & Outcomes"}
                                title={"Freshman on Track"}
                                // statetext={"Students Passing Grade 9 - 2023-24"}
                                // kpstext={"Students Passing Grade 9 - 2023-24"}
                                // statetext={"2023-24"}
                                // kpstext={"2023-24"}
                                // value1={"98%"}
                                // value2={"98%"}
                                value2={FormatNum(Freshmen_on_Track_Toptile[0]?.STATEWIDE_AVERAGE,1) + "%"}
                                value1={FormatNum(Freshmen_on_Track_Toptile[0]?.PER_ON_TRACK,1) + "%"}
                                abovestateavrg={"Above State Avg"}
                                metric2={"Statewide Average"}
                                metric1={"% on Track (Students Passing Grade 9)"}
                                // max='50'
                                // interval='25'
                                // verticleChartData={[{ value: 25, itemStyle: { color: '#335D76' } }, { value: 25, itemStyle: { color: '#335D76' } }, { value: 45, itemStyle: { color: '#335D76' } }, { value: 20, itemStyle: { color: '#7A3033' } }, { value: 49, itemStyle: { color: '#498E71' } },]}
                                onClick={() => setFreshmanonTrackpopup(true)}
                                BarLabel={Freshmen_on_Track_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Freshmen_on_Track_Bar.map(item => ({value: item?.PER_ON_TRACK, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Freshmen_on_Track_Bar.map(item => item?.PER_ON_TRACK), EquitableIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Freshmen_on_Track_Bar, EquitableIndicatoeColorRange,"PER_ON_TRACK","YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"% on Track (Students Passing Grade 9)"}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Graduation_Rate_Barloading}>
                              <KeyIndicators
                                subtitle={"Equitable Opportunities & Outcomes"}
                                title={"Four-Year Graduation Rate"}
                                // statetext={"Students Passing Grade 9 - 2023-24"}
                                // kpstext={"Students Passing Grade 9 - 2023-24"}
                                // statetext={"2023-24"}
                                // kpstext={"2023-24"}
                                // value1={"78%"}
                                // value2={"78%"}
                                value2={FormatNum(Graduation_Rate_Toptile[0]?.STATEWIDE_AVERAGE,1) + '%'}
                                value1={FormatNum(Graduation_Rate_Toptile[0]?.GRADUATION_RATE,1) + "%"}
                                metric2={"Statewide Average"}
                                metric1={"Graduation Rate (Students Graduating on Time)"}
                                // max='20'
                                // interval='10'
                                // verticleChartData={[{ value: 12, itemStyle: { color: '#335D76' } }, { value: 7, itemStyle: { color: '#7A3033' } }, { value: 7, itemStyle: { color: '#7A3033' } }, { value: 12, itemStyle: { color: '#335D76' } }, { value: 20, itemStyle: { color: '#498E71' } },]}
                                onClick={() => setFourYearGraduationRatepopup(true)}
                                BarLabel={Graduation_Rate_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Graduation_Rate_Bar.map(item => ({value: item?.GRADUATION_RATE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Graduation_Rate_Bar.map(item => item?.GRADUATION_RATE), EquitableIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Graduation_Rate_Bar, EquitableIndicatoeColorRange,"GRADUATION_RATE","YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"Graduation Rate (Students Graduating on Time)"}
                              />
                              </LoaderContainer>
                              {isAuthenticated && <LoaderContainer loading={Advanced_Placement_Barloading}>
                              <KeyIndicators
                                subtitle={"Equitable Opportunities & Outcomes"}
                                title={"Advanced Placement (AP)"}
                                // statetext={"Students Passing Grade 9 - 2023-24"}
                                // kpstext={"Students Passing Grade 9 - 2023-24"}
                                // statetext={"2023-24"}
                                // kpstext={"2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={FormatNum(Advanced_Placement_Toptile[1]?.VALUE,1) + "%"}
                                value1={FormatNum(Advanced_Placement_Toptile[0]?.VALUE,1) + "%"}
                                metric1={"Average AP % (Enrollment by Race/Ethnicity)"}
                                metric2={"Average Enrollment %"}
                                // max='100'
                                // interval='50'
                                // verticleChartData={[{ value: 40, itemStyle: { color: '#7A3033' } }, { value: 90, itemStyle: { color: '#498E71' } }, { value: 45, itemStyle: { color: '#335D76' } }, { value: 40, itemStyle: { color: '#7A3033' } }, { value: 90, itemStyle: { color: '#498E71' } },]}
                                onClick={() => setAdvancedPlacementPopup(true)}
                                // BarLabel={Advanced_Placement_Bar.map(item => item?.ETHNICITY)}
                                BarLabel={APChart?.label}
                                // verticleChartData={Advanced_Placement_Bar.map(item => ({value: item?.AVERAGE_AP_PER, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={Advanced_Placement_Bar.map((item,i) => ({value: item?.AVERAGE_AP_PER, itemStyle: {color: APChart_Colors[i % APChart_Colors.length]}}))}
                                verticleChartData={APChart?.value}
                                // seriesname={"Average AP % (Enrollment by Race/Ethnicity)"}
                                stack={'Total'}
                                Barlabel={{
                                  show: true,
                                  color: '#000',
                                  formatter: params => params.value + "%"
                                }}
                                tooltipformater={value => value + "%"}
                                ShowTop={false}
                              />
                              </LoaderContainer>}
                              {/* <LoaderContainer loading={SAT_Assessment_Barloading}>
                              <KeyIndicators
                                subtitle={"Equitable Opportunities & Outcomes"}
                                title={"SAT Assessment"}
                                // statetext={"Students Passing Grade 9 - 2023-24"}
                                // kpstext={"Students Passing Grade 9 - 2023-24"}
                                // statetext={"2023-24"}
                                // kpstext={"2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={SAT_Assessment_Toptile[0]?.STATEWIDE_AVERAGE?.toFixed(1)}
                                value1={SAT_Assessment_Toptile[1]?.VALUE?.toFixed(1)}
                                metric2={"Statewide Average"}
                                metric1={"Average SAT Score (Total Score)"}
                                // max='100'
                                // interval='50'
                                // verticleChartData={[{ value: 30, itemStyle: { color: '#7A3033' } }, { value: 80, itemStyle: { color: '#335D76' } }, { value: 50, itemStyle: { color: '#7A3033' } }, { value: 90, itemStyle: { color: '#498E71' } }, { value: 70, itemStyle: { color: '#335D76' } },]}
                                onClick={() => setSatAssessmentPopup(true)}
                                BarLabel={SAT_Assessment_Bar.map(item => item?.YEAR)}
                                // verticleChartData={SAT_Assessment_Bar.map(item => ({value: item?.AVERAGE_SAT_SCORE, itemStyle: {color:'#335D76'}}))}
                                verticleChartData={GenerateGradiantColorForechartsBars(SAT_Assessment_Bar.map(item => item?.AVERAGE_SAT_SCORE), EquitableIndicatoeColorRange)}
                                Barlabel = {{
                                  show: true,
                                  fontSize: 'auto',
                                  formatter: (params) => params.value ? FormatNum(params.value,1) : "",
                                  }}
                                formatter={'{value}'}
                                seriesname={"Average SAT Score (Total Score)"}
                              />
                              </LoaderContainer> */}
                              <LoaderContainer loading={Fund_Balance_Barloading}>                           
                              <KeyIndicators
                                onClick={() => setshowFundbalancePopup(true)}
                                subtitle={"Equitable Opportunities & Outcomes"}
                                // subtitle={"High Impact, Diverse Staff"}
                                title={"Fund Balance"}
                                // max='100'
                                // interval='50'
                                formatter="{value} %"
                                // statetext={"Mathematics 2023-24"}
                                // kpstext={"Mathematics 2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={toMillion(Fund_Balance_Toptile[0]?.FUND_BALANCE_TOTAL)}
                                value1={Fund_Balance_Toptile[0]?.FUND_BALANCE_PER?.toFixed(1) + "%"}
                                orientation={false}
                                metric2={"Fund Balance Total ($)"}
                                metric1={"Fund Balance % (Balance of Revenue and Expenses)"}
                                BarLabel={Fund_Balance_Bar_year.map(item => item?.YEAR)}
                                // verticleChartData={Fund_Balance_Bar_year.map(item => ({value: item?.FUND_BALANCE_PER, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Fund_Balance_Bar_year.map(item => item?.FUND_BALANCE_PER), EquitableIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Fund_Balance_Bar_year, EquitableIndicatoeColorRange, "FUND_BALANCE_PER", "YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"Fund Balance % (Balance of Revenue and Expenses)"}
                              />
                              </LoaderContainer>
                            </div>
                          </div>
                        </ScrollPanel>
                      </>
                    ) : null}
                    {activeIndexList === 2 ? (
                      <>
                         <div className="mb-[10px]">
                         <p className="text-sm xl:text-[16px] 3xl:text-[0.833vw] leading-tight tracking-normal text-[#8a8e93] font-light">
                            Cultivate an inclusive school environment that recognizes and addresses the whole child - social, emotional, physical and mental wellness, and safety.
                          </p>
                        </div>
                        {/* <ScrollPanel className="h-[300px] xl:h-[305px] 2xl:h-[450px] 3xl:h-[25.521vw]"> */}
                        <ScrollPanel className="h-screen">
                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Initiatives
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            {/* <ScrollPanel className="h-[360px] xl:h-[360px] 2xl:h-[310px] 3xl:h-[15.625vw]"> */}
                            {/* <div className={`grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.042vw] ${inter.className}`}> */}
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              <LoaderContainer height={"26rem"} loading={Whole_Child_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Implement evidence-based instructional practices that are culturally relevant and aligned with high standards of excellence."}
                                // subtext={TopTiles["Tile_1"]?.TITLE || ""}
                                // description={`Duration: ${TopTiles["Tile_1"]?.DURATION || '-'}`}
                                // value={TopTiles["Tile_1"]?.DONE_PER}
                                subtext={TopTiles["Tile_1"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_1"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_1"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                chartDesc={main_Tiles_Bar?.data?.Tile_1?.["DESCRIPTION"]}
                                onClick={() => {setactiveKeyInitiativeTile(1);setWholeChildEnvironmentspopup(true)}}
                                data1={main_Tiles_Bar?.data?.Tile_1?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_1?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_1?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_1}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Whole_Child_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Empower educators through a professional learning community (PLC) model to increase student achievement."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"0%"}
                                subtext={TopTiles["Tile_2"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_2"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_2"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                // data1={[23]}
                                // data2={[23]}
                                // data3={[23]}
                                barWidth={35}
                                // dataset={["1.1.3"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_2?.["DESCRIPTION"]}
                                data1={main_Tiles_Bar?.data?.Tile_2?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_2?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_2?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_2}
                                onClick={() => {setactiveKeyInitiativeTile(2);setWholeChildEnvironmentspopup(true)}}
                              />
                              </LoaderContainer>
                            </div>
                          </div>

                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Indicators
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[16px] 3xl:p-[0.938vw] rounded-lg">
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              {/* <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"i-Ready Benchmark Assessment -  Mathematics"}
                                statetext={"Reading 2023-24"}
                                kpstext={"Reading 2023-24"}
                                value1={"180"}
                                value2={"180"}
                                abovestateavrg={"Above State Avg"}
                                onClick={() => setWholeChildEnvironmentsIndicatorpopup(true)}
                              />
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"M-STEP State Assessment ELA"}
                                statetext={"ELA 2023-24"}
                                kpstext={"ELA 2023-24"}
                                value1={"88%"}
                                value2={"88%"}
                                onClick={() => setEnrollmentpopup(true)} StudentBElonging
                              />
                              <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"M-STEP State Assessment Mathematics"}
                                statetext={"Mathematics 2023-24"}
                                kpstext={"Mathematics 2023-24"}
                                value1={"90%"}
                                value2={"90%"}
                                onClick={() => setStudentpopup(true)}
                              /> */}
                              <LoaderContainer loading={Chronic_Absenteeism_Barloading}>
                               <KeyIndicators
                                subtitle={"Whole Child Environment"}
                                title={"Chronic Absenteeism"}
                                // statetext={"Reading 2023-24"}
                                // kpstext={"Reading 2023-24"}
                                // value1={"180"}
                                // value2={"180"}
                                value2={FormatNum(Chronic_Absenteeism_Toptile[0]?.STATEWIDE_AVERAGE,1) + "%"}
                                value1={Chronic_Absenteeism_Toptile[0]?.CHRONIC_ABSENTEEISM_RATE?.toFixed(1) + "%"}
                                metric2={"Statewide Average"}
                                metric1={"Chronic Absenteeism Rate (Missing 10 percent of School)"}
                                abovestateavrg={"Above State Avg"}
                                onClick={() => setWholeChildEnvironmentsIndicatorpopup(true)}
                                BarLabel={Chronic_Absenteeism_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Chronic_Absenteeism_Bar.map(item => ({value: item?.CHRONIC_ABSENTEEISM_RATE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Chronic_Absenteeism_Bar.map(item => item?.CHRONIC_ABSENTEEISM_RATE), WholeIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Chronic_Absenteeism_Bar, WholeIndicatoeColorRange,"CHRONIC_ABSENTEEISM_RATE","YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"Chronic Absenteeism Rate (Missing 10 percent of School)"}
                              />
                              </LoaderContainer>
                              {isAuthenticated && <>
                              <LoaderContainer loading={Student_Belonging_Barloading}>
                              <KeyIndicators
                                subtitle={"Whole Child Environment"}
                                title={"Student Belonging"}
                                // statetext={"ELA 2023-24"}
                                // kpstext={"ELA 2023-24"}
                                // value1={"88%"}
                                // value2={"88%"}
                                value2={FormatNum(Student_Belonging_Toptile[0]?.STATEWIDE_AVERAGE,1) + "%"}
                                value1={Student_Belonging_Toptile[0]?.PER_POSITIVE?.toFixed(1) + "%"}
                                // value1={Student_Belonging_Toptile[0]?.TOTAL_STUDENTS}
                                // value2={Student_Belonging_Toptile[0]?.PER_POSITIVE}
                                metric2={"Statewide Average"}
                                metric1={"% Positive (Students Stating they Belong)"}
                                onClick={() => setEnrollmentpopup(true)} StudentBElonging
                                BarLabel={Student_Belonging_Bar.map(item => item?.YEAR)}
                                // verticleChartData={Student_Belonging_Bar.map(item => ({value: item?.PER_POSITIVE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={GenerateGradiantColorForechartsBars(Student_Belonging_Bar.map(item => item?.PER_POSITIVE), WholeIndicatoeColorRange)}
                                verticleChartData={GenerateGradiantColorForechartsBars(Student_Belonging_Bar, WholeIndicatoeColorRange,"PER_POSITIVE","YEAR")}
                                tooltipformater={value => value + "%"}
                                seriesname={"% Positive (Students Stating they Belong)"}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={Out_of_School_Suspensions_Barloading}>
                              <KeyIndicators
                                subtitle={"Whole Child Environment"}
                                title={"Out of School Suspensions"}
                                // statetext={"Mathematics 2023-24"}
                                // kpstext={"Mathematics 2023-24"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={FormatNum(Out_of_School_Suspensions_Toptile[0]?.TOTAL_STUDENTS_SUSPENDED,1)}
                                value1={Out_of_School_Suspensions_Toptile[0]?.OSS_RATE?.toFixed(1) + "%"}
                                // value1={Out_of_School_Suspensions_Toptile[0]?.TOTAL_STUDENTS_SUSPENDED}
                                // value2={Out_of_School_Suspensions_Toptile[0]?.OSS_RATE}
                                metric2={"Total Students Suspended"}
                                metric1={"OSS Rate (Out of School Suspensions)"}
                                onClick={() => setStudentpopup(true)}
                                // BarLabel={Out_of_School_Suspensions_Bar.map(item => item?.YEAR)}
                                BarLabel={OSSChart?.label}
                                // verticleChartData={Out_of_School_Suspensions_Bar.map(item => ({value: item?.OSS_RATE, itemStyle: {color:'#335D76'}}))}
                                verticleChartData={OSSChart?.value}
                                stack={'Total'}
                                Barlabel={{
                                  show: true,
                                  color: '#000',
                                  formatter: params => params.value > 15 ? FormatNum(params.value, 1) + "%" : "" 
                                }}
                                tooltipformater={value => value + "%"}
                                seriesname={"OSS Rate (Enrollment by Race/Ethnicity)"}
                                ShowTop={false}
                              />
                              </LoaderContainer>
                              </>}
                            </div>
                          </div>
                        </ScrollPanel>
                      </>
                    ) : null}
                    {activeIndexList === 3 ? (
                      <>
                         <div className="mb-[10px]">
                         <p className="text-sm xl:text-[16px] 3xl:text-[0.833vw] leading-tight tracking-normal text-[#8a8e93] font-light">
                            Recruit and retain high impact staff that uphold the values of KPS - in particular, staff that are reflective of community diversity.
                          </p>
                        </div>
                        {/* <ScrollPanel className="h-[300px] xl:h-[400px] 2xl:h-[400px] 3xl:h-[20.625vw]"> */}
                        {/* <ScrollPanel className="h-[300px] xl:h-[400px] 2xl:h-[400px] 3xl:h-[60vh]"> */}
                        {/* <ScrollPanel className="h-[300px] xl:h-[305px] 2xl:h-[450px] 3xl:h-[25.521vw]"> */}
                        <ScrollPanel className="h-screen high-impact-main">
                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Initiatives
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)] my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[14px] 3xl:p-[0.729vw] rounded-lg">
                            {/* <ScrollPanel className="h-[360px] xl:h-[360px] 2xl:h-[310px] 3xl:h-[15.625vw]"> */}
                            {/* <div className={`grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.042vw] ${inter.className}`}> */}
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              <LoaderContainer height={"26rem"} loading={High_Impact_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Implement evidence-based instructional practices that are culturally relevant and aligned with high standards of excellence."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"55%"}
                                subtext={TopTiles["Tile_1"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_1"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_1"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                chartDesc={main_Tiles_Bar?.data?.Tile_1?.["DESCRIPTION"]}
                                onClick={() => {setactiveKeyInitiativeTile(1);setImpactDiverseStaffpopup(true)}}
                                data1={main_Tiles_Bar?.data?.Tile_1?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_1?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_1?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_1}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={High_Impact_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Empower educators through a professional learning community (PLC) model to increase student achievement."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"80%"}
                                subtext={TopTiles["Tile_2"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_2"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_2"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                // data1={[23]}
                                // data2={[23]}
                                // data3={[23]}
                                // barWidth={35}
                                // dataset={["1.2.3"]}
                                chartDesc={main_Tiles_Bar?.data?.Tile_2?.["DESCRIPTION"]}
                                onClick={() => {setactiveKeyInitiativeTile(2);setImpactDiverseStaffpopup(true)}}
                                data1={main_Tiles_Bar?.data?.Tile_2?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_2?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_2?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_2}
                              />
                              </LoaderContainer>
                              <LoaderContainer loading={High_Impact_Key_Initiative_Barloading}>
                              <KeyInitiatives
                                // subtext={"Empower educators through a professional learning community (PLC) model to increase student achievement."}
                                // description={"Duration: Jun 23-May 26"}
                                // value={"80%"}
                                subtext={TopTiles["Tile_3"]?.TITLE || ""}
                                description={`Duration: ${TopTiles["Tile_3"]?.DURATION || '-'}`}
                                value={TopTiles["Tile_3"]?.DONE_PER}
                                metricType={"Percentage"}
                                // pyvar={"10"}
                                chartDesc={main_Tiles_Bar?.data?.Tile_3?.["DESCRIPTION"]}
                                onClick={() => {setactiveKeyInitiativeTile(3);setImpactDiverseStaffpopup(true)}}
                                data1={main_Tiles_Bar?.data?.Tile_3?.Done}
                                data2={main_Tiles_Bar?.data?.Tile_3?.["Working on it"]}
                                data3={main_Tiles_Bar?.data?.Tile_3?.["Not yet started"]}
                                dataset={main_Tiles_Bar?.Label?.Tile_3}
                              />
                              </LoaderContainer>
                            </div>
                          </div>

                          <div><h3 className="white_text_color text-[16px] xl:text-[18px] 2xl:text-[1.042vw] 3xl:text-[1.042vw] font-semibold">
                            Key Indicators
                          </h3></div>
                          <div className="bg-[rgba(255,255,255,0.04)]  my-[15px] xl:mb-[15px] 3xl:mb-[0.781vw] xl:mt-[10px] 3xl:mt-[0.521vw] p-[16px] 3xl:p-[0.938vw] rounded-lg">
                            <div className={`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-[10px] xl:gap-[20px] 3xl:gap-[1.25vw] ${inter.className}`}>
                              {/* <KeyIndicators
                                subtitle={"Culture of Excellence"}
                                title={"i-Ready Benchmark Assessment -  Mathematics"}
                                statetext={"Reading 2023-24"}
                                kpstext={"Reading 2023-24"}
                                max='100'
                                interval='50'
                                formatter="{value} %"
                                value1={"180"}
                                value2={"180"}
                                abovestateavrg={"Above State Avg"}
                                onClick={() => setIndicatorspopup(true)}
                              />
                              <KeyIndicators
                                onClick={() => setShowStaffdiversity(true)}
                                subtitle={"Culture of Excellence"}
                                title={"Staff Diversity"}
                                statetext={"ELA 2023-24"}
                                formatter="{value} %"
                                max='100'
                                interval='50'
                                kpstext={"ELA 2023-24"}
                                value1={"88%"}
                                value2={"88%"}
                              />
                              <KeyIndicators
                                onClick={() => setKeyIndicatorsWholeChilde(true)}
                                subtitle={"Culture of Excellence"}
                                title={"Staff Retention"}
                                statetext={"Mathematics 2023-24"}
                                max='40'
                                interval='20'
                                formatter="{value}"
                                kpstext={"Mathematics 2023-24"}
                                value1={"90%"}
                                value2={"90%"}
                              />
                              <KeyIndicators
                                onClick={() => setshowFundbalancePopup(true)}
                                subtitle={"Culture of Excellence"}
                                title={"Fund Balance"}
                                max='100'
                                interval='50'
                                formatter="{value} %"
                                statetext={"Mathematics 2023-24"}
                                kpstext={"Mathematics 2023-24"}
                                value1={"90%"}
                                value2={"90%"}
                              /> */}
                              {isAuthenticated && <LoaderContainer loading={Staff_Engagement_Barloading}>
                              <KeyIndicators
                                subtitle={"High Impact, Diverse Staff"}
                                title={"Staff Engagement Index"}
                                // statetext={"Reading 2023-24"}
                                // kpstext={"Reading 2023-24"}
                                // max='100'
                                // interval='50'
                                // formatter="{value} %"
                                // value2={Staff_Engagement_Toptile[0]?.TOTAL_STAFF?.toFixed(1)}
                                value1={getRankSuffix(Staff_Engagement_Toptile[0]?.PERCENTILE)}
                                metric2={"Total Staff"}
                                metric1={"Percentile (Percentile Rank by Role)"}
                                abovestateavrg={"Above State Avg"}
                                onClick={() => setIndicatorspopup(true)}
                                // BarLabel={Staff_Engagement_Bar.map(item => item?.YEAR)}
                                // // verticleChartData={Staff_Engagement_Bar.map(item => ({value: item?.PERCENTILE, itemStyle: {color:'#335D76'}}))}
                                // verticleChartData={Staff_Engagement_Bar.map(item => ({value: item?.PERCENTILE, itemStyle: {color:'#bab0ac'}}))}
                                // seriesname={"Percentile (Percentile Rank by Role)"}
                                // Barlabel={{
                                //   show: true,
                                //   // color: '#000',
                                //   formatter: params => getRankSuffix(params.value)
                                // }}
                                // tooltipformater={value => getRankSuffix(Number(value))}
                                customOpt={Staff_Engagement_BarChart}
                                ShowTop={false}
                              />
                              </LoaderContainer>}
                              <LoaderContainer loading={Staff_DIversity_Barloading}>
                              <KeyIndicators
                                onClick={() => setShowStaffdiversity(true)}
                                subtitle={"High Impact, Diverse Staff"}
                                title={"Staff Diversity"}
                                // statetext={"ELA 2023-24"}
                                formatter="{value} %"
                                valuefont={false}
                                // max='100'
                                // interval='50'
                                // kpstext={"ELA 2023-24"}
                                // value1={"88%"}
                                // value2={"88%"}
                                value2={`${Staff_DIversity_Toptile[0]?.STATEWIDE_WHITE.toFixed(0)} : ${Staff_DIversity_Toptile[0]?.STATEWIDE_OTHERS.toFixed(0)}`}
                                value1={`${Staff_DIversity_Toptile[0]?.KPS_WHITE.toFixed(0)} : ${Staff_DIversity_Toptile[0]?.KPS_OTHERS.toFixed(0)}`}
                                // value2={Staff_DIversity_Toptile[0]?.}
                                metric2={"Statewide Diversity (White : Others)"}
                                metric1={"KPS Diversity (White : Others)"}
                                // // BarLabel={Staff_DIversity_Bar.map(item => item?.YEAR)}
                                // // verticleChartData={Staff_DIversity_Bar.map(item => ({value: item?.KPS_WHITE, itemStyle: {color:'#335D76'}}))}
                                // // verticleChartData={Staff_DIversity_Bar.reduce((acc,item)=>{
                                // //   let {YEAR,...rest} = item
                                // //   Object.entries(rest).forEach(([key,value])=>{
                                // //     if(!acc[key]){
                                // //       acc[key] = []
                                // //     }
                                // //     acc[key].push(value)
                                // //   })
                                // //   return acc
                                // // },{})}
                                // BarLabel={StaffDiversityChart?.label}
                                // verticleChartData={StaffDiversityChart?.value}
                                // stack={'Total'}
                                // Barlabel={{
                                //   show: true,
                                //   color: '#fff',
                                //   formatter: params => params.value > 15 ? FormatNum(params.value, 1) + "%" : "" 
                                // }}
                                // tooltipformater={value => value + "%"}
                                // seriesname={"KPS Diversity (White : Others)"}
                                customOpt={StaffDiversityChart}
                              />
                              </LoaderContainer>
                              {isAuthenticated && <LoaderContainer loading={Staff_Retention_Barloading}>
                              <KeyIndicators
                                onClick={() => setKeyIndicatorsWholeChilde(true)}
                                subtitle={"High Impact, Diverse Staff"}
                                title={"Staff Retention"}
                                // statetext={"Mathematics 2023-24"}
                                statetext={"Certified Staff"}
                                // max='40'
                                // interval='20'
                                formatter="{value}"
                                // kpstext={"Mathematics 2023-24"}
                                kpstext={"Certified Staff"}
                                // value1={"90%"}
                                // value2={"90%"}
                                value2={Staff_Retention_Toptile[0]?.VALUE?.toFixed(1) + "%"}
                                value1={Staff_Retention_Toptile[1]?.VALUE?.toFixed(1) + "%"}
                                metric2={"5Y Retention Rate"}
                                metric1={"10Y Retention Rate"}
                                BarLabel={Staff_Retention_Bar.map(item => item?.UNIT)}
                                // verticleChartData={Staff_Retention_Bar.map(item => ({value: item?.RETENTION_RATE, itemStyle: {color:'#335D76'}}))}
                                verticleChartData={Staff_Retention_Bar.map(item => ({value: item?.RETENTION_RATE, itemStyle: {color:'#bab0ac'}}))}
                                tooltipformater={value => value + "%"}
                                seriesname={"1Y Retention Rate (Retention Rate by Role)"}
                                categoryaxisname={"1Y Retention Rate"}
                              />
                              </LoaderContainer>}
                            </div>
                          </div>
                        </ScrollPanel>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Layout> */}
          <div className="text-white w-full flex  powered-by pr-3 relative">
            <span className="ml-auto text-sm gap-2 flex">
              <p className="powered-by-text">Powered by</p>
              <Image src="/k12logo.png" width={150} height={25} className="ml-auto"  alt=""/>
            </span>
          </div>
        </div>
      </Layout>

      {/* Initiative Popup */}

      <InitiativeCultural
        TileName={"Culture of Excellence"}
        TopTiledata={TopTiles[`Tile_${activeKeyInitiativeTile}`]}
        TopBardata={main_Tiles_Bar?.data?.[`Tile_${activeKeyInitiativeTile}`]}
        TopBarLabel={main_Tiles_Bar?.Label?.[`Tile_${activeKeyInitiativeTile}`]}
        Tile={activeKeyInitiativeTile}
        downloaddata={activemainTileBarData}
        visible={cultureinitiativeone}
        onHide={() => {
          setCultureinitiativeone(false)
        }}
      />

      <EquitableOpportunitiesOutcome
        TileName={"Equitable Opportunities & Outcomes"}
        TopTiledata={TopTiles[`Tile_${activeKeyInitiativeTile}`]}
        TopBardata={main_Tiles_Bar?.data?.[`Tile_${activeKeyInitiativeTile}`]}
        TopBarLabel={main_Tiles_Bar?.Label?.[`Tile_${activeKeyInitiativeTile}`]}
        Tile={activeKeyInitiativeTile}
        downloaddata={activemainTileBarData}
        visible={EquitableOpporpopup}
        onHide={() => {
          setEquitableOpporpopup(false)
        }}
      />

      <WholeChildEnvironment
        TileName={"Whole-Child Environment"}
        TopTiledata={TopTiles[`Tile_${activeKeyInitiativeTile}`]}
        TopBardata={main_Tiles_Bar?.data?.[`Tile_${activeKeyInitiativeTile}`]}
        TopBarLabel={main_Tiles_Bar?.Label?.[`Tile_${activeKeyInitiativeTile}`]}
        Tile={activeKeyInitiativeTile}
        downloaddata={activemainTileBarData}
        visible={WholeChildEnvironmentpopup}
        onHide={() => {
          setWholeChildEnvironmentspopup(false)
        }}
      />

      <ImpactDiverseStaff
        TileName={"High Impact, Diverse Staff"}
        TopTiledata={TopTiles[`Tile_${activeKeyInitiativeTile}`]}
        TopBardata={main_Tiles_Bar?.data?.[`Tile_${activeKeyInitiativeTile}`]}
        TopBarLabel={main_Tiles_Bar?.Label?.[`Tile_${activeKeyInitiativeTile}`]}
        Tile={activeKeyInitiativeTile}
        visible={ImpactDiverseStaffpopup}
        downloaddata={activemainTileBarData}
        onHide={() => {
          setImpactDiverseStaffpopup(false)
        }}
      />

      {/*  */}

      {/* Indicator popup */}

      <CultureofExcellenceKeyIndicators
        visible={CultureIndicatorspopup}
        onHide={() => {
          setCultureIndicatorspopup(false)
        }}
        value2={Benchmark_Assessment_Reading_Toptile[0]?.KPS_AVERAGE?.toFixed(1) + "%"}
        metric1={"KPS Average (Median % Typical Growth Achieved)"}
        // DropDowns
        options={Culture_Year_opt?.["Tile1"]}
        // 
      />
      <CultureofExcellenceKeyIndicatorsSecond
        visible={CultureIndicatorssecond}
        onHide={() => {
          setCultureIndicatorssecond(false)
        }}
        value2={Benchmark_Assessment_Mathematics_Toptile[0]?.KPS_AVERAGE?.toFixed(1) + "%"}
        metric1={"KPS Average (Median % Typical Growth Achieved)"}
        // DropDowns
        options={Culture_Year_opt?.["Tile2"]}
        // 
      />
      <CultureofExcellenceThird
        visible={cultureIndicatorsthird}
        onHide={() => {
          setCultureIndicatorsthird(false)
        }}
        value2={State_Assessment_ELA_Toptile[0]?.KPS_PROFICIENT?.toFixed(1) + "%"}
        metric1={"KPS ELA Proficient %"}
        // ChartSplitLine={ChartSplitLine({y: State_Assessment_ELA_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Culture_Year_opt?.["Tile3"]}
        // 
      />
      <CultureofExcellenceFourth
        visible={cultureIndicatorsfourth}
        onHide={() => {
          setCultureIndicatorsfourth(false)
        }}
        value2={State_Assessment_Mathematics_Toptile[0]?.KPS_PROFICIENT?.toFixed(1) + "%"}
        metric1={"KPS Math Proficient %"}
        // ChartSplitLine={ChartSplitLine({y:State_Assessment_Mathematics_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Culture_Year_opt?.["Tile4"]}
        // 
      />
      <SatAssessment
        visible={satAssessmentPopup}
        onHide={() => {
          setSatAssessmentPopup(false)
        }}
        value2={SAT_Assessment_Toptile[1]?.VALUE?.toFixed(1)}
        metric1={"Average SAT Score (Total Score)"}
        // ChartSplitLine={ChartSplitLine({y: SAT_Assessment_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Equitable_Year_opt?.["Tile4"]}
        // 
      />


      <FreshmanonTrack
        visible={freshmanonTrackpopup}
        onHide={() => {
          setFreshmanonTrackpopup(false)
        }}
        value2={Freshmen_on_Track_Toptile[0]?.PER_ON_TRACK?.toFixed(1) + "%"}
        metric1={"% on Track (Students Passing Grade 9)"}
        // ChartSplitLine={ChartSplitLine({y: Freshmen_on_Track_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Equitable_Year_opt?.["Tile1"]}
        // 
      />
      <FourYearGraduationRate
        visible={fourYearGraduationRatepopup}
        onHide={() => {
          setFourYearGraduationRatepopup(false)
        }}
        value2={Graduation_Rate_Toptile[0]?.GRADUATION_RATE?.toFixed(1) + "%"}
        metric1={"Graduation Rate (Students Graduating on Time)"}
        // ChartSplitLine={ChartSplitLine({y: Graduation_Rate_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Equitable_Year_opt?.["Tile2"]}
        // 
      />
      <Advancedplacement
        visible={advancedPlacementPopup}
        onHide={() => {
          setAdvancedPlacementPopup(false)
        }}
        value2={Advanced_Placement_Toptile[0]?.VALUE?.toFixed(1) + "%"}
        metric1={"Average AP % (Enrollment by Race/Ethnicity)"}
        ShowTop={false}
        // DropDowns
        options={Equitable_Year_opt?.["Tile3"]}
        // 
      />



      <WholeChildEnvironmentIndicator
        visible={WholeChildEnvironmentIndicatorpopup}
        onHide={() => {
          setWholeChildEnvironmentsIndicatorpopup(false)
        }}
        value2={Chronic_Absenteeism_Toptile[0]?.CHRONIC_ABSENTEEISM_RATE?.toFixed(1) + "%"}
        metric1={"Chronic Absenteeism Rate (Missing 10 Percent of School)"}
        // ChartSplitLine={ChartSplitLine({y: Chronic_Absenteeism_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Whole_Child_Year_opt?.["Tile1"]}
        // 
      />
      <Enrollment
        visible={enrollmentpopup}
        onHide={() => {
          setEnrollmentpopup(false)
        }}
        value2={Student_Belonging_Toptile[0]?.PER_POSITIVE?.toFixed(1) + "%"}
        metric1={"% Positive (Student Starting they Belong)"}
        // ChartSplitLine={ChartSplitLine({y: Student_Belonging_Toptile[0]?.STATEWIDE_AVERAGE})}
        // DropDowns
        options={Whole_Child_Year_opt?.["Tile2"]}
        // 
      />
      <Student
        visible={studentpopup}
        onHide={() => {
          setStudentpopup(false)
        }}
        value2={Out_of_School_Suspensions_Toptile[0]?.OSS_RATE?.toFixed(1) + "%"}
        metric1={"OSS Rate (Out of School Suspenstion)"}
        // DropDowns
        options={Whole_Child_Year_opt?.["Tile3"]}
        // 
      />


      <KeyIndicatorsPopup
        visible={Indicatorspopup}
        onHide={() => {
          setIndicatorspopup(false)
        }}
        value2={Staff_Engagement_Toptile[0]?.PERCENTILE}
        metric1={"Percentile (Percentile Rank by Role)"}
        // DropDowns
        options={High_Impact_Year_opt?.["Tile1"]}
        // 
      />
      <StaffdiversityPopup
        visible={ShowStaffdiversity}
        onHide={() => {
          setShowStaffdiversity(false)
        }}
        value2={`${Staff_DIversity_Toptile[0]?.KPS_WHITE.toFixed(0)} : ${Staff_DIversity_Toptile[0]?.KPS_OTHERS.toFixed(0)}`}
        metric1={"KPS Diversity (White : Others)"}
        // DropDowns
        options={High_Impact_Year_opt?.["Tile2"]}
        // 
      />
      <KeyIndicatorsWholeChildePopup
        visible={KeyIndicatorsWholeChilde}
        onHide={() => {
          setKeyIndicatorsWholeChilde(false)
        }}
        value2={Staff_Retention_Toptile[1]?.VALUE?.toFixed(1) + "%"}
        metric1={"10Y Retention Rate"}
        // DropDowns
        options={High_Impact_Year_opt?.["Tile3"]}
        // 
      />
      <Fundbalance
        visible={showFundbalancePopup}
        onHide={() => {
          setshowFundbalancePopup(false)
        }}
        value2={Fund_Balance_Toptile[0]?.FUND_BALANCE_PER?.toFixed(1) + "%"}
        metric1={"Fund Balance % (Balance of Revenue and Expenses)"}
        // DropDowns
        options={Whole_Child_Year_opt?.["Tile4"]}
        // 
        Filter={false}
      />

      {/*  */}

      <OpportunityKeyIndicatorsPopup
        visible={OpportunityIndicatorspopup}
        onHide={() => {
          setOpportunityIndicatorspopup(false)
        }}
      />

    </div>

  );
};

export default Goals;