import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';


export default function YearFilter(props){

    const [SelectedYears, setSelectedYears] = useState(null)

    return(
        <MultiSelect value={SelectedYears} onChange={(e) => setSelectedYears(e.value)} options={props?.options} optionLabel={props?.optionLabel || "name"} 
            placeholder="Select Years" maxSelectedLabels={3} className="w-[200px]  2xl:w-[11.198vw] 2xl:h-[1.51vw] h-[24px] custom_multiselect"
            panelClassName='custom_multiselect_panel' />
    )
}