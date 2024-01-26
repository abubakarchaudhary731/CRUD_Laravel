import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { multipleDeleteCompany, indexData, viewSingleCompany } from '../Redux/Company';
import { deleteData } from '../Redux/Company';
import TylexTechAlert from '../Components/TylexTechAlert';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Button } from '@mui/material';
import { Add } from 'iconsax-react';
import DeleteForever from '@mui/icons-material/DeleteForever';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CompanyTable = ({
  handleCheckAll,
  selectedRow,
  allData,
  handleSingleRow,
  navigate,
  Employees,
  viewSingleData,
  handleClickOpen,

}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox style={{ color: "white" }}
                  onChange={handleCheckAll}
                  checked={selectedRow.length ? true : false}
                />
              </StyledTableCell>
              <StyledTableCell> Name </StyledTableCell>
              <StyledTableCell> Email </StyledTableCell>
              <StyledTableCell> Employee </StyledTableCell>
              <StyledTableCell> Actions </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(allData) && allData.map((row) => {
              const filterData = Employees.filter((ele) => ele.company === row.id);
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox style={{ color: "black" }}
                      checked={Array.from(selectedRow).includes(row.id)}
                      onChange={handleSingleRow}
                      value={row.id}
                    />
                  </StyledTableCell>
                  <StyledTableCell> {row.name} </StyledTableCell>
                  <StyledTableCell> {row.email} </StyledTableCell>
                  <StyledTableCell> {Array.isArray(filterData) && filterData.length} </StyledTableCell>
                  <StyledTableCell>
                    <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-gray-500' onClick={() => viewSingleData(row.id)}><VisibilityIcon /></i>
                    <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-green-700' onClick={() => navigate(`/company/edit/${row.id}`)}><EditIcon /></i>
                    <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-red-500' onClick={() => handleClickOpen(row.id)}> <DeleteForeverIcon /></i>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>


    </>
  )
}

export default CompanyTable