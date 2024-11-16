"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import ChartWrapper from "../chartwrapper";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dropdown } from "primereact/dropdown";
import Linechartwithgradient from "../charts/linechartwithgradient";
import * as echarts from "echarts";
import MultiplebarChart from "../charts/multiplebarchart";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff_Retention_Popup_dimension } from "../../redux/slices/Indicatorpopup"
import LoaderContainer from "../LoaderContainer";
import { FormatNum } from "../utils";

export default function KeyIndicatorsWholeChildePopup(props) {
    const { visible, onHide, value2, metric1 } = props;
    const lineChartData = {
        label: ["06/23", "07/23", "08/23", "09/23", "10/23", "11/23", "12/23"],
        value: [5, 6, 5, 6, 7, 7, 8],
    };

    const [selectedDimension, setSelectedDimension] = useState({ name: "School Year", code: "School_Year" });
    const [selectedYear, setSelectedYear] = useState(props?.options ? props?.options[0] : null);
    useEffect(()=>{if(props?.options) setSelectedYear(Array.isArray(props?.options) ? props?.options[0] : null)},[props?.options]);

    const Dimensions = [
        // { name: "New York", code: "NY" },
        // { name: "Rome", code: "RM" },
        // { name: "London", code: "LDN" },
        // { name: "Istanbul", code: "IST" },
        // { name: "Paris", code: "PRS" },
        { name: "School Year", code: "School_Year" },
    ];

    /* redux state */
    const Staff_Retention_Popup_dimensionloading = useSelector(state => state.indicatorpopup.Staff_Retention_Popup_dimensionloading)
    const Staff_Retention_Popup_dimension = useSelector(state => state.indicatorpopup.Staff_Retention_Popup_dimension)
    /* */

    /* API Calls */
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDimension && visible) {
            dispatch(fetchStaff_Retention_Popup_dimension({
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
    }, [visible, selectedDimension, selectedYear])

    /* */

    /*  */
    const chartdata = useMemo(() => {
        let Labels = []

        let data = Staff_Retention_Popup_dimension.reduce((acc, item) => {
            // let { [selectedDimension.code]: Dimension, ...rest } = item
            let { ['METRIC_NAME']: Dimension, ...rest } = item
            if (!acc[rest["UNIT"]]) {
                acc[rest["UNIT"]] = { [Dimension]: 0 }
                Labels.push(Dimension)
            } else {
                acc[rest["UNIT"]] = { ...acc[rest["UNIT"]], [Dimension]: 0 }
            }
            acc[rest["UNIT"]][Dimension] += rest["VALUE"]
            Labels.push(Dimension)
            return acc
        }, {})

        Labels = [...new Set(Labels)].sort((a,b) => parseInt(a) - parseInt(b))  //Sort the Data

        for (let Name in data) {
            data[Name] = Labels.map(key => data[Name][key] || 0)
        }

        return { data: data, Label: Labels }

    }, [Staff_Retention_Popup_dimension])
    /*  */

    const CustomChartConfig = useMemo(() => {
        const colors = ['#cfcfcf', '#7f7f7f', '#3f3f3f']
        let Option = {
            // title: {
            //     text: 'Staff Retention Over Time'
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                }
            },
            grid: {
                top: '10%',   // Adjust grid to leave space for the top axis
                bottom: '20%' // Adjust grid to leave space for the bottom axis labels
            },
            xAxis: [
                {
                    type: 'category',
                    position: 'top', // Move main category axis to the top
                    // data: ['1-Year', '5-Year', '10-Year'],
                    data: chartdata?.Label,
                    splitLine: {     // Add split lines between categories
                        show: true,
                        lineStyle: {
                            color: '#374151'
                        }
                    },
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
                    axisLabel:{
                        color: '#E5E7EB',
                    }
                },
                {
                    type: 'category',
                    position: 'bottom', // Series names as the bottom x-axis
                    // data: ['Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall', 'Administrators', 'Certified Staff', 'Overall'],
                    data: Array(chartdata?.Label.length || 0).fill(Object.keys(chartdata?.data || {})).flat(),
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
                        rotate: 45,  // Rotate the bottom x-axis labels by 45 degrees
                        interval: 0, // Ensure all labels are shown, not skipped
                        textStyle: {
                            fontSize: 12 // Adjust font size if needed
                        },
                        color: '#E5E7EB',
                    },
                }
            ],
            yAxis: [
                {
                    name: "Percent of Staff",
                    nameLocation: "middle",
                    nameGap: 60,
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
            // series: [
            //     {
            //         name: 'Administrators',
            //         type: 'bar',
            //         data: [91, 52, 51],
            //         label: {
            //             show: true,
            //             position: 'top',
            //             formatter: '{c}%'
            //         },
            //         itemStyle: {
            //             color: '#cfcfcf'
            //         }
            //     },
            //     {
            //         name: 'Certified Staff',
            //         type: 'bar',
            //         data: [83, 65, 36],
            //         label: {
            //             show: true,
            //             position: 'top',
            //             formatter: '{c}%'
            //         },
            //         itemStyle: {
            //             color: '#7f7f7f'
            //         }
            //     },
            //     {
            //         name: 'Overall',
            //         type: 'bar',
            //         data: [66, 34, 21],
            //         label: {
            //             show: true,
            //             position: 'top',
            //             formatter: '{c}%'
            //         },
            //         itemStyle: {
            //             color: '#3f3f3f'
            //         }
            //     }
            // ]
            series: Object.entries(chartdata?.data || {}).map(([key, value], i) => ({
                name: key,
                type: 'bar',
                data: value,
                label: {
                    show: true,
                    position: 'top',
                    // formatter: '{c}%',
                    color: '#E5E7EB',
                    formatter: (params) => FormatNum(params?.value, 1) + "%"
                },
                itemStyle: {
                    color: colors[i]
                },
                tooltip:{
                    valueFormatter: value => FormatNum(value, 1) + "%"
                }
            }))
        };

        return Option
    }, [chartdata])

    const BarCharData = {
        labels: ['department', 'Administrators', 'Paraprofessionals', 'Teachers'],
        values: [
            { department: '1 Year', Administrators: 77, Paraprofessionals: 52, Teachers: 57, },
            { department: '5 Year', Administrators: 90, Paraprofessionals: 55, Teachers: 51, },
            { department: '10 Year', Administrators: 89, Paraprofessionals: 56, Teachers: 47, },
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
                                <Image src={'/images/diverse-staff-logo.png'} width={102} height={70} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw]" />
                            </div>
                            <div className="2xl:w-[16.094vw] w-[300px]">
                                {/* <div className="white_text_color text-xs 2xl:text-[0.625vw] font-light leading-3 2xl:leading-[0.833vw]">PREMIER TEACHING</div> */}
                                <div className="2xl:text-[0.938vw] text-sm white_text_color leading-5 2xl:leading-[1.146vw] font-bold"><span className="font-normal">High Impact,</span> Diverse Staff</div>
                            </div>
                            <div className="white_text_color text-xs opacity-60 2xl:text-[0.729vw] font-normal leading-4 2xl:leading-[0.885vw]">
                                <p>Each indicator represents the outcomes KPS is tracking throughout the implementation of the strategic plan. Indicators correspond to one of the four strategic plan goals.</p>
                            </div>
                        </div>
                        <div className="brand-neutral-50 flex items-center 2xl:gap-[0.833vw] gap-4 2xl:h-[3.125vw] h-[65px]  xl:h-[55px]  justify-between">
                            <div className="flex gap-[10px]">
                                <div className="2xl:text-[0.521vw] text-[8px] text_color_gray300 bg-[rgba(255,255,255,0.04)] 2xl:w-[2.708vw] w-[45px] 2xl:h-[5.208vw] h-[80px] flex items-center justify-center"><i className="ru-arrow-down"></i></div>

                                <div className="2xl:text-[0.938vw] font-normal leading-6 2xl:leading-[1.219vw] flex items-center justify-between 2xl:gap-[0.417vw] gap-1">


                                    <div className="feedback-isSuccess 2xl:text-[0.833vw] text-sm"><i className="ru-dots"></i></div>
                                    <div className="white_text_color 2xl:text-[0.938vw] text-base font-normal leading-6 2xl:leading-[1.25vw]"><p>Staff Retention
                                    </p></div>


                                </div>
                            </div>
                            {/* <Image src={'/images/eoo.png'} width={70} height={40} alt="Equitable Opportunities & Outcome" className="2xl:w-[5.313vw] 2xl:h-[3.646vw] flex justify-end mr-[20px] xl:mr-[20px] 3xl:mr-[1.042vw]" /> */}
                        </div>
                        <ScrollPanel
                            className="h-[600px] 2xl:h-[31.25vw] xl:h-[28.25vw] 3xl:h-[33.458vw] w-full custm_ScrollPanel"
                        >
                            <div className="bg_blue_color_900  p-[18px] xl:p-[18px] 3xl:p-[0.938vw] 2xl:space-y-[1.25vw] space-y-[20px]">
                                <div className="grid grid-cols-3 2xl:gap-[1.25vw] gap-5">
                                    <div className="bg-[rgba(0,0,0,0.35)] 2xl:rounded-[0.417vw] rounded-xl 2xl:p-[0.833vw] p-3.5 2xl:space-y-[1.25vw] space-y-[22px]">
                                        <div className="grid grid-cols-12 2xl:gap-[0.833vw] gap-3">
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div className="flex flex-col justify-center h-full">
                                                    <div className="text-[#9CA1AB] 2xl:text-[0.729vw] font-normal leading-5 2xl:leading-[1.042vw] mb-2">
                                                        CY: 2023-24
                                                        <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                            {metric1}
                                                        </div>
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
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div className="flex flex-col justify-center h-full">
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                        AY: 2023
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    5,652
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
                                            <div className="col-span-9 2xl:space-y-[0.833vw] space-y-[14px]">
                                                <div className="flex flex-col justify-center h-full">
                                                    <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-medium leading-3 2xl:leading-[1.25vw]">
                                                        AY: 2022
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="text-[#FFFFFF] 2xl:text-[0.938vw] font-bold leading-3 2xl:leading-[1.25vw] mb-2">
                                                    5,652
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
                                    </div> */}
                                </div>

                                <div>
                                    <ChartWrapper
                                        formatDownloadedData={Staff_Retention_Popup_dimension}
                                        formatFileName={"Staff Retention"}
                                        ExportIcon={true}
                                        titleshow={true}
                                        title={
                                            "Staff Retention - Retention Rate by Role"
                                        }
                                        data={
                                            <>
                                                <div>

                                                    <div className="bg-[#1F2A37] 2xl:rounded-[0.313vw] flex items-center rounded 2xl:p-[0.417vw] p-1.5 my-3 2xl:gap-[1.25vw] gap-5">
                                                        {/* <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                            <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">View By:</div>
                                                            <div>
                                                                <Dropdown value={selectedDimension} onChange={(e) => setSelectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                                                    placeholder="Select a City" className="w-full 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
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
                                                        {/* <div>
                                                            <div className="flex items-center 2xl:gap-[0.25vw] gap-5">
                                                                <div className="text-[#FFFFFF] text-xs 2xl:text-[0.625vw] font-light leading-4 2xl:leading-[0.833vw]">Breakdown by:</div>
                                                                <div>
                                                                    <Dropdown value={selectedDimension} onChange={(e) => setSelectedDimension(e.value)} options={Dimensions} optionLabel="name"
                                                                        placeholder="Select a City" className="w-full 2xl:h-[1.51vw] h-[24px] custom_Dropdown" panelClassName="custom_Dropdownpanel" />
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>




                                                    {/* <div className="h-[371px] xl:h-[19.323vw]"> */}
                                                    <div className="h-[400px] xl:h-[22vw]">
                                                        <LoaderContainer height={'100%'} loading={Staff_Retention_Popup_dimensionloading}>
                                                        <MultiplebarChart
                                                            // data={BarCharData}
                                                            xAxisName={`Percentile Rank by Role - ${selectedDimension.name}`}
                                                            xAxisNameGap={"30"}
                                                            xAxisNamePosition={"middle"}
                                                            yAxisName={"Percent of Staff"}
                                                            yAxisNameGap={"40"}
                                                            yAxisNamePosition={"middle"}
                                                            // min={0}
                                                            // max={90}
                                                            legend={{
                                                                bottom: 20,
                                                                left: 0,
                                                                itemWidth: 10,
                                                                itemHeight: 10,
                                                                textStyle: {
                                                                    color: "#E5E7EB",
                                                                },
                                                            }}
                                                            grid={{
                                                                top: 20,
                                                                left: 80,
                                                                right: 20,
                                                                bottom: 85
                                                            }}
                                                            color1={"#EDC948"}
                                                            color2={"#B07AA1"}
                                                            // color3={"#B7E1CD"}
                                                            name1={"5Y Retention Rate"}
                                                            name2={"10Y Retention Rate"}
                                                            name3={"1Y Retention Rate"}
                                                            data={{
                                                                labels: chartdata.Label,
                                                                values: chartdata.data?.["5Y Retention Rate"],
                                                                values2:chartdata.data?.["10Y Retention Rate"],
                                                                values3:chartdata.data?.["1Y Retention Rate"],
                                                            }}
                                                            series3={true}
                                                            tooltipformater={value => FormatNum(value) + "%"}
                                                            axislabelpercent1={true}
                                                            labelpercent1={true}
                                                            labelpercent2={true}
                                                            labelpercent3={true}

                                                                /* Custom Options */
                                                                CustomConfig={CustomChartConfig}
                                                            /*  */

                                                        />
                                                        </LoaderContainer>
                                                    </div>
                                                    <div className="flex items-center gap-[8px] ml-[12px] text-[#E5E7EB] text-[14px] 2xl:text-[14px] xl:text-[12px] 3xl:text-[0.729vw] font-normal">
                                                        <Image src="/images/info_icon.svg" alt="info" width={17} height={17} />
                                                        Professional staff primarily include teachers, but also include other roles like counselors, social workers, instructional coaches, school psychologistics and others.
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
