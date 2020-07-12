import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Config from '../../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 20
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1000,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function Product({ product }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.image}>
            <img className={classes.img} alt='' src={`${Config.serverHost}/api/v1/products/${product.id}/image`} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Product;
