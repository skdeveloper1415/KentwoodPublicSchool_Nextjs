import React from 'react';
import * as echarts from 'echarts';
import Linechartwithgradient from '../charts/linechartwithgradient';
import LoaderContainer from '../LoaderContainer';

const TileComponent = ({ TileData, getReadableValue, checkIfNegative, loader, Title }) => {
    return (
        <LoaderContainer loading={loader} height={"110px"} width={"100%"} className="bg-[#111828]">
            {/* <div className='grid grid-cols-3 gap-5 2xl:gap-[1.25vw] mb-[14px] 2xl:mb-[0.833vw] max-h-[100px] overflow-y-auto elementScroll'> */}
            <div className='grid grid-cols-3 gap-5 2xl:gap-[1.25vw] mb-[14px] 2xl:mb-[0.833vw]'>
                {TileData.map((item, index) => {
                    const { ACADEMIC_YEAR, METRICS, VALUE, VARIANCE } = item;
                    const UniqueMETRIC_TYPE = [...new Set(METRICS?.map(metric => metric.METRIC_TYPE))];

                    return (
                        <div className='tile_bg_color py-3.5 px-3 2xl:py-[0.833vw] 2xl:px-[0.729vw] relative' key={index}>
                            <div className='text-green-color absolute top-1 right-1 text-xs'>
                                <i className='ru-dots'></i>
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='white_text_color font-medium leading-5 text-[16px] 3xl:text-[0.938vw] 2xl:leading-[1.125vw]'>
                                    AY: {ACADEMIC_YEAR}
                                </div>
                                <div className='flex flex-col gap-2.5 2xl:gap-[0.625vw]'>
                                    <div className='white_text_color font-bold leading-normal text-[16px] 3xl:text-[0.938vw]'>
                                        {UniqueMETRIC_TYPE[0] === "number" ? getReadableValue(VALUE) : VALUE.toFixed(2) + "%"}
                                    </div>
                                    <div>
                                        <div className='white_text_color opacity-60 text-[10px] font-bold uppercase space-x-1'>
                                            <p>LP Var:
                                                <span className={`ml-2 ${checkIfNegative(VARIANCE) ? 'red_color_text' : 'sucess_green_color_text'}`}>

                                                    {/* {Title === "Undergraduate Student Demographics" ? "--" : Math.abs(VARIANCE).toFixed}% */}

                                                    {Math.abs(VARIANCE).toFixed(2)}%
                                                </span>
                                            </p>
                                        </div>
                                        {/* <div className='w-full h-4'>
                                            <Linechartwithgradient
                                                grid={{
                                                    top: 0,
                                                    left: 5,
                                                    right: 10,
                                                    bottom: 0,
                                                    containLabel: true
                                                }}
                                                lineStyle={{ color: `${checkIfNegative(VARIANCE) ? '#F98080' : '#31C48D'}`, width: 1.5 }}
                                                areaStyle={{
                                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                                        { offset: 0.9, color: '#31C48D00' },
                                                        { offset: 0.5, color: '#31C48D42' }
                                                    ])
                                                }}
                                                data={{
                                                    label: ['06/23', '07/23', '08/23', '09/23', '10/23', '11/23', '12/23'],
                                                    value: [0, VARIANCE]
                                                }}
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </LoaderContainer>
    );
};

export default TileComponent;
