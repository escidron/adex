import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCard from '../addCard/AddCard';
import AddAccount from '../addAccount/AddAccount';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TabIcon from './TabIcon';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent({children}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',width: '100%' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          {children.map((child,index)=>(
          <Tab key={index} label={child.props.label} {...a11yProps(index)}  iconPosition="end"/>
          ))}
        </Tabs>
      </Box>
      {children.map((child,index)=>(

      <TabPanel key={index} value={value} index={index}>
        {child}
      </TabPanel>
      ))
      }

    </Box>
  );
}
