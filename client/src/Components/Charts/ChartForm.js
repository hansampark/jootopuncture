import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Collapse } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import VitalFormGroup from './VitalFormGroup';
import ComplaintFormGroup from './ComplaintFormGroup';
import IllnessFormGroup from './IllnessFormGroup';
import PastHistoryFormGroup from './PastHistoryFormGroup';
import QuestionaireFormGroup from './QuestionaireFormGroup';
import SystemicReviewFormGroup from './SystemicReviewFormGroup';
import WomenFormGroup from './WomenFormGroup';
import TongueInfoFormGroup from './TongueInfoFormGroup';
import PulseFormGroup from './PulseFormGroup';
import DiagnosisFormGroup from './DiagnosisFormGroup';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%'
  },
  wrapper: {
    width: 'inherit'
  },
  vitalField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 100
    },
    [theme.breakpoints.up('sm')]: {
      width: 150
    }
  },
  fullWidth: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  complaintField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: 200
    },
    [theme.breakpoints.up('sm')]: {
      width: 300
    }
  },
  adornment: {
    color: 'red',
    fontSize: 12
  },
  expand: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(0deg)'
  }
}));

export default function ChartForm(props) {
  const classes = useStyles();
  const {
    match,
    chart,
    expanded,
    onVitalChange,
    onComplaintChange,
    onIllnessChange,
    onInfoChange,
    onQuestionaireChange,
    onReviewChange,
    onWomenChange,
    onTongueChange,
    onPulseChange,
    onDiagnosisChange,
    disabled
  } = props;

  const [vitalFieldExpanded, setVitalFieldExpanded] = useState(
    expanded.vitalField
  );
  const [complaintFieldExpanded, setComplaintFieldExpanded] = useState(
    expanded.complaintField
  );
  const [illnessFieldExpanded, setIllnessFieldExpanded] = useState(
    expanded.illnessField
  );
  const [historyFieldExpanded, setHistoryFieldExpanded] = useState(
    expanded.infoField
  );
  const [questionaireFieldExpanded, setQuestionaireFieldExpanded] = useState(
    expanded.questionaireField
  );
  const [reviewFieldExpanded, setReviewFieldExpanded] = useState(
    expanded.reviewField
  );
  const [womenFieldExpanded, setWomenFieldExpanded] = useState(
    expanded.womenField
  );
  const [tongueFieldExpanded, setTongueFieldExpanded] = useState(
    expanded.tongueField
  );
  const [pulseFieldExpanded, setPulseFieldExpanded] = useState(
    expanded.pulseField
  );
  const [diagnosisFieldExpanded, setDiagnosisFieldExpanded] = useState(
    expanded.diagnosisField
  );

  function handleVitalFieldToggle() {
    setVitalFieldExpanded(!vitalFieldExpanded);
  }

  function handleComplaintFieldToggle() {
    setComplaintFieldExpanded(!complaintFieldExpanded);
  }

  function handleIllnessFieldToggle() {
    setIllnessFieldExpanded(!illnessFieldExpanded);
  }

  function handleHistoryFieldToggle() {
    setHistoryFieldExpanded(!historyFieldExpanded);
  }

  function handleQuestionaireFieldToggle() {
    setQuestionaireFieldExpanded(!questionaireFieldExpanded);
  }

  function handleReviewFieldToggle() {
    setReviewFieldExpanded(!reviewFieldExpanded);
  }

  function handleWomenFieldToggle() {
    setWomenFieldExpanded(!womenFieldExpanded);
  }

  function handleTongueFieldToggle() {
    setTongueFieldExpanded(!tongueFieldExpanded);
  }

  function handlePulseFieldToggle() {
    setPulseFieldExpanded(!pulseFieldExpanded);
  }

  function handleDiagnosisFieldToggle() {
    setDiagnosisFieldExpanded(!diagnosisFieldExpanded);
  }

  const {
    date,
    height,
    weight,
    temp,
    bp,
    heart,
    rhythm,
    lung,
    sound,
    complaints,
    illnesses,
    info,
    questionaire,
    review,
    women,
    tongue,
    pulse,
    diagnosis
  } = chart;

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleVitalFieldToggle}
          aria-expanded={vitalFieldExpanded}
        >
          {'Vital Sign'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: vitalFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={vitalFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <VitalFormGroup
          onChange={onVitalChange}
          vitals={{
            date,
            height,
            weight,
            temp,
            bp,
            heart,
            rhythm,
            lung,
            sound
          }}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleComplaintFieldToggle}
          aria-expanded={complaintFieldExpanded}
        >
          {'Complaints'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: complaintFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={complaintFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <ComplaintFormGroup
          onChange={onComplaintChange}
          complaints={complaints}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleIllnessFieldToggle}
          aria-expanded={illnessFieldExpanded}
        >
          {'Present Illness'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: illnessFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={illnessFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <IllnessFormGroup
          onChange={onIllnessChange}
          illnesses={illnesses}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleHistoryFieldToggle}
          aria-expanded={historyFieldExpanded}
        >
          {'Past/Family History, Medication, Allergy'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: historyFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={historyFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <PastHistoryFormGroup
          onChange={onInfoChange}
          info={info}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleQuestionaireFieldToggle}
          aria-expanded={questionaireFieldExpanded}
        >
          {'Questionaires'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: questionaireFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={questionaireFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <QuestionaireFormGroup
          onChange={onQuestionaireChange}
          questionaire={questionaire}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleReviewFieldToggle}
          aria-expanded={reviewFieldExpanded}
        >
          {'Systemic Review - Palpation / Percussion / Inspection / Inquiring'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: reviewFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={reviewFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <SystemicReviewFormGroup
          onChange={onReviewChange}
          review={review}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleWomenFieldToggle}
          aria-expanded={womenFieldExpanded}
        >
          {'Women'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: womenFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={womenFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <WomenFormGroup
          onChange={onWomenChange}
          women={women}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleTongueFieldToggle}
          aria-expanded={tongueFieldExpanded}
        >
          {'Inspection of the Tongue'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: tongueFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={tongueFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <TongueInfoFormGroup
          onChange={onTongueChange}
          tongue={tongue}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handlePulseFieldToggle}
          aria-expanded={pulseFieldExpanded}
        >
          {'Inspection of the pulse'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: pulseFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={pulseFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <PulseFormGroup
          onChange={onPulseChange}
          pulse={pulse}
          disabled={disabled}
        />
      </Collapse>

      <div className={classes.wrapper}>
        <Button
          color="primary"
          onClick={handleDiagnosisFieldToggle}
          aria-expanded={diagnosisFieldExpanded}
        >
          {'Diagnosis & Treatment'}
          <ExpandMore
            className={clsx(classes.expand, {
              [classes.expandOpen]: diagnosisFieldExpanded
            })}
          />
        </Button>
      </div>

      <Collapse
        in={diagnosisFieldExpanded}
        timeout="auto"
        className={classes.wrapper}
        unmountOnExit
      >
        <DiagnosisFormGroup
          onChange={onDiagnosisChange}
          diagnosis={diagnosis}
          disabled={disabled}
        />
      </Collapse>
    </React.Fragment>
  );
}
