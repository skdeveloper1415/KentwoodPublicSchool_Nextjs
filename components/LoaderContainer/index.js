import React from "react";

import { Skeleton } from "primereact/skeleton";
const LoaderContainer = ({width,height,loading,children,...rest}) => {
//   const { cssClass, width, height, loading } = props;
  return (
    <>

      {loading ?
        <Skeleton width={width} height={height} {...rest}></Skeleton>
        :
        children
      }
    </>
  );
};



export default LoaderContainer;

