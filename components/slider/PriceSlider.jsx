"use client"
import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { debounce, TextField } from '@mui/material';
import { FilterContext } from '@/app/market-place/page';

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 1,
  padding: '13px 0',

  '& .MuiSlider-thumb': {
    height: 25,
    width: 25,
    backgroundColor: '#000',
    cursor: 'pointer',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'white',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};


export default function PriceSlider({ filters, setFilters,priceMin ,priceMax,onClick }) {
  const [scale, setScale] = useState([priceMin ? parseInt(priceMin) : 0, priceMax ? parseInt(priceMax) : 999]);
  const [changed, setChanged] = useState(false);

  const handleSliderChange = useCallback((event, val) => {
    setScale([val[0] , val[1]])
  }, []);
    
    const updateFilter = (e, value)=>{
    onClick('price',{
      priceMin:value[0] ,
      priceMax:value[1] 
    })
    

  }

  const handleScale = (e) => {
    if (e.target.id == 'min') {
      setScale((prev) => [e.target.value, prev[1]])
      onClick('price',{
        priceMin: e.target.value,
        priceMax: scale[1]
      })
    } else {
      onClick('price',{
        priceMin: scale[0],
        priceMax: e.target.value
      })
      if (e.target.value != 999) {
        setScale((prev) => [prev[0], e.target.value])
      } else {
        if (changed) {
          setScale((prev) => [prev[0], e.target.value])
        } else {
          setChanged(true)
        }
      }

    }
  }

  return (
    <Box sx={{ width: 300 }} className='flex items-center flex-col justify-start'>
      <Box sx={{ m: 1 }} />
      <label className='mb-2'>Price range</label>
      <AirbnbSlider
        onChange={(e, v) => handleSliderChange(e, v)}
        onChangeCommitted={(e, value) => updateFilter(e, value)}
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[0, 100]}
        disableSwap
        value={[scale[0] , scale[1] ]}
        max={999}
        step={10}
      />
      <Box className='flex gap-6 w-ful'>

        <Box className='relative flex-col '>
          <label className=' text-[12px] bg-transparent px-[2px]' >Minimum</label>
          <p className='absolute top-[37px] left-2 text-[18px] font-[400] '>$</p>
          <input
            id='min'
            type="text"
            className='py-3 px-5 rounded-md w-full border-2 border-gray-300 outline-none flex items-center text-[18px]'
            value={scale[0]}
            onChange={(e) => handleScale(e)}
          />
        </Box>
        <Box className='relative flex-col '>
          <label className=' text-[12px] bg-transparent px-[2px]' >Maximum</label>
          <p className='absolute top-[37px] left-2 text-[18px] font-[400]'>$</p>
          <input
            id='max'
            type="text"
            className='py-3 px-5 rounded-md w-full border-2 border-gray-300 outline-none flex items-center text-[18px]'
            value={scale[1] == 999 && !changed ? `${scale[1]}+` : scale[1]}
            onChange={(e) => handleScale(e)}
          />
        </Box>

      </Box>
    </Box>
  );
}
