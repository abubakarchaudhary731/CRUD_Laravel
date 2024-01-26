import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function TylexTechDialog({ handleDialogClose, open, employeeIndex }) {

  return (
    <>
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          '& .MuiPaper-root': {
            minWidth: "400px"
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Employee
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Name: </b> {employeeIndex?.first_name} {employeeIndex?.last_name}
          </Typography>
          <Typography gutterBottom>
            <b>Email: </b> {employeeIndex?.email}
          </Typography>
          <Typography gutterBottom>
            <b>Phone: </b> {employeeIndex?.phone}
          </Typography>
          <Typography gutterBottom>
            <b>CompanyId: </b> {employeeIndex?.company}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
