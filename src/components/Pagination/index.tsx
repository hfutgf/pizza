import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination : React.FC<{onChangePage:(page:number)=>void}> = ({ onChangePage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."    
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3} 
       />
    </>
  );
};

export default Pagination;
