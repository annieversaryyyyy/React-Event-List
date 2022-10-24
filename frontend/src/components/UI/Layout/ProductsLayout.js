import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Box, Button, Grid, Typography} from '@mui/material';
import AppDrawer from '../AppDrawer/AppDrawer';

const ProductsLayout = ({children}) => {
  const user = useSelector(state => state.users.user);

  return (
    <div>
      <Grid item container justifyContent="space-between" alignItems="center" sx={{ paddingLeft: { sm: '240px'} }}>
        <Grid item>
          <Typography variant="h5">
            Products
          </Typography>
        </Grid>
        {
          user?.role === 'admin' &&
            <Grid item>
              <Button color="primary" component={Link} to="/products/new">
                Add
              </Button>
            </Grid>
        }
      </Grid>
      <AppDrawer/>
      <Box sx={{ paddingLeft: { sm: '240px'} }}>
        {children}
      </Box>
    </div>
  );
};

export default ProductsLayout;