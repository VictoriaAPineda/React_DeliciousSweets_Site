import React, { useEffect } from "react";
import { useState } from "react";
// TODO: working on reusable nav component. Implement in Products...
/* 
* itemsData - an array that holds the data/info of the items to be displayed
* perPageLimit - how many items that each page will display
* setPageItems -  the set function of a useState for a sepecific state data array to be manipulated
    (to update/re-render the format of items displayed)
*/
export default function Pagination({ itemsData, perPageLimit, setPageItems}){
    const [data, setData] = useState(itemsData) // user provided 
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = perPageLimit; // User provided 

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const items = data.slice(firstIndex, lastIndex);

    const numOfPages = Math.ceil(data.length/itemsPerPage);

    // ERROR: Switching tabs results then returning to reviews messes up page totals and numbers

    useEffect(()=>{
        setPageItems(items)
    },[currentPage, items])

    useEffect(()=>{
        if(currentPage > numOfPages && numOfPages > 0){
            setCurrentPage(1)
        }
    },[currentPage, numOfPages])

    function nextPageBtn(){
        if(currentPage != numOfPages){
            setCurrentPage(currentPage + 1)
        }
    }

    function prevPageBtn(){
        if(currentPage != 1){
            setCurrentPage(currentPage - 1)
        }
    }

    return(
        <div className = "pagination_container">
        <div className = "navigation">
            {/* Working skeleton */}
            <button className="prevPageBtn"><i className="bi bi-caret-left-fill" onClick={prevPageBtn}></i></button>
                <p>{currentPage}</p>
                <i className="bi bi-slash-lg"></i>
                <p>{numOfPages}</p>
            <button className="nextPageBtn"><i className="bi bi-caret-right-fill" onClick={nextPageBtn}></i></button>
        </div>
        </div>
    )
}
