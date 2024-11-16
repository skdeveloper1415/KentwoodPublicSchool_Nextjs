import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { OverlayPanel } from "primereact/overlaypanel";
import { CSVLink } from "react-csv";
import { useReactToPrint } from "react-to-print";
import ReactFullscreen from "react-easyfullscreen";
import PdfDownloader from "./exportn/ExcelDownloader";
import ExcelDownloader from "./exportn/ExcelDownloader";
import { Dropdown } from "primereact/dropdown";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function ChartWrapper(props) {
  const [infoIcon, setInfoIcon] = useState(props.infoIcon);
  const [dropdown2, setDropdown2] = useState(props.dropdown2);
  const [dropdown1, setDropdown1] = useState(props.dropdown1);
  const [bulbIcon, setBulbIcon] = useState(props.bulbIcon);
  const [ExportIcon, setExportIcon] = useState(props.ExportIcon);
  const [graphIcon, setGraphIcon] = useState(props.graphIcon);
  const [filterIcon, setFilterIcon] = useState(props.FilterIcon);
  const [tablecellvalue, settablecellvalue] = useState(props.Tablecellvalue);
  const [searchIcon, setSearchIcon] = useState(props.SearchIcon);
  const [downloadIcon, setDownloadIcon] = useState(props.downloadIcon);

  const op = useRef(null);
  const Bots = useRef();
  const handleClick = (e) => {
    document.querySelector("body").classList.toggle("echartHeight");
  };

  //Print Function
  const handlePrintBots = useReactToPrint({
    content: () => Bots.current,
  });
  const {
    formatDownloadedData = [],
    formatFileName = "Demo",
    isDetailedExport = false,
    disablepdf = false,
    title = "abc",
    subtitle = "abc",
    placeholder1 = "Dimention",
    placeholder2 = "Dimention2",
    data = [],
  } = props;

  const headers = [
    { label: "First Name", key: "id" },
    { label: "Last Name", key: "name" },
    { label: "Email", key: "value" },
    { label: "Age", key: "age" },
  ];

  const csvReport = {
    data: formatDownloadedData,
    // headers: headers,
    filename: `${formatFileName}.csv`,
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
  ];

  // Observe Active Tab
  const [activeTabIndex,setactiveTabIndex] = useState(0)
  useEffect(()=>{
    if(props.activeTabBoard){
      props.activeTabBoard(props.TabsData[activeTabIndex]) //send active Tab value index to parent
    }
  },[activeTabIndex,props.TabsData])

  return (
    <div>
      <ReactFullscreen>
        {({ ref, onToggle, onExit }) => (
          <div
            ref={ref}
            className=" h-full fullScreen bg-[#111928] border border-[#374151] box-shadow01 backdrop-blur-[7.5px] rounded-xl 2xl:rounded-[0.833vw] 2xl:p-[0.833vw] p-3"
          >
            <div>
              <div
                className={`flex items-center justify-between ${props.classname}`}
              >
                {props.titleshow === true ? (
                  <div>
                    <div
                      className={`text-[#fff] text-[18px] font-semibold leading-normal 2xl:text-[0.938vw]  ${props.text}`}
                    >
                      <p>{props.title}</p>
                    </div>
                    <div
                      className={`text-[#24262D] text-[18px] xl:text-[0.729vw] font-normal  ${props.text}`}
                    >
                      <p>{props.subtitle}</p>
                    </div>
                  </div>
                ) : (
                  <Tabs selectedIndex={activeTabIndex} onSelect={e => setactiveTabIndex(e)}>
                      <TabList className='grid grid-cols-4 2xl:gap-[0.313vw] gap-1 2xl:py-[0.365vw] py-1.5'>
                        {props.TabsData ?
                        props.TabsData?.map((item,index) =>
                          <Tab 
                          // className={`${activeTabIndex == index ? 'bg-[#1F2A37]' : 'bg-[#111928] border border-[#1F2A37]'} rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block cursor-pointer`}
                          className={`${activeTabIndex == index ? 'bg-[#1F2A37]' : 'bg-[#111928] border border-[#1F2A37]'} rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block cursor-pointer truncate w-[7rem]`}
                          title={`${item} - ${props.Description?.[item]}`}
                          >
                            {/* {`Initiative ${item}`} */}
                            {props.Description?.[item]}
                          </Tab>
                        )
                        :<></>}
                      </TabList>
                  </Tabs>
                //   <div className="grid grid-cols-4 2xl:gap-[0.313vw] gap-1 2xl:py-[0.365vw] py-1.5">
                //   col
                //   <div>
                //     <Link
                //       href={""}
                //       className="bg-[#1F2A37] rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block"
                //     >
                //       Initiative 1.1.1
                //     </Link>
                //   </div>
                //   col
                //   <div>
                //     <Link
                //       href={""}
                //       className="bg-[#111928] border border-[#1F2A37] rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block"
                //     >
                //       Initiative 1.1.2
                //     </Link>
                //   </div>
                //   col
                //   <div>
                //     <Link
                //       href={""}
                //       className="bg-[#111928] border border-[#1F2A37] rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block"
                //     >
                //       Initiative 1.1.3
                //     </Link>
                //   </div>
                //   col
                //   <div>
                //     <Link
                //       href={""}
                //       className="bg-[#111928] border border-[#1F2A37] rounded-md 2xl:rounded-[0.313vw] 2xl:py-[0.313vw] py-1 2xl:px-[0.417vw] px-2 text-[#FFFFFF] text-xs 2xl:text-[0.729vw] font-light inline-block"
                //     >
                //       Initiative 1.1.4
                //     </Link>
                //   </div>
                //   col
                // </div>
                )}

                <div className="space-x-4 optionbtn flex items-center wrapper_icons  custm_dropdwon text-[#828A91] dark:text-[#B3B9C6]">
                  {dropdown1 == true ? (
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder={props.placeholder1}
                      className="w-full xl:w-[10.417vw] md:h-[40px]"
                      style={{
                        border: "1px solid #DDE1EA",
                        borderRadius: "8px",
                      }}
                    />
                  ) : null}
                  {dropdown2 == true ? (
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder={props.placeholder2}
                      className="w-full xl:w-[10.417vw] md:h-[40px]"
                      style={{
                        border: "1px solid #DDE1EA",
                        borderRadius: "8px",
                      }}
                    />
                  ) : null}

                  {searchIcon == true ? (
                    // <i className='appleRep-search-normal text-[24px] xl:text-[18px] 3xl:text-[1vw] align-top' title='Search'></i>
                    <IconField className="custSearch" iconPosition="right">
                      <InputIcon className="appleRep-search-normal text-[24px] xl:text-[18px] 3xl:text-[1vw] ">
                        {" "}
                      </InputIcon>
                      <InputText v-model="value1" placeholder="Search" />
                    </IconField>
                  ) : null}
                  {tablecellvalue == true ? (
                    <>
                      <div className="flex items-center gap-1.5 2xl:gap-[0.417vw] text-xs 2xl:text-[0.729vw] leading-normal">
                        <div className="white_text_color font-light">
                          Table cell values:
                        </div>
                        <div className="white_text_color font-medium">
                          # of enrolled students
                        </div>
                      </div>
                    </>
                  ) : null}
                  {graphIcon == true ? (
                    <Link href="" className="leading-none">
                      <i
                        className="finance-graph text-[14px] xl:text-[0.94vw] align-top"
                        title="Add proper title here"
                      ></i>
                    </Link>
                  ) : null}
                  {downloadIcon == true ? (
                    <Link href="" className="leading-none">
                      <i
                        className="finance-lightbulb text-[14px] xl:text-[0.94vw] align-top"
                        title="Add proper title here"
                      ></i>
                    </Link>
                  ) : null}
                  {bulbIcon == true ? (
                    <Link href="" className="leading-none">
                      <i
                        className="finance-note-download text-[14px] xl:text-[0.94vw] align-top"
                        title="Add proper title here"
                      ></i>
                    </Link>
                  ) : null}
                  {infoIcon == true ? (
                    <Link href="" className="leading-none">
                      <i
                        className="finance-info text-[14px] xl:text-[0.94vw] align-top"
                        title="Add proper title here"
                      ></i>
                    </Link>
                  ) : null}
                  {props.maximizeIcon == true ? (
                    <Link
                      href=""
                      className="leading-none"
                      onClick={() => {
                        onToggle();
                      }}
                    >
                      <i
                        onClick={handleClick}
                        className="finance-pluse text-[14px] xl:text-[0.94vw] align-top"
                      ></i>
                    </Link>
                  ) : null}
                  {ExportIcon == true ? (
                    <div>
                      <div className="card flex">
                        <button onClick={(e) => op.current.toggle(e)}>
                          <div className="cursor-pointer leading-none bg-dark-black-color-900 text-gray-color-400 w-5 h-5 flex items-center justify-center">
                            <i
                              className="ru-three-dots text-[4px]"
                              title="Click here for multiple option"
                            ></i>
                          </div>
                        </button>
                        <OverlayPanel
                          ref={op}
                          className="dropdownList custoverly custOverlayPanel"
                        >
                          <div className="flex flex-col text-left gap-y-2 wrapperOption text-[14px] xl:text-[0.730vw] text-[#363A44] dark:text-[#F2F2F5]">
                            {/* <button className='flex gap-2 items-center hover:text-[#4FB155] dark:hover:text-[#4FB155] ease-linear duration-200' href='' onClick={() => { handlePrintBots(); onExit(); }}>
                                <i className='pi pi-print '></i>
                                <span>Print to pdf</span>
                              </button> */}
                            <button className="flex gap-2 items-center text-[#fff] hover:text-[#4FB155] dark:hover:text-[#4FB155] ease-linear duration-200">
                              <i className="pi pi-download "></i>
                              <CSVLink {...csvReport}>Export to CSV</CSVLink>
                            </button>
                            <div className="flex gap-2 items-center text-[#fff] cursor-pointer hover:text-[#4FB155] dark:hover:text-[#4FB155] ease-linear duration-200">
                              <i className="pi pi-download "></i>
                              <ExcelDownloader
                                data={formatDownloadedData}
                                formatFileName={formatFileName}
                              />
                            </div>
                            {/* <div className='flex gap-2 items-center cursor-pointer hover:text-[#4FB155] dark:hover:text-[#4FB155] ease-linear duration-200'>
                                <i className='pi pi-download '></i>
                                <PdfDownloader
                                  title={formatFileName}
                                  isDetailedExport={isDetailedExport}
                                  data={formatDownloadedData}
                                  id={props.id}
                                /></div> */}
                          </div>
                        </OverlayPanel>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div ref={Bots}>{props.data}</div>
            </div>
          </div>
        )}
      </ReactFullscreen>
    </div>
  );
}
