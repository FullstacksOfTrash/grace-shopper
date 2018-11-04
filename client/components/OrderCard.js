import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function OrderCard() {
  const { classes } = props;
  const { order } = props
  return (
    <Grid container>
      <Paper >
        <Typography color='textSecondary' variant='h5' component='h3'>
          Order #{order.id}
        </Typography>
        <Typography component='p'>
          Total {order.total}
        </Typography>
      </Paper>
    </Grid>
  )
}
