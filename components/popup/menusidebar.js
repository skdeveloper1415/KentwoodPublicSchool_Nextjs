"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sidebar } from "primereact/sidebar";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

export default function MenuSideBar(props) {
  const { visible, onHide, setActiveIndexList, setMenuSideBarpopup } = props;

  return (
    <>
      <div>
        <Sidebar
          visible={visible}
          onHide={onHide}
          position="right"
          className="custmSidebar 2xl:w-[18.75vw] bg-[#1F1E1C]"
          blockScroll={true}
        >
          <div className="p-[28px] 2xl:p-[1.667vw] space-y-[18px] 2xl:space-y-[2.5vw]">
            <Image src={'/images/menu-logo.svg'} alt="logo" width={245} height={65} className="2xl:w-[12.76vw] 2xl:h-[3.385vw]" />
            <div>
                <ul className="2xl:space-y-[0.833vw] space-y-[14px]">
                    <li><Link href={'/'} className="bg_darkbrown_color p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Home</Link></li>
                    <li><Link onClick={() => {setActiveIndexList(0), setMenuSideBarpopup(false)}} href={'/goals'} className="bg_darkbrown_color  p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Culture of Excellence</Link></li>
                    <li><Link onClick={() => {setActiveIndexList(1), setMenuSideBarpopup(false)}} href={'/goals'} className="bg_darkbrown_color  p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Equitable Opportunities & Outcomes</Link></li>
                    <li><Link onClick={() => {setActiveIndexList(2), setMenuSideBarpopup(false)}} href={'/goals'} className="bg_darkbrown_color  p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Whole-Child Environments</Link></li>
                    <li><Link onClick={() => {setActiveIndexList(3), setMenuSideBarpopup(false)}} href={'/goals'} className="bg_darkbrown_color  p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">High Impact, Diverse Staff</Link></li>
                    <li><Link href={'https://www.kentwoodps.org/ourdistrict/strategic-plan/'} target="_blank" className="bg_darkbrown_color  p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Strategic Plan Homepage</Link></li>
                    {/* <li><Link href={'/goals'} className="bg_darkbrown_color p-[15px] 2xl:p-[0.781vw] 2xl:rounded-[0.313vw] rounded-md white_text_color text-sm 2xl:text-[0.833vw] font-normal 2xl:leading-[1.042vw] inline-block w-full transition ease-in-out delay-150 duration-300 hover:bg-[#47403C]">Strength and Weakness</Link></li> */}
                </ul>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
