
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent({children,value,setValue}) {

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
