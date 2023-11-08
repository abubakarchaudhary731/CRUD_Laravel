import React, {useEffect , useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { indexData } from '../Redux/AddCompany';
import { deleteData } from '../Redux/AddCompany';
import AlertDialogSlide from '../Components/Dialog';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const {value, loading} = useSelector((state) => state.Company);
  const allData = value.data;

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
  
  // const onConfirm = ({id, list}) => {
  //   dispatch(deleteData({id, list})).then(() => {
  //     dispatch(indexData());
  //   })
    
  // }

  return (
    <>
    <div className='tw-mt-20 tw-ml-3'>
        <ul className='tw-px-20 tw-text-white'>
        {
            allData && allData.map((curlElem) => {
              return (
                <li className=' tw-bg-slate-500 tw-mr-3 tw-rounded-lg tw-p-2 tw-mt-3 tw-px-5' key={curlElem.id}>
                  <div className='tw-flex tw-justify-between'>
                    
                    <h1 className='tw-my-auto'> {curlElem.name}  </h1>
                    <p  className='tw-my-auto'> {curlElem.email} </p>
                   <div className='tw-flex tw-gap-2'> 
                    <i className='tw-cursor-pointer hover:tw-bg-slate-100 tw-p-2 tw-rounded-lg'><VisibilityIcon /></i>
                    <i className='tw-cursor-pointer hover:tw-bg-slate-100 tw-p-2 tw-rounded-lg'><EditIcon /></i>
                    <i className='tw-cursor-pointer hover:tw-bg-slate-100 tw-p-2 tw-rounded-lg' onClick={handleClickOpen}> <DeleteForeverIcon /></i>

                  </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
    </div>


    <AlertDialogSlide 
    open={open}
    handleClose={handleClose}
     />
    </>
  )
}

export default Home