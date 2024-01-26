import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useSelector } from "react-redux";

export default function Home() {
  const {value} = useSelector((state) => state.Company);
  const {Employees} = useSelector((state) => state.Employee);

  const companyData = value && value.data;
  const companyTotal = Array.isArray(companyData) && companyData.length;
  const employeeTotal = Array.isArray(Employees) && Employees.length;

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          '& > :not(style)': {
            padding: 5,
            borderRadius: 2,
          },
        }}
      >
        <Paper elevation={20}>
          <h1 className='tw-font-bold tw-text-lg'>Total Companies</h1>
          <p className='tw-text-center'>({companyTotal})</p>
        </Paper>
        <Paper elevation={20}>
          <h1 className='tw-font-bold tw-text-lg'>Total Employees</h1>
          <p className='tw-text-center'>({employeeTotal})</p>
        </Paper>
      </Box>
    </Container>
  );
}