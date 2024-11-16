import * as React from 'react';
import * as XLSX from 'xlsx';

const ExcelDownloader = (props) => {

    // const handleExport = () => {
    //     var ws = XLSX.utils.json_to_sheet(props?.data);
    //     ws['!cols'] = [];
    //     // ws['!cols'][0] = { hidden: true };
    //     var wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
    //     XLSX.writeFile(wb, `${props?.formatFileName}.xlsx`);
    // }

    const handleExport = () => {
        var ws = XLSX.utils.json_to_sheet(props?.data);

        const columnWidths = props?.data[0] ? Object.keys(props?.data[0]).map(key => {
            return {
                wch: Math.max(
                    ...props?.data?.map(row => (row[key] ? row[key]?.toString()?.length : 0)),
                    key?.length + 5
                )
            };
        }) : [];

        ws['!cols'] = columnWidths || [];
        // ws['!cols'][0] = { hidden: true };
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'MySheet1');
        XLSX.writeFile(wb, `${props.formatFileName}.xlsx`);
    }


    return (
        <>
            <h6 onClick={handleExport}>Export as Xlsx</h6>
        </>
    );
}

export default ExcelDownloader