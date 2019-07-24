import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import api from "../../lib/api";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  center: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    minHeight: "min-content"
  },
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottom: "1px solid #cccccc"
  },
  nameField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: 100
    },
    [theme.breakpoints.up("sm")]: {
      width: 150
    }
  },
  label: {
    fontSize: 12
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },

  formGroup: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
  },
  radioGroup: {
    marginBottom: -3,
    marginTop: -4
  },
  button: {
    margin: theme.spacing(10),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  progress: {
    color: "#ffffff"
  }
}));

export default function Patient(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    dob: "",
    phone: "",
    sex: ""
  });
  const [chart, setChart] = useState({
    height: "",
    weight: "",
    temp: "",
    bp: "",
    heart: "",
    rhythm: "",
    lung: "",
    sound: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleValueChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChartChange = name => event => {
    setChart({ ...chart, [name]: event.target.value });
  };

  return (
    <Grid item>
      <div className={classes.center}>
        <Paper className={classes.root}>
          <div>
            <Typography align="center" variant="h4" component="h1">
              {"SBU DAOM New Patient Intake Form"}
            </Typography>
            <Typography align="center" variant="h4" component="h1" gutterBottom>
              {"CL840: Sepcialty development"}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              color="primary"
            >
              {"Paitent Information"}
            </Typography>
          </div>

          <form className={classes.container}>
            <FormGroup className={classes.row}>
              <TextField
                id="firstName"
                label="First Name"
                className={classes.nameField}
                value={values.firstName}
                onChange={handleValueChange("firstName")}
                autoFocus
                margin="normal"
              />

              <TextField
                id="middleName"
                label="Middle Name"
                className={classes.nameField}
                value={values.middleName}
                onChange={handleValueChange("middleName")}
                margin="normal"
              />

              <TextField
                id="lastName"
                label="Last Name"
                className={classes.nameField}
                value={values.lastName}
                onChange={handleValueChange("lastName")}
                margin="normal"
              />

              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleValueChange("email")}
                margin="normal"
              />

              <TextField
                id="dob"
                label="Date of Birth"
                type="date"
                className={classes.nameField}
                value={values.dob}
                onChange={handleValueChange("dob")}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                id="phone"
                label="Phone"
                className={classes.nameField}
                value={values.phone}
                onChange={handleValueChange("phone")}
                margin="normal"
              />
              <FormControl margin="normal" className={classes.formGroup}>
                <FormLabel className={classes.label} component="legend">
                  {"Gender"}
                </FormLabel>
                <RadioGroup
                  row
                  className={classes.radioGroup}
                  onChange={handleValueChange("sex")}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label={"Female"}
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label={"Male"}
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label={"Other"}
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>

            <Chart onChange={handleChartChange} chart={chart} />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!!error}
              onClick={e => handlePatientSubmit(e, values)}
            >
              {loading ? (
                <CircularProgress
                  style={{ width: 24, height: 24 }}
                  className={classes.progress}
                />
              ) : (
                "Create Patient"
              )}
            </Button>
          </form>
        </Paper>
      </div>
    </Grid>
  );

  async function handlePatientSubmit(e, values) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await api.post("/patients", { values, chart });
      setLoading(false);
      props.history.push("/patients");
      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }
}
