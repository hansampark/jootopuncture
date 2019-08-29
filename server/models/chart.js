const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chartSchema = new Schema({
  date: String,
  height: String,
  weight: String,
  temp: String,
  bp: String,
  heart: String,
  rhythm: {
    type: String,
    enum: ['LOW', 'REGULAR', 'HIGH']
  },
  lung: String,
  sound: String,
  complaints: {
    complaint: String,
    location: String,
    onset: String,
    provocation: String,
    palliation: String,
    quality: String,
    region: String,
    pain: String,
    intensity: {
      type: String,
      enum: ['MINIMAL', 'SLIGHT', 'MODERATE', 'SEVERE']
    },
    frequency: {
      type: String,
      enum: ['OCCASIONAL', 'INTERMITTENT', 'FREQUENT', 'CONSTANT']
    },
    timing: String,
    cause: String,
    remarks: String
  },
  illnesses: {
    illness: String,
    diagnosis: String
  },
  info: {
    pastHx: String,
    medication: String,
    familyHx: String,
    allergy: String
  },
  questionaire: {
    fever: String,
    perspiration: String,
    thirst: String,
    appetite: String,
    digestion: String,
    taste: String,
    bowel: {
      frequency: String,
      quality: String,
      color: String,
      smell: String
    },
    urine: {
      frequency: String,
      amount: String,
      color: String,
      smell: String
    },
    sleep: String,
    pain: String,
    consciousness: String,
    energy: String,
    stress: String
  },
  review: {
    head: String,
    eent: String,
    skin: String,
    chest: String,
    respiratory: String,
    cardio: String,
    gas: String,
    muscle: String,
    neuro: String,
    spine: String,
    extremities: String,
    dtr: String,
    other: String,
    reviewData: Object
  },
  women: {
    menarche: String,
    menopause: String,
    pregnancy: String,
    child: String,
    miscarriage: String,
    leukorrhea: String,
    birthControl: {
      type: String,
      enum: ['YES', 'NO']
    },
    bcUsage: String,
    menstruation: {
      lmp: String,
      cycle: String,
      quantity: String,
      duration: String,
      color: String,
      clots: String,
      dysmenorrhea: String
    }
  },
  tongue: {
    body: {
      color: {
        pale: Boolean,
        pink: Boolean,
        red: Boolean,
        darkRed: Boolean,
        purple: Boolean,
        reddishPurple: Boolean,
        bluishPurple: Boolean,
        redTip: Boolean,
        redder: Boolean,
        orange: Boolean,
        purpleSide: Boolean
      },
      shape: {
        stiff: Boolean,
        long: Boolean,
        flaccid: Boolean,
        cracked: Boolean,
        swollen: Boolean,
        short: Boolean,
        rollUp: Boolean,
        rollDown: Boolean,
        ulcerate: Boolean,
        tooth: Boolean,
        halfSwollen: Boolean,
        thin: Boolean,
        thick: Boolean,
        narrow: Boolean,
        deviation: Boolean,
        trembling: Boolean,
        normal: Boolean
      }
    },
    coat: {
      color: {
        white: Boolean,
        yellow: Boolean,
        gray: Boolean,
        black: Boolean,
        greenish: Boolean,
        half: Boolean,
        center: Boolean
      },
      quality: {
        thin: Boolean,
        thick: Boolean,
        scanty: Boolean,
        none: Boolean,
        dry: Boolean,
        wet: Boolean,
        slippery: Boolean,
        greasy: Boolean,
        rough: Boolean,
        sticky: Boolean,
        graphic: Boolean,
        mirror: Boolean
      }
    },
    tongueData: Object
  },
  pulse: {
    right: {
      first: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      },
      second: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      },
      third: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      }
    },
    left: {
      first: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      },
      second: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      },
      third: {
        type: String,
        enum: [
          'SUPERFICIAL',
          'RAPID',
          'EXCESS',
          'SURGING',
          'WIRY',
          'ROLLING',
          'MODERATE',
          'TENSE',
          'KNOTTED',
          'DEEP',
          'SLOW',
          'DEFICIENT',
          'CHOPPY',
          'THERADY',
          'SOGGY',
          'WEAK',
          'HURRIED',
          'INTERMITTENT'
        ]
      }
    }
  },
  diagnosis: {
    etiology: String,
    tcm: String,
    treatment: String,
    acPoints: String,
    herbalTrt: String,
    assessments: String,
    otherTrt: {
      tuina: Boolean,
      acupressure: Boolean,
      moxa: Boolean,
      cupping: Boolean,
      electroAc: Boolean,
      heatpack: Boolean,
      other: Boolean
    },
    auricular: String,
    condition: String,
    icd: String,
    cpt: String,
    comments: String,
    pain: String,
    heart: String,
    pulse: String,
    sign: String
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }
});

module.exports = mongoose.model('Chart', chartSchema);
