'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

export default function RatingComponent({ size, readOnly, rating, setRating }) {
  const CustomRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty': {
      color: '#FCD33B',

    }
  }));

  return (
    <Box>
      <CustomRating
        defaultValue={1}
        size={size ? size : 'medium'}
        readOnly={readOnly ? readOnly : false}
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
    </Box>
  );
}