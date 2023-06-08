import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Divider } from '@mui/material';

const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
];

export default function StepperComponent() {
    return (
        <div className='flex mx-auto w-[600px] items-center justify-center flex-col'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <div className='bg-green-600 rounded-full w-[30px] h-[30px] flex justify-center items-center'>1</div>
                </div>
                <Divider variant="middle" sx={{ color: 'black', width: '30%', marginTop: '20px', marginBottom: '20px' }} />
                <div>
                    <div className='bg-green-600 rounded-full w-[30px] h-[30px] flex justify-center items-center'>2</div>
                </div>
                <Divider variant="middle" sx={{ color: 'black', width: '30%', marginTop: '20px', marginBottom: '20px' }} />
                <div>
                    <div className='bg-green-600 rounded-full w-[30px] h-[30px] flex justify-center items-center'>3</div>
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <p>label 1</p>
                </div>
                <div>
                    <p>label 2</p>
                </div>
                <div>
                    <p>label 3</p>
                </div>
            </div>
        </div>
    );
}
