import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
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


const TylexTechTable = ({
  handleCheckAll,
  handleSingleRow,
  selectedRow,
  employeeList,
  handleDialogOpen,
  handleAlertOpen,
  navigate,
  handleSelectedOpen,
}) => {

  return (
    <>
      <div className='tw-mx-12 tw-mt-20'>
        <div className='tw-flex tw-justify-between tw-bg-gray-50 tw-px-4 tw-font-bold tw-rounded-lg'>
          {
            selectedRow.length >= 1 ? (
              <div className='tw-flex tw-justify-between tw-w-full'>
                <h1 className='tw-my-4 tw-text-xl'> {Array.isArray(selectedRow) && selectedRow.length} Selected </h1>
                <Button onClick={handleSelectedOpen}>
                  Delete <DeleteForever />
                </Button>
              </div>)
              : (
                <h1 className='tw-my-4 tw-text-xl'> Employee Table </h1>
              )
          }
        </div>
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
                <StyledTableCell> Phone No </StyledTableCell>
                <StyledTableCell> Company id </StyledTableCell>
                <StyledTableCell> Actions </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                Array.isArray(employeeList) && employeeList.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <Checkbox style={{ color: "black" }}
                        checked={Array.from(selectedRow).includes(row.id)}
                        onChange={handleSingleRow}
                        value={row.id}
                      />
                    </StyledTableCell>
                    <StyledTableCell> {row.first_name} {row.last_name} </StyledTableCell>
                    <StyledTableCell> {row.email} </StyledTableCell>
                    <StyledTableCell> {row.phone} </StyledTableCell>
                    <StyledTableCell> {row.company} </StyledTableCell>
                    <StyledTableCell>
                      <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-gray-500' onClick={() => handleDialogOpen(row.id)}> <VisibilityIcon /></i>
                      <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-green-700' onClick={() => navigate(`/employee/edit/${row.id}`)}> <EditIcon /></i>
                      <i className='tw-cursor-pointer hover:tw-bg-primary-icons tw-p-2 tw-rounded-lg tw-text-red-500' onClick={() => handleAlertOpen(row.id)}> <DeleteForeverIcon /></i>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default TylexTechTable