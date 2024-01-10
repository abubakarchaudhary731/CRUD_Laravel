import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({
  totalRows,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  setRecordsPerPage
}) {
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <div className='tw-flex tw-justify-center'>
      <TablePagination
        component="div"
        count={totalRows}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={recordsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}