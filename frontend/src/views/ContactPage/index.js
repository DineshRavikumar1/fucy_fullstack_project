import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import { useDispatch } from 'react-redux';
import { changePage } from '../../store/slices/PageSectionSlice';

export default function ContactPage (){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(changePage('contact'));
    },[]);
  return (
    <Box sx={{ marginTop:'6rem'}}>
      <Box textAlign="center" my={4}>
      <Typography
                variant="h3"
                align="left"
                gutterBottom
                sx={{ 
                    borderBottom: '1px solid black',
                    pb: 2 ,
                    mx:18
                    }}
                fontSize={25}
                fontWeight={700}
            >
          Contact us
            </Typography>
      </Box>
     <ContactForm/>
    </Box>
  )
}
