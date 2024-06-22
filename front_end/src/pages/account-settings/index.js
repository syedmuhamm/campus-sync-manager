import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline';
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline';
import InformationOutline from 'mdi-material-ui/InformationOutline';

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo';
import TabAccount from 'src/views/account-settings/TabAccount';
import TabSecurity from 'src/views/account-settings/TabSecurity';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css';
import withAuth from 'src/lib/withAuth';
import { useData } from 'src/context/dataContext';

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67,
  },
}));

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const AccountSettings = () => {
  const [value, setValue] = useState('account');
  const [openAlert, setOpenAlert] = useState(true);
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');
  const { appData, updateAdmin, setAppData } = useData();
  const [admin, setAdmin] = useState(null);
  const [formValues, setFormValues] = useState({
    AdminEmail: '',
    FirstName: '',
    LastName: '',
    AdminStatus: '',
    AdminCNIC: '',
    AdminPhoneNumber: '',
    AdminAddress: '',
  });

  useEffect(() => {
    const currentAdmin = appData.admins.find((admin) => admin.isCurrentAdmin);
    if (currentAdmin) {
      setAdmin(currentAdmin);
      setFormValues({
        AdminEmail: currentAdmin.AdminEmail,
        FirstName: currentAdmin.FirstName,
        LastName: currentAdmin.LastName,
        AdminStatus: currentAdmin.AdminStatus,
        AdminCNIC: currentAdmin.AdminCNIC,
        AdminPhoneNumber: currentAdmin.AdminPhoneNumber,
        AdminAddress: currentAdmin.AdminAddress,
      });
    }
  }, [appData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (admin) {
      const updatedAdmin = { ...admin, ...formValues };
      const response = await updateAdmin(admin.AdminID, updatedAdmin);
      if (response) {
        setAppData((prevData) => ({
          ...prevData,
          admins: prevData.admins.map((adm) => (adm.AdminID === admin.AdminID ? updatedAdmin : adm)),
        }));
      }
    }
  };

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            admin={admin}
            formValues={formValues}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            onChange={onChange}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default withAuth(AccountSettings);
