import React, { useEffect, useRef } from "react";
// import { ReusableTable } from "../Table_one";
import ContactTableWithPagination from "./contracttable";

export default function ContactPage() {

  return (
    <div className=" relative">
 
  
       <div className=" ">
      
            {/* {loading ? (
   <LoadingAnimations loading={loading} />
      ) :
     ( */}
          <ContactTableWithPagination  />
          {/* )} */}
      
      </div>
  
    </div>
  );
}