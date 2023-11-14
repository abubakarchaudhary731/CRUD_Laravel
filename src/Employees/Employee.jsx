import React, {useEffect, useState} from 'react';
import TylexTechTable from '../Components/TylexTechTable';
import { Add } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, employeeList, viewSingleEmployee } from '../Redux/Employee';
import TylexTechDialog  from '../Components/TylexTechDialog';
import TylexTechAlert from '../Components/TylexTechAlert';


const Employee = () => {
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

  const {Employees, employeeData} = useSelector((state) => state.Employee);
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
      <div className='tw-px-12 tw-py-2 tw-border-b-2 tw-border-b-gray-300'>
        <div className='tw-flex tw-justify-between tw-items-center'>
          <h1 className='tw-text-2xl tw-font-bold'> Employee List ({Array.isArray(Employees) && Employees.length}) </h1>
          <Link to={"/employee/create"} >
            <Button style={{color: "black"}}> Add <Add /> </Button>
          </Link>
        </div>
      </div>
    </div>

    <TylexTechTable 
      handleCheckAll={handleCheckAll}
      handleSingleRow={handleSingleRow}
      selectedRow={selectedRow}
      employeeList={Employees}
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

export default Employee