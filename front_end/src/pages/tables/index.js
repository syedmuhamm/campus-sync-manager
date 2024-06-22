// ** MUI Imports
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import withAuth from 'src/lib/withAuth';
import StudentTableMain from 'src/views/tables/students-table/StudentTableMain';

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          {/* <Link href='https://mui.com/components/tables/' target='_blank'> */}
           
          {/* </Link> */}
        </Typography>
        {/* <Typography variant='body2'>Student table displays all students data. They can be categorized on class base or unpaid fee based.</Typography> */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Student Table"
            titleTypographyProps={{ variant: 'h6', color: 'primary' }} // Set title color to primary
            subheader="Student table displays all students data. They can be categorized on class base or unpaid fee based."
          />
          <StudentTableMain />
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid> */}
    </Grid>
  );
};

export default withAuth(MUITable);
