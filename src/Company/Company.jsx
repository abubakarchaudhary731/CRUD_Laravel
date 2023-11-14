import React, {useEffect , useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { indexData, viewSingleCompany } from '../Redux/Company';
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

const Company = () => {
  const [open, setOpen] = useState(false);
  const [getId, setGetId] = useState();
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {Employees} = useSelector((state) => state.Employee)
  const {value, loading} = useSelector((state) => state.Company);
  const allData = value.data;

  const handleCheckAll = () => {
    setSelectAll(!selectAll);
    setSelectedRow(selectAll ? [] : allData.map((data) => data.id));
  };

  const handleSingleRow = (e) => {
    e.target.checked
        ? setSelectedRow([...selectedRow, parseInt(e.target.value)])
        : setSelectedRow(
            selectedRow.filter((item) => item !== parseInt(e.target.value)),
        );
};

  const handleClickOpen = (id) => {
    setOpen(true);
    setGetId(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
   dispatch(indexData());
  }, []
  );

  if (loading) {
    return ( 
      <div className='tw-flex tw-justify-center tw-h-screen' >
      <div className='tw-my-auto'> 
        <h1>loading...</h1>
      </div>
  </div>
     )
  }
  console.log(selectedRow);
  
  const onConfirm = ({id, list}) => {
    dispatch(deleteData({id, list})).then(() => {
      dispatch(indexData());
    })
  }

  const handleSeletedRows = () => {
    dispatch(deleteData({id:selectedRow, list:allData})).then(() => {
      dispatch(indexData());
      setSelectedRow([]);
    })
  }

  // View Single Data.
const viewSingleData = (id) => {
  dispatch(viewSingleCompany(id))
  navigate(`/company/details/${id}`)
};

  return (
    <>
    <div className='tw-fixed tw-z-10 tw-top-14 tw-left-0 tw-right-0 tw-bg-gray-50'>
      <div className='tw-px-12 tw-py-2 tw-border-b-2 tw-border-b-gray-300'>
        <div className='tw-flex tw-justify-between tw-items-center'>
          <h1 className='tw-text-2xl tw-font-bold'> Company List ({Array.isArray(allData) && allData.length}) </h1>
          <Link to={"/company/create"} >
            <Button style={{color: "black"}}> Add <Add /> </Button>
          </Link>
        </div>
      </div>
    </div>

    <div className='tw-mx-12 tw-mt-20'>
      <div className='tw-flex tw-justify-between tw-bg-gray-50 tw-px-4 tw-font-bold tw-rounded-lg'> 
        {
          selectedRow.length >= 1 ? (
          <div className='tw-flex tw-justify-between tw-w-full'> 
            <h1 className='tw-my-4 tw-text-xl'> {Array.isArray(selectedRow) && selectedRow.length} Selected </h1>
            <Button onClick={handleSeletedRows}>
              <DeleteForever />
            </Button>
           </div>)
          : (
            <h1 className='tw-my-4 tw-text-xl'> Table </h1>
          )
         
        }
      </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox style={{color: "white"}}
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
              <Checkbox style={{color: "black"}}
                  checked={Array.from(selectedRow).includes(row.id)}
                  onChange={handleSingleRow}
                  value={row.id}
               />
              </StyledTableCell>
              <StyledTableCell> {row.name} </StyledTableCell>
              <StyledTableCell> {row.email} </StyledTableCell>
              <StyledTableCell> {Array.isArray(filterData) && filterData.length} </StyledTableCell>
              <StyledTableCell> 
                <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg' onClick={() => viewSingleData(row.id)}><VisibilityIcon /></i>
                <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg' onClick={() => navigate(`/company/edit/${row.id}`)}><EditIcon /></i>
                <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg' onClick={() => handleClickOpen(row.id)}> <DeleteForeverIcon /></i>
              </StyledTableCell>
            </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    <TylexTechAlert 
    open={open}
    handleClose={handleClose}
    onConfirm={() => onConfirm({id:getId, list:allData})} 
    title={"Confirm Deletion"} >
        This action will delete this Data! 
        <b> Are you sure you want to proceed?</b>
    </TylexTechAlert>
    </>
  )
}

export default Company