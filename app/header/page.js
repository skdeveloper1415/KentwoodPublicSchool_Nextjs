"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import EquitableOpportunitiesOutcome from '../../components/popup/equitableopportunities'
import Layout from "../../components/layout/pagelayout";
import KeyIndicatorsPopup from "../../components/popup/keyindicatorspopup";
import CultureofExcellence from "../../components/popup/cultureofexcellence";
import WholeChildEnvironment from "../../components/popup/environments";
import ImpactDiverseStaff from "../../components/popup/diversestaff";
import OpportunityKeyIndicatorsPopup from "../../components/popup/opportunitykeyindicatorspopup";
import Advancedplacement from "../../components/popup/advancedplacement";
import Tab1 from "../../components/popup/freshmanonTrack";
import Tab2 from "../../components/popup/fourYearGraduationRate";
import Tab3 from "../../components/popup/satAssessment";





const Dashboard = () => {
  const [EquitableOpporpopup, setEquitableOpporpopup] = useState(false);
  const [Culturepopup, setCulturepopup] = useState(false);
  const [WholeChildEnvironmentpopup, setWholeChildEnvironmentspopup] = useState(false);
  const [ImpactDiverseStaffpopup, setImpactDiverseStaffpopup] = useState(false);
  const [Indicatorspopup, setIndicatorspopup] = useState(false);
  const [OpportunityIndicatorspopup, setOpportunityIndicatorspopup] = useState(false);
  const [tab1spopup, setTab1spopup] = useState(false);
  const [tab2spopup, setTab2spopup] = useState(false);
  const [tab3spopup, setTab3spopup] = useState(false);

  const [advancedplacement, setAdvancedPlacement] = useState(false);
  return (
    <div className="bg_wrap h-screen">
      <Layout
        pageTitle="Strategic Plan Dashboard"
        parentPageName="Kentwood Public School Strategic Dashboard"
        pageName="Strategic Plan Dashboard"
      >
      <div onClick={() => setCulturepopup(true)} className="white_text_color">Culture of Excellence popup</div>
 
      <div onClick={() => setEquitableOpporpopup(true)} className="white_text_color"> Equitable Opportunities Outcomes popup</div>
      <div onClick={() => setWholeChildEnvironmentspopup(true)} className="white_text_color">Whole-Child Environments</div>
      <div onClick={() => setImpactDiverseStaffpopup(true)} className="white_text_color">Impact Diverse Staff</div>


      <div onClick={() => setIndicatorspopup(true)} className="white_text_color">Indicators</div>
       
      <div onClick={() => setOpportunityIndicatorspopup(true)} className="white_text_color">Opportunities Indicators</div>
      
      <div onClick={() => setAdvancedPlacement(true)} className="white_text_color">Advanced Placement</div>
      <div onClick={() => setOpportunityIndicatorspopup(true)} className="white_text_color">barlinechart</div>
      <div onClick={() => setTab1spopup(true)} className="white_text_color">Tab 1</div>
      <div onClick={() => setTab2spopup(true)} className="white_text_color">Tab 2</div>
      <div onClick={() => setTab3spopup(true)} className="white_text_color">Tab 3</div>
       
      <EquitableOpportunitiesOutcome
                visible={EquitableOpporpopup}
                onHide={() => {
                  setEquitableOpporpopup(false)
                }}
            />

          <KeyIndicatorsPopup
                visible={Indicatorspopup}
                onHide={() => {
                  setIndicatorspopup(false)
                }}
            />

          <CultureofExcellence
                visible={Culturepopup}
                onHide={() => {
                  setCulturepopup(false)
                }}
            />

          <WholeChildEnvironment
                visible={WholeChildEnvironmentpopup}
                onHide={() => {
                  setWholeChildEnvironmentspopup(false)
                }}
            />

          <ImpactDiverseStaff
                visible={ImpactDiverseStaffpopup}
                onHide={() => {
                  setImpactDiverseStaffpopup(false)
                }}
            />

          <OpportunityKeyIndicatorsPopup
                visible={OpportunityIndicatorspopup}
                onHide={() => {
                  setOpportunityIndicatorspopup(false)
                }}
            />
          <Advancedplacement
                visible={advancedplacement}
                onHide={() => {
                  setAdvancedPlacement(false)
                }}
            />
          <Tab1
                visible={tab1spopup}
                onHide={() => {
                  setTab1spopup(false)
                }}
            />
          <Tab2
                visible={tab2spopup}
                onHide={() => {
                  setTab2spopup(false)
                }}
            />
          <Tab3
                visible={tab3spopup}
                onHide={() => {
                  setTab3spopup(false)
                }}
            />
           

      </Layout>
    </div>
  );
};

export default Dashboard;
