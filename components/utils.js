export const TextWrapper = () => {
    return (
        <>
            <div className="my-[20px]">
                <p className="text-sm xl:text-[16px] 3xl:text-[0.833vw] leading-tight tracking-normal text-[#8a8e93] font-light">
                    Establish, implement and uphold a common standard of excellence for school climate and instruction.
                </p>
            </div>
        </>
    )
}

export const formatMetricNameChart = (metric) => {
    if (metric === 'percentage') {

        return `%`;
    }
    return ``;
}
export const getReadableValue = (value) => {
    return Number(value).toLocaleString() || 0
}

export const checkIfNegative = (value) => {
    if (Number(value) < 0) {
        return true;
    } else {
        return false;
    }
}

export const formatMetricValue = (metric) => {
    if (metric.METRIC_TYPE === 'percentage') {

        return `${metric.VALUE}%`;
    }
    return getReadableValue(metric.VALUE);
}

export const formatMetricNameSymbol = (metric) => {
    if (metric.METRIC_TYPE === 'percentage') {

        return `%`;
    }
    return ``;
}

export const checkPercentageColumn = (data) => {
    return data.some(item => item.METRIC_TYPE === "percentage");
}

export const aggregateDataToptile = (dataArray) => {
    const result = dataArray.reduce((acc, item) => {
        const year = item.ACADEMIC_YEAR;
        if (!acc[year]) {
            acc[year] = {
                ACADEMIC_YEAR: year,
                METRICS: [],
                VALUE: 0,
                VARIANCE: 0
            };
        }

        acc[year].METRICS.push({
            METRIC_ID: item.METRIC_ID,
            METRIC_NAME: item.METRIC_NAME,
            METRIC_GROUP: item.METRIC_GROUP,
            METRIC_TYPE: item.METRIC_TYPE,

            PY_VALUE: item.PY_VALUE,

        });

        acc[year].VALUE += item.VALUE;
        acc[year].VARIANCE += item.VARIANCE;

        return acc;
    }, {});

    return Object.values(result);
}


export const getUniqueValues = (dataArray, columnName) => {
    if (!columnName) {
        return [];
    }

    const uniqueValuesSet = [...new Set(dataArray.map(item => item[(columnName?.code)?.toUpperCase()]))]
    return uniqueValuesSet;
};

export const pivotData = (trendAnalysisChart, selectedBreakdown) => {
    const dynamicKey = (selectedBreakdown?.code).toUpperCase();

    return trendAnalysisChart.map(curr => {
        const pivotKey = curr[dynamicKey];

        return {
            ...curr,
            [pivotKey]: curr.VALUE
        };
    });
}

export const ConvertToK = (value) => {
    if (value > 1000) {
        return (value / 1000)?.toFixed(1) + "k";
    } else {
        return value;
    }
}
const getTrimData = (year) => {
    return year?.replace("Fall", "").trim()
}

export const sortDataForChartByYear = (data, isFall = false) => {
    const ReturnData = [...data]?.sort((a, b) => {
        return getTrimData(a.ACADEMIC_YEAR) - getTrimData(b.ACADEMIC_YEAR)
        // a.ACADEMIC_YEAR - b.ACADEMIC_YEAR
    });
    return ReturnData

}


export const sortDataForToptile = (data) => {
    return [...data]?.sort((a, b) => b.ACADEMIC_YEAR - a.ACADEMIC_YEAR).slice(0, 4)
}

export const getLastFourYearsDataFallAcademicYear = (data) => {
    const sortedData = [...data].sort((a, b) => {
        const yearA = parseInt(a.ACADEMIC_YEAR.split(" ")[1]) || parseInt(a.ACADEMIC_YEAR);
        const yearB = parseInt(b.ACADEMIC_YEAR.split(" ")[1]) || parseInt(b.ACADEMIC_YEAR);
        return yearA - yearB;
    });
    const DataReturn = sortedData.slice(2, 5)

    return DataReturn
}
export function  toMillion(value)
    {
        if(value<0){
           
            return Math.abs(Number(value)) >= 1.0e9
            ? "("+"$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M" + ")"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? "("+"$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M" + ")"
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? "("+"$"+-(Math.abs(Number(value)) / 1.0e3).toFixed(1) + "K" + ")"
            : "("+"$"+-(Math.abs(Number(value))).toFixed(1);
        }else{
            return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M"
            : // Six Zeroes for Millions
            Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(1) + "M"
            : // Three Zeroes for Thousands
            Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e3).toFixed(1) + "K"
            : (Math.abs(Number(value))).toFixed(1);
        }
    }
 
    export function FormatNum(value, max=0, min=0){
        return value?.toLocaleString('en-US', { minimumFractionDigits: min, maximumFractionDigits: max})
    }

    export function getRankSuffix(number) {
        let Number = number?.toFixed(0) 
        const j = Number % 10,
              k = Number % 100;
        if (j == 1 && k != 11) {
            return Number + "st";
        }
        if (j == 2 && k != 12) {
            return Number + "nd";
        }
        if (j == 3 && k != 13) {
            return Number + "rd";
        }
        return Number + "th";
    }

    /* Gradient Colors */
    function getGradientColor(startColor, endColor, factor){
        const interpolate = (start, end, factor) => start + (end - start) * factor;
      
        const startRGB = startColor.match(/\d+/g).map(Number);
        const endRGB = endColor.match(/\d+/g).map(Number);
      
        const resultRGB = startRGB.map((start,index)=>
          Math.round(interpolate(start,endRGB[index],factor))
        );
        return `rgb(${resultRGB.join(",")})`;
        // return rgbaToHex(...resultRGB)
    }
      
    function rgbaToHex(r, g, b, a) {
        const toHex = (n) => n.toString(16).padStart(2, '0');
        const alpha = Math.round(a * 255);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
    }
      
    export function getGradientColorMapByValues(arr, startColor, endColor){
        const min = Math.min(...arr)
        const max = Math.max(...arr)
        const diff = max - min
      
        return arr.reduce((acc,value)=>{
          if(!acc[String(value)]){
            const factor = (value - min) / diff
            acc = {...acc,[String(value)]: isNaN(factor) ? startColor : getGradientColor(startColor, endColor, factor)}
          }
          return acc
        },{})
    }

    // export function GenerateGradiantColorForechartsBars(arr, {startColor, endColor}){
    //     const Colours_map = getGradientColorMapByValues(arr, startColor, endColor)

    //     return arr?.map(value => ({
    //         value: value,
    //         itemStyle: {color: Colours_map[`${value}`]}
    //       }))
    // }
    export function GenerateGradiantColorForechartsBars(arr, {startColor, endColor} ,valuekey, labelkey){
        const Colours_map = getGradientColorMapByValues(arr.map(val => parseInt(val?.[labelkey]?.split("-")[1])), startColor, endColor)

        return arr?.map(value => ({
            value: value?.[valuekey],
            itemStyle: {color: Colours_map[`${parseInt(value?.[labelkey]?.split("-")[1])}`]}
          }))
    }
    /*  */

    export const ChartSplitLine = ({x,y,color,yFormatter,name})=>{
        const data = []
        if(x){
          data.push(
            { // Vertical line
              xAxis: x
            }
          )
        }
        if(y){
          data.push(
            { // Horizontal line
              yAxis: y,
              label: {
                show: true,
                position: 'insideEndTop',
                color: '#fff',
                formatter: yFormatter ? yFormatter : `${name || "Statewide Average"}: {c}%`,
                opacity: 1

            }
            }
          )
        }
    
        return {
          symbol: 'none', // Remove symbols
          lineStyle: {
            type: 'solid',
            // color: color ? color : '#fff',
            // color: color ? color : '#5a6b7a',
            color: color ? color : 'grey',
            // color: color ? color : '#FFFFFF80',
            width: 2, // Adjust the width to make it more visible
            opacity: .5
          },
          label:{
            show: false,
          },
          data: data,
          silent: true // This will hide the tooltip for the markLine   
      }
      }