import React, {useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { multipleDeleteCompany, indexData, viewSingleCompany } from '../Redux/Company';
import { deleteData } from '../Redux/Company';
import TylexTechAlert from '../Components/TylexTechAlert';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Add } from 'iconsax-react';
import DeleteForever from '@mui/icons-material/DeleteForever';
import CompanyTable from './CompanyTable';


const Company = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [getId, setGetId] = useState();
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {Employees} = useSelector((state) => state.Employee)
  const {value, loading} = useSelector((state) => state.Company);
  const allData = value?.data;

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

  // if (loading) {
  //   return ( 
  //     <div className='tw-flex tw-justify-center tw-h-screen' >
  //     <div className='tw-my-auto'> 
  //       <h1>loading...</h1>
  //     </div>
  // </div>
  //    )
  // }
  
  const onConfirm = ({id, list}) => {
    dispatch(deleteData({id, list})).then(() => {
      dispatch(indexData());
    })
  }
// Selected Row data.
  const handleAlertOpen = () => { 
    setAlertOpen(true);
  }
  const handleAlertClose = () => { 
    setAlertOpen(false);
  }
  const handleSeletedRows = () => {
    dispatch(multipleDeleteCompany({company_ids: selectedRow})).then(() => {
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
          <div className='tw-flex tw-gap-4 tw-w-full'> 
            <h1 className='tw-my-4 tw-text-xl'> {Array.isArray(selectedRow) && selectedRow.length} Selected </h1>
            <Button onClick={handleAlertOpen}>
              <DeleteForever />
            </Button>
           </div>)
          : (
            <h1 className='tw-my-4 tw-text-xl'> Company Table </h1>
          )
         
        }
      </div>
      <CompanyTable
        handleCheckAll={handleCheckAll}
        handleSingleRow={handleSingleRow}
        handleClickOpen={(id) => handleClickOpen(id)}
        viewSingleData={(id) => viewSingleData(id)}
        allData={allData}
        selectedRow={selectedRow}
        Employees={Employees}
        navigate={navigate}
      />
    </div>

    <TylexTechAlert 
    open={open}
    handleClose={handleClose}
    onConfirm={() => onConfirm({id:getId, list:allData})} 
    title={"Confirm Deletion"} >
        This action will delete this Company as well as all its employees!  <br />
        <b> Are you sure you want to proceed?</b>
    </TylexTechAlert>

    <TylexTechAlert 
    open={alertOpen}
    handleClose={handleAlertClose}
    onConfirm={handleSeletedRows} 
    title={"Confirm Deletion"} >
        This action will delete all Selected Rows! 
        <b> Are you sure you want to proceed?</b>
    </TylexTechAlert>

    </>
  )
}

export default Company