import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { OverlayPanel } from 'primereact/overlaypanel';
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import MenuSideBar from '../popup/menusidebar'
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
export default function Top({ ...pageProps }) {
  const [MenuSideBarpopup, setMenuSideBarpopup] = useState(false);
  const notificatio = useRef(null);
  const profile = useRef(null);
  const pathname = usePathname();
  console.log('pathname: ', pathname);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
      const handleScroll = () => {
          const isScrolled = window.scrollY > 0;
          setScrolled(isScrolled);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <>
      <header className={`${scrolled && (pathname === '/' || pathname === '/landing' || pathname === '/goals' )? 'scroll_head' : ''} max-lg:w-full sticky top-0 ${scrolled && (pathname === '/' || pathname === '/landing') ? 'max-lg:z-11 z-[21]': 'max-lg:z-10 z-[20]'} ${inter.className}`}>
        <div className='flex flex-wrap items-center justify-between pt-[18px] 2xl:pt-[1.25vw] px-[20px] lg:px-[20px] 2xl:px-[4.583vw] pb-4'>
          <div className='flex flex-wrap gap-2 xl:gap-[1.667vw] justify-between w-full'>
            <div className='flex flex-wrap gap-2 xl:gap-[1.667vw]'>
               <Link href={"/"}>
               <Image
                  src="/images/kps-logo.svg"
                  width={47}
                  height={57}
                  className="cursor-pointer"
                  alt="logo icon Main"
                />
                </Link>
            <div className="flex items-center gap-[20px] xl:gap-[32px] 3xl:gap-[1.667vw]">
              {/* <div className="flex gap-[10px] xl:gap-[0.521vw] xl:text-[0.625vw] text-[12px] font-light items-center mb-1 h-auto">
                <Link href='' className="text-gray-200">{pageProps.parentPageName}</Link>
                <div className="pi pi-angle-right text-[12px] text-gray-200"></div>
                <Link href='' className="white_text_color ">{pageProps.pageName}</Link>
              </div> */}
              <div className="white_text_color xl:text-[1.50vw] text-[14px] lg:text-[24px] font-semibold ">{pageProps.pageTitle}</div>

            
              {
                  pathname === '/landing' &&
              <Image
                  src="/images/landing_logo.png"
                  width={200}
                  height={55}
                  className=""
                  alt="logo icon Main"
                />
                  
              }
            </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-[18px]2xl:gap-[1.042vw] z-0"> 
            {pathname === '/' || pathname === '/landing' ? 
            pageProps.isAuthenticated ?
                  <Link
                    href="" onClick={pageProps.handleGoogleLogout}
                    className="logText h-[35px] bg-[#773310] text-[14px] xl:text-[14px] 2xl:text-[1vw] 3xl:text-[0.729vw]
             px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[12px] xl:py-[11px] 3xl:py-[0.600vw] white_text_color font-normal rounded-sm flex justify-center items-center  w-[170px]
             xl:w-[170px]  3xl:w-[8.854vw]"
                  >
                    {/* <Image src={'/images/googleLogo.png'} className="googleLogo is-mar-right-2 " width={38} height={38} alt="Profile" /> */}
                    Sign Out
                  </Link>
                  :
                  <Link
                    href="" onClick={pageProps.handleGoogleLogin}
                    className="logText h-[35px] bg-[#773310] text-[14px] xl:text-[14px] 2xl:text-[1vw] 3xl:text-[0.729vw]
             px-[16px] xl:px-[16px] 3xl:px-[0.833vw] py-[12px] xl:py-[11px] 3xl:py-[0.600vw] white_text_color font-normal rounded-sm flex justify-center items-center w-fit lg:w-[170px]
             xl:w-[170px]  3xl:w-[8.854vw]"
                  >
                    {/* <Image src={'/images/googleLogo.png'} className="googleLogo is-mar-right-2 " width={38} height={38} alt="Profile" /> */}
                    Sign In
                  </Link> : null
                }
              <div className="2xl:py-[0.26vw] 2xl:px-[1.042vw] flex items-center gap-5 3xl:gap-[0.781vw]">      
              {/* <div className="3xl:p-[0.625vw] relative cursor-pointer ">
                <div className="bg-[#FF0000] rounded-full h-4 w-4 absolute 3xl:top-[-1px] 3xl:right-0 xl:top-[-10px] -right-2.5 white_text_color flex justify-center text-[10px] p-[5px] items-center">7</div>
                <Link href={''} onClick={(e) => notificatio.current.toggle(e)} title="Notification">
                <i className="ru-notification white_text_color text-[20px]"></i>
                </Link>
                </div>
                
                <Link href={''}  title="Notification">
                <i className="ru-theme white_text_color text-[20px]"></i>
                </Link> */}
              {/* <div className="flex items-center gap-5 3xl:gap-[1.042vw] cursor-pointer border-l" > */}
              <div className="flex items-center gap-5 3xl:gap-[1.042vw] cursor-pointer" >
                {/* <div className="flex items-center gap-3 3xl:gap-[0.625vw] cursor-pointer" onClick={(e) => profile.current.toggle(e)}>
                  <div className="3xl:space-y-[0.213vw] space-y-[6px]">
                    <div className="text-[#374151] text-[16px] xl:text-[0.833vw] font-semibold block leading-none"> Jese Leos</div>
                    <div className="text-[#374151] text-[14px] xl:text-[0.729vw] block">Admin</div>
                  </div>
                  <div><Image src={'/images/profile.png'} width={38} height={38} alt="Profile" /></div>

                </div> */}
              <div className="bg_transprant_color_100 w-[2.708vw] h-[2.708vw] flex items-center justify-center cursor-pointer" onClick={() => setMenuSideBarpopup(true)}><i className="ru-menu-toggle white_text_color text-[18px] 2xl:text-[1.042vw]"></i></div>
              </div>
              </div>
              
            </div>
          </div>

        </div>

        <OverlayPanel ref={notificatio} className={`notificatio_popup ${inter.className} custOverlayPanel`}>
          <div className=''>
            <div className="w-full min-w-[418px] origin-top-right bg-[#1F2A37]  box-shadow">
              <div className="flex items-center justify-between">
                <div className="text-[#fff] text-sm lg:text-md 2xl:text-lg font-bold">Notifications</div>
              </div>
              <SimpleBar className="pr-4" style={{ maxHeight: '300px', }}>
                <div className="mt-5 divide-y divide-solid divide-[#D8D8D8] list-space" data-simplebar>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">New Order has been placed</div>
                        <div className="text-[#fff] text-sm">Order #00000</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#4FB155]"></div>
                    </div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">End Customer has requested for discount on</div>
                        <div className="text-[#fff] text-sm">Product A</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">New Order has been placed</div>
                        <div className="text-[#fff] text-sm">Order #00000</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#4FB155]"></div>
                    </div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">New Order has been placed</div>
                        <div className="text-[#fff] text-sm">Order #00000</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#4FB155]"></div>
                    </div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">New Order has been placed</div>
                        <div className="text-[#fff] text-sm">Order #00000</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#4FB155]"></div>
                    </div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="text-sm text-[#fff] font-bold">End Customer has requested for discount on</div>
                        <div className="text-[#fff] text-sm">Product A</div>
                        <div className="text-[#9CA1AB] text-sm">11:15 am, 14th Feb.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
            </div>
          </div>
        </OverlayPanel>

        <OverlayPanel ref={profile} className="profile_popup custOverlayPanel">
          <div >
            <div className="flex flex-col gap-4 3xl:gap-[0.833vw] text-[#fff] bg-[#1F2A37]  text-sm font-normal leading-[14px] 3xl:text-[0.729vw] 3xl:leading-[0.729vw] p-3 3xl:p-[0.625vw]">
              <Link href={''} className="flex items-center gap-2 3xl:gap-[0.208vw]"><i className="loco-user"></i><span>Profile</span></Link>
              <Link href={''} className="flex items-center gap-2 3xl:gap-[0.208vw]"><i className="loco-key"></i><span>Change Password</span></Link>
              <Link href={''} className="flex items-center gap-2 3xl:gap-[0.208vw]"

              >
                <i className="loco-logout" ></i><span>Logout</span></Link>
            </div>
          </div>
        </OverlayPanel>

        <MenuSideBar
                visible={MenuSideBarpopup}
                onHide={() => {
                  setMenuSideBarpopup(false)
                }}
                setMenuSideBarpopup={setMenuSideBarpopup}
                setActiveIndexList={pageProps.setActiveIndexList}
            />

      </header>

    </>
  );
}
