import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './style.module.css';

const Pagination = ({ onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.paginate}
            breakLabel="..."
            nextLabel=" >"
            previousLabel="< "
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    );
};
export default Pagination;