"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { faqArray } from '@/utils/faq';



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddIcon sx={{ fontSize: '25px' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function AccordionComponent() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {
        faqArray.map((item) => (
          <div key={item.id}>
            <Accordion expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)} className='rounded-t-[10px] '>
              <AccordionSummary aria-controls={`panel${item.id}d-content`} id={`panel${item.id}d-header`} className='px-[40px]'>
                <Typography className={`text-[20px] ml-8 `}>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {
                  item.bulletPoint ? (
                    <>
                    {
                      item.answer.map((item, index) => (
                        <div key={index} className='flex flex-col mt-2'>
                          <Typography className={`text-[15px] font-bold`}>
                            {item.key}
                          </Typography>
                          <Typography className={`text-[15px]`}>
                            {item.value}
                          </Typography>
                        </div>
                      ))
                    }
                    </>
                  ) : (
                    <Typography className={`text-[15px]`}>
                      {item.answer}
                    </Typography>
                  )
                }
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      }
    </div>
  );
}