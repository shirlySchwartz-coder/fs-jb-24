import './VacationReport.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Line } from 'react-chartjs-2';
import { Box, Container, CssBaseline } from '@mui/material';

//import Box from '@mui/joy/Box';
//import Container from '@mui/joy/Container';
//import CssBaseline from '@mui/joy/CssBaseline';
import Sheet from '@mui/joy/Sheet';
const SheetValues = {
  sx: {
    width: 1000,
    height: 550,
    mx: 'auto',
    my: 2,
    py: 3,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    borderRadius: 'sm',
    boxShadow: 'md',
    alignItems: 'center',
  },
};

export function VacationReport(): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const [fData, setFData] = useState<number[]>([]);
  const [datasets, setDatasets] = useState<string[]>([]);

  const chartSetting = {
    yAxis: [
      {
        label: 'users',
      },
    ],
    width: 500,
    height: 300,
    margin: { top: 30, right: 6, bottom: 30, left: 30 },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(10px, 20px)',
      },
    },
  };
  //('http://localhost:8080/api/v1/dashboard/reports')
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/dashboard/reports'
      );
      if (response.data) {
        console.log(response.data);
        let labels = response.data.map((item: any) => item.place);
       
        let numbers = response.data.map((item: any) => item.followers);
        console.log('labels', labels,numbers);
        setData(response.data);
        setFData(numbers); 
        setDatasets(labels); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: datasets, // השתמש ב-datasets לתוויות
    datasets: [
      {
        label: 'Data Report',
        data: fData, // השתמש ב-fData לערכים
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className='VacationReport'>
      <CssBaseline />
      <Sheet variant='outlined' sx={SheetValues.sx}>
        <h2>Vacation Report</h2>
        <div>
          <Container maxWidth='sm'>
            <Box component='section' sx={{ p: 5, border: '1px solid grey' }}>
              {data.length > 0 ? (
                <>
                 
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: datasets,},]}
                    series={[{ data: fData, label: 'followers', type: 'bar' }]}
                    {...chartSetting}
                  />
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Box>
          </Container>
        </div>
      </Sheet>
    </div>
  );
}
