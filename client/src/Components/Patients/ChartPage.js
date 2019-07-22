import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, Divider } from '@material-ui/core';
import api from '../../lib/api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ChartPage(props) {
  const classes = useStyles();
  const { patientId } = props.match.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/patients/${patientId}/charts`);

      setData(result.charts);
    };
    fetchData();
  }, [patientId]);

  return <div>Chart Page</div>;
}
