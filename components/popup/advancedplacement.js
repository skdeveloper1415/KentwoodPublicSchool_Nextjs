"use client";
import { useState, useRef, useEffect, useMemo} from "react";
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
import {fetchAdvanced_Placement_Popup_dimension} from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";

export default function Advancedplacement(props) {
    const { visible, onHide, value2, metric1, ShowTop = true} = props;

    const events = [
        { status: 'Ordered', date: 'Jun 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-ordered' },
        { status: 'Processing', date: 'Dec 2023', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Shipped', date: 'Jun 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Ordered', date: 'Dec 2024', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
        { status: 'Ordered', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-dots', color: 'var(--white_text_color)', className: 'event-initiative-show' },
        { status: 'Shipped', date: 'Jun 2025', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
        { status: 'Shipped', date: 'Jun 2026', datesubno: '1.1', initiative: 'Initiative 1.1.1', icon: 'ru-flag', color: 'var(--white_text_color)', className: 'event-flagIcon' },
    ];

    const [selectedDimension, setselectedDimension] = useState({ name: "Student Group", code: "STUDENT_GROUP" });
    const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
    useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

    const Dimensions = [
        // { name: 'New York', code: 'NY' },
        // { name: 'Rome', code: 'RM' },
        // { name: 'London', code: 'LDN' },
        // { name: 'Istanbul', code: 'IST' },
        // { name: 'Paris', code: 'PRS' }

        // { name: "School Year", code: "School_Year" },
        { name: "Student Group", code: "STUDENT_GROUP" },
        // { name: "Ethnicity", code: "ETHNICITY" },
        // { name: "SPED", code: "SPED" },
        // { name: "Language", code: "LANGUAGE" },
        // { name: "Gender", code: "GENDER" },
        // { name: "Grade", code: "GRADE" },
    ];

    /* redux state */
    const Advanced_Placement_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Advanced_Placement_Popup_dimensionloading)
    const Advanced_Placement_Popup_dimension = useSelector(state => state.indicatorpopup.Advanced_Placement_Popup_dimension)
    /* */

    /* API Calls */
    const dispatch = useDispatch();

    useEffect(()=>{
    if(selectedDimension && visible){
        dispatch(fetchAdvanced_Placement_Popup_dimension({
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

    const lineChartData = {
        label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
        value: [5, 6, 5, 6, 7, 7, 8,]
    }

    /*  */
    const ChartData = useMemo(()=>{
        let Labels = []

        let data = Advanced_Placement_Popup_dimension.reduce((acc,item)=>{
            let {[selectedDimension?.code]: Dimension,...rest} = item
            if (!acc[Dimension]){
                acc[Dimension] = {[rest?.GROUP]: 0}
                Labels.push(rest?.GROUP)
            }
            else if (!acc[Dimension][rest?.GROUP]){
                acc[Dimension] = {...acc[Dimension],[rest?.GROUP]: 0}
                Labels.push(rest?.GROUP)
            }
            acc[Dimension][rest?.GROUP] += rest?.AVERAGE_AP_PER
            return acc
        },{})

        Labels = selectedDimension?.code == "STUDENT_GROUP" ? [...new Set(Labels)] : [...new Set(Labels)].sort()

        for (let dimension in data) {
            data[dimension] = Labels.map(key => data[dimension][key] || 0)
        }

        return { data: data, Label: Labels }

    },[Advanced_Placement_Popup_dimension])
    /*  */

    return (
        <>
            <div>
                <Dialog header="Header"
                    className="custmDialog  w-[1000px] 2xl:w-[72.917vw]  xl:w-[75.917vw]  3xl:w-[72.917vw]"
                    visible={visible}
                    onHide={onHide}>
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
                                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.</p>
                            </div>
                        </div>
                        <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4   2xl:h-[3.125vw] h-[65px] xl:h-[55px]">
                            <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>
                            <div className="text-[16px] xl:text-[0.885vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center 2xl:gap-[0.417vw] gap-1">
                                <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                                <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Advanced Placement (AP)
                                </p></div>
                            </div>
                        </div>
                        <ScrollPanel className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[31.25vw] w-full custm_ScrollPanel">
                            <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                                {/*col*/}
                                {ShowTop && <div className="grid grid-cols-3 2xl:gap-[1.25vw] gap-5">
                                    <div className="relative bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 ">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        {/* Students Placed in */}
                                                        Gr. 9-12 Enrolment
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
                                        <div className="absolute top-1 right-2">
                                        <div className="feedback-isSuccess 2xl:text-[10px] text-[10px]"><i className="ru-dots"></i></div>
                                        </div>
                                    </div>
                                    {/* <div className="relative bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        Students Placed in
                                                    </div>
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                        AP Enrolment
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    8,452
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
                                        <div className="absolute top-1 right-2">
                                        <div className="feedback-isSuccess 2xl:text-[10px] text-[10px]"><i className="ru-dots"></i></div>
                                        </div>
                                    </div>
                                    <div className="relative bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div>
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        Students Placed in
                                                    </div>
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                        Other Enrolment
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    2,545
                                                </div>
                                                <div className="2xl:text-[0.521vw] xl:text-[10px] text-[#9CA1AB] font-normal uppercase">
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
                                        <div className="absolute top-1 right-2">
                                        <div className="feedback-isSuccess 2xl:text-[10px] text-[10px]"><i className="ru-dots"></i></div>
                                        </div>
                                    </div> */}
                                </div>}
                                {/*col*/}
                                <div className={ShowTop ? '' : ""}>
                                    <ChartWrapper
                                        formatDownloadedData={Advanced_Placement_Popup_dimension}
                                        formatFileName={"Advanced Placement (AP)"}
                                        ExportIcon={true}
                                        titleshow={true}
                                        title={"Advanced Placement (AP) Enrollment by Race/Ethnicity"}
                                        data={
                                            <>
                                                <div>
                                                    <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 2xl:mt-[0.417vw] mt-1.5">
                                                        {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-normal leading-4 2xl:leading-[0.833vw]">View By:</div>
                                                            <div>
                                                                <Dropdown value={selectedDimension} onChange={(e) => setselectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                                                    placeholder="Select Dimension" className="w-full md:w-[309px] 2xl:w-[18.229vw] 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
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
                                                    <div className="h-[200px] xl:h-[20.385vw] 2xl:h-[20.385vw]">
                                                        <LoaderContainer height={'100%'} loading={Advanced_Placement_Popup_dimensionloading}>
                                                        <HorizontalStackBarChart
                                                            legend={{
                                                                left: 10,
                                                                bottom: 5,
                                                                textStyle: {
                                                                    fontSize: 10,
                                                                    color: "#FFFFFF",
                                                                },
                                                                itemWidth: 9,
                                                                itemHeight: 9,
                                                            }}
                                                            grid={{
                                                                top: 10,
                                                                left: 40,
                                                                right: 30,
                                                                bottom: 40,
                                                                containLabel: true
                                                            }}
                                                            // min={10}
                                                            // max={100}
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
                                                            // yAxisdata={['AP Enrolment', 'Gr. 9-12 Enrolment']}
                                                            yAxisdata1={ChartData.Label}
                                                            barWidth={60}
                                                            // name={'Asian'}
                                                            // name2={'Black or AA'}
                                                            // name3={'Hispanic'}
                                                            // name4={'Two or More'}
                                                            // name5={'White'}
                                                            label={{
                                                                show: true,
                                                                // position: 'insideRight',
                                                                formatter: '{c}%',
                                                                color: '#000'
                                                            }}
                                                            // itemStyle={{
                                                            //     color: '#F076B2',
                                                            //     borderRadius: 0
                                                            // }}
                                                            // itemStyle2={{
                                                            //     color: '#EDC948',
                                                            //     borderRadius: 0
                                                            // }}
                                                            // itemStyle3={{
                                                            //     color: '#B7E1CD',
                                                            //     borderRadius: 0
                                                            // }}
                                                            // itemStyle4={{
                                                            //     color: '#0090FF',
                                                            //     borderRadius: 0
                                                            // }}
                                                            // itemStyle5={{
                                                            //     color: '#B07AA1',
                                                            //     borderRadius: 0
                                                            // }}

                                                            xAxisName={"Percentage of student got placement"}
                                                            xAxisNameGap={"30"}
                                                            xAxisNamePosition={"middle"}
                                                            yAxisName={"Enrolments"}
                                                            yAxisNameGap={"130"}
                                                            yAxisNamePosition={"middle"}
                                                            dataObj={ChartData.data}
                                                            // data={[32, 25]}
                                                            // data1={[8, 8]}
                                                            // data2={[17, 18]}
                                                            // data4={[24, 36]}
                                                            // data5={[19, 13]}
                                                            tooltipformater={value => value + "%"}
                                                        />
                                                        </LoaderContainer>
                                                    </div>
                                                    <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                                                        <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                                                        {/* SAT Total Scores range from 400-1600 and is administered in grade 11</div> */}
                                                        AP enrollment includes any student in at lease one AP class.</div>
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
