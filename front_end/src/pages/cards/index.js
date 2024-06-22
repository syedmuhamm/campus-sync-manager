// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import CardUser from 'src/views/cards/CardUser'
import CardNavigation from 'src/views/cards/CardNavigation'
import withAuth from 'src/lib/withAuth'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Basic Cards</Typography>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>
      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Typography variant='h5'>Navigation</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardNavigation />
      </Grid>
    </Grid>
  )
}

export default withAuth(CardBasic)
