import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './style.module.css';

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.paginate}
            breakLabel="..."
            nextLabel=" >"
            previousLabel="< "
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    );
};
export default Pagination;
