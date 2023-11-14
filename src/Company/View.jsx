import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import TylexTechTable from '../Components/TylexTechTable';
import { useDispatch, useSelector } from 'react-redux';
import { viewSingleEmployee, deleteEmployee, employeeList} from '../Redux/Employee';
import TylexTechAlert from '../Components/TylexTechAlert';
import TylexTechDialog from '../Components/TylexTechDialog';

const View = () => {
    const {companyDetail} = useSelector((state) => state.Company);
    const companyDet = companyDetail && companyDetail.data;
// For Employee table
const [selectedRow, setSelectedRow] = useState([]);
const [selectAll, setSelectAll] = useState(false);
const [open, setOpen] = useState(false);
const [alertOpen, setAlertOpen] = useState(false);
const [getId, setGetId] = useState();
const handleAlertOpen = (id) => {
  setAlertOpen(true);
  setGetId(id)
}
const handleAlertClose = () => {
  setAlertOpen(false);
  setGetId()
}
const handleDialogClose = () => {
  setOpen(false);
};

const {id} = useParams();
const ID = parseInt(id);
const {Employees, employeeData} = useSelector((state) => state.Employee);

const filterData = Employees.filter((ele) => ele.company === ID);
const handleCheckAll = () => {
  setSelectAll(!selectAll);
  setSelectedRow(selectAll ? [] : Employees.map((data) => data.id));
};

const handleSingleRow = (e) => {
  e.target.checked
      ? setSelectedRow([...selectedRow, parseInt(e.target.value)])
      : setSelectedRow(
          selectedRow.filter((item) => item !== parseInt(e.target.value)),
      );
};
const navigate = useNavigate();
const dispatch = useDispatch();
useEffect(() => {
dispatch(employeeList())
}, []);

const showSingleEmp = (id) => {
setOpen(true);
dispatch(viewSingleEmployee(id))
}
const onConfirm = ({id, list}) => {
dispatch(deleteEmployee({id , list}))
}

return (
    <>
     <div className='tw-fixed tw-z-10 tw-top-14 tw-left-0 tw-right-0 tw-bg-gray-50'>
      <div className='tw-px-10 tw-py-2 tw-border-b-2 tw-border-b-gray-300'>
        <div className='tw-flex tw-gap-2 tw-items-center'>
          <Link to={"/company"} >
            <Button style={{color: "black"}}> <ArrowBackIcon /> </Button>
          </Link>
          <div className='tw-flex'>
            <h1 className='tw-text-3xl tw-font-bold'> {companyDet && companyDet.name} </h1>
            <h1 className='tw-text-xl tw-font-bold tw-mt-1'> ({companyDet && companyDet.email}): </h1>
          </div>
        </div>
      </div>
    </div>

    <TylexTechTable 
      handleCheckAll={handleCheckAll}
      handleSingleRow={handleSingleRow}
      selectedRow={selectedRow}
      employeeList={filterData}
      handleDialogOpen={(id) => showSingleEmp(id)}
      handleAlertOpen={(id) => handleAlertOpen(id)}
      navigate={navigate}

    />

    <TylexTechDialog 
      handleDialogClose={handleDialogClose}
      open={open}
      employeeIndex={employeeData}
    />

    <TylexTechAlert 
      open={alertOpen}
      handleClose={handleAlertClose}
      onConfirm={() => onConfirm({id:getId, list:Employees})} 
      title={"Confirm Deletion"} >
          This action will delete this Employee! 
          <b> Are you sure you want to proceed?</b>
    </TylexTechAlert>
    </>
  )
}

export default View