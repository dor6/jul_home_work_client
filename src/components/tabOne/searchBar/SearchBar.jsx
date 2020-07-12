import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 500,
    margin: 'auto',
    paddingTop: 20
  },
}));

const SearchBar = ({ search, onSearchChange, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs>
          <TextField fullWidth label="Search" value={search} onChange={onSearchChange} />
        </Grid>
        <Grid item>
          {loading ? <CircularProgress /> : <SearchIcon />}
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar
