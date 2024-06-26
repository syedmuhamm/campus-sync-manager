import {
  Box, Grid, Button, CardContent, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Alert, AlertTitle, IconButton,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Close from 'mdi-material-ui/Close';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));

const TabAccount = ({
  openAlert,
  setOpenAlert,
  imgSrc,
  setImgSrc,
  admin,
  formValues,
  handleInputChange,
  handleSaveChanges,
  onChange,
}) => {
  if (!admin) return <div>Loading...</div>;

  return (
    <CardContent>
      <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='First Name'
              placeholder='John'
              name='FirstName'
              value={formValues.FirstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Last Name'
              placeholder='Doe'
              name='LastName'
              value={formValues.LastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              name='AdminEmail'
              value={formValues.AdminEmail}
              onChange={handleInputChange}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label='Role'
                name='AdminRole'
                value={formValues.AdminRole}
                onChange={handleInputChange}
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                name="AdminStatus"
                label="Status"
                value={formValues.AdminStatus}
                onChange={handleInputChange}
              >
                {['Active', 'Inactive', "Pending"].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='CNIC'
              placeholder='35201-1234567-8'
              name='AdminCNIC'
              value={formValues.AdminCNIC}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Phone Number'
              placeholder='+92 300 1234567'
              name='AdminPhoneNumber'
              value={formValues.AdminPhoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Address'
              placeholder='1234 Main St, Apt 1A'
              name='AdminAddress'
              value={formValues.AdminAddress}
              onChange={handleInputChange}
            />
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
