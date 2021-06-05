import React from 'react';
import merge from 'deepmerge';
import moment from 'moment';

const INITIAL = {
  phaseArr: [
    {
      title: 'Tracking Periods',
      titleShort: 'Track cycle',
      desc: 'Track all period dates & health symptoms',
      showOvulation: false,
      key: 'track_period',
    },
    {
      title: 'Trying to conceive',
      titleShort: 'Get pregnant',
      desc: 'Track ovulation, period cycle & well being',
      showOvulation: true,
      key: 'conceive',
    },
    {
      title: 'Avoid Pregnancy',
      titleShort: 'Avoid pregnancy',
      desc: 'See safe days, track periods & more',
      showOvulation: true,
      key: 'avoid_pregnancy',
    },
  ],
  notificationArr: [
    {
      title: 'Period in a couple of days',
      message: `A new cycle starts in a few days. Don't forget to log all of your symptoms in the calendar!`,
      days: '2 days before',
      time: '10:00 AM',
      isActive: true,
      key: 'period_couple_days',
      dayText: 'before',
      daysCount: '2',
    },
    {
      title: 'Period start',
      message: `Don't forget to log the beginning of your period in the calendar!`,
      days: '',
      time: '10:00 AM',
      isActive: true,
      key: 'period_start',
      dayText: 'same',
      daysCount: '',
    },
    {
      title: 'Period late',
      message: 'Oops, looks like you forgot to log your dates. Do it now.',
      days: '2 days after',
      time: '10:00 AM',
      isActive: true,
      key: 'period_late',
      dayText: 'after',
      daysCount: '2',
    },
    {
      title: 'Period end',
      message: `Don't forget to log your period end date in the calendar!`,
      days: '',
      time: '08:00 PM',
      isActive: false,
      key: 'period_end',
      dayText: 'same',
      daysCount: '',
    },
    {
      title: 'Before Fertile Window',
      message:
        'Your chance of getting pregnant is going to get increase from date 1 to date 2.',
      days: '2 days before',
      time: '09:00 PM',
      isActive: false,
      key: 'before_firtile',
      dayText: 'before',
      daysCount: '2',
    },
    {
      title: 'Ovulation Day',
      message: 'Very high chance to get pregnant tomorrow!',
      days: '',
      time: '08:00 PM',
      isActive: false,
      key: 'ovulation_days',
      dayText: 'same',
      daysCount: '',
    },
    {
      title: 'After Fertile Window',
      message: 'Looks like you chances of getting pregnant has become low.',
      days: '2 days after',
      time: '09:00 PM',
      isActive: false,
      key: 'after_firtile',
      dayText: 'after',
      daysCount: '2',
    },
    {
      title: 'Track Symptom',
      message: `Don't forget to log your daily Symptoms.`,
      days: '',
      time: '08:00 PM',
      isActive: false,
      key: 'track_symptom',
      dayText: 'daily',
      daysCount: '',
    },
  ],
  healthLog: {
    lifestyle: {
      display: 'Lifestyle',
      items: [
        {
          name: 'Weight',
          storeKey: 'weight',
          icon: 'WightSvgIcon',
          screen: 'WeightScreen',
        },
        {
          name: 'BB\nTemperature',
          storeKey: 'bb_temperature',
          icon: 'TemperatureSvgIcon',
          screen: 'TemperatureScreen',
        },
        {
          name: 'Blood\nPressure',
          storeKey: 'blood_pressure',
          icon: 'BloodPressureSvgIcon',
          screen: 'BPScreen',
        },
        {
          name: 'Sugar Level',
          storeKey: 'sugar',
          icon: 'SugarSvgIcon',
          screen: 'SugarScreen',
        },
      ],
    },
    bleeding: {
      display: 'Bleeding',
      flow: {
        title: 'Flow',
        items: {
          light: {
            name: 'Light',
            icon: 'LightSvgIcon',
            iconSelected: 'LightWhiteSvgIcon',
          },
          medium: {
            name: 'Medium',
            icon: 'MediumSvgIcon',
            iconSelected: 'MediumWhiteSvgIcon',
          },
          heavy: {
            name: 'Heavy',
            icon: 'HeavySvgIcon',
            iconSelected: 'HeavyWhiteSvgIcon',
          },
          spotting: {
            name: 'Spotting',
            icon: 'SpottingSvgIcon',
            iconSelected: 'SpottingWhiteSvgIcon',
          },
        },
      },
      type: {
        title: 'Bleeding Type',
        items: {
          thick: {
            name: 'Thick',
            subType: true,
            icon: 'CreamySvgIcon',
          },
          thin: {
            name: 'Thin',
            subType: true,
            icon: 'BrownSvgIcon',
          },
          intermittent: {
            name: 'Intermittent',
            subType: true,
            icon: 'WaterySvgIcon',
          },
        },
      },
      color: {
        title: 'Color of Bleed',
        items: {
          black: {
            name: 'Black',
            subType: true,
            color: '#000000',
          },
          brown: {
            name: 'Brown',
            subType: true,
            color: '#A52A2A',
          },
          dark_red: {
            name: 'Dark Red',
            subType: true,
            color: '#8B0000',
          },
          bright_red: {
            name: 'Bright Red',
            subType: true,
            color: '#de1738',
          },
          pink: {
            name: 'Pink',
            subType: true,
            color: '#FFC0CB',
          },
          orange: {
            name: 'Orange',
            subType: true,
            color: '#FFA500',
          },
          grey: {
            name: 'Grey',
            subType: true,
            color: '#808080',
          },
          empty_1: {name: '', empty: true},
        },
      },
      smell: {
        title: 'Smell',
        items: {
          offensive: {
            name: 'Offensive',
            subType: true,
            icon: 'CreamySvgIcon',
          },
          fishy_smell: {
            name: 'Fishy Smell',
            subType: true,
            icon: 'BrownSvgIcon',
          },
          metallic_smell: {
            name: 'Metallic Smell',
            subType: true,
            icon: 'WaterySvgIcon',
          },
          offensive_rotten_smell: {
            name: 'Offensive Rotten Smell',
            subType: true,
            icon: 'WaterySvgIcon',
          },
          body_odour: {
            name: 'Body Odour',
            subType: true,
            icon: 'WaterySvgIcon',
          },
          sweat_odour: {
            name: 'Sweat Odour',
            subType: true,
            icon: 'WaterySvgIcon',
          },
        },
      },
      modality: {
        title: 'Time Modalities',
        items: {
          morning_only: {
            name: 'Morning Only',
            subType: true,
            icon: 'CreamySvgIcon',
          },
          morning_evening_only: {
            name: 'Morning and Evening Only',
            subType: true,
            icon: 'BrownSvgIcon',
          },
          gushes_sleep: {
            name: 'Gushes during sleep',
            subType: true,
            icon: 'WaterySvgIcon',
          },
          scanty_daytime: {
            name: 'Scanty Daytime',
            subType: true,
            icon: 'WaterySvgIcon',
          },
          stops_lying_down: {
            name: 'Stops while lying down',
            subType: true,
            icon: 'WaterySvgIcon',
          },
        },
      },
    },
    symptoms: {
      display: 'Symptoms',
      items: {
        feel_good: {name: 'Feel Good', icon: 'FeelGoodSvgIcon'},
        abdominal_cramps: {name: 'Abdominal Cramps', icon: 'AbdominalSvgIcon'},
        tender_breasts: {name: 'Tender Breasts', icon: 'TenderSvgIcon'},
        acne: {name: 'Acne', icon: 'AcneSvgIcon'},
        low_back_pain: {name: 'Low Back Pain', icon: 'LowerBackSvgIcon'},
        sore_nipples: {name: 'Sore Nipples', icon: 'SoreNippleSvgIcon'},
        bloating: {name: 'Bloating', icon: 'BloatinSvgIcon'},
        nausea: {name: 'Nausea', icon: 'NauseaSvgIcon'},
        gas: {name: 'Gas', icon: 'GasSvgIcon'},
        constipation: {name: 'Constipation', icon: 'ConstipationSvgIcon'},
        diarrhoea: {name: 'Diarrhoea', icon: 'DiarrhoeaSvgIcon'},
        headache: {name: 'Headache', icon: 'HeadacheSvgIcon'},
        bodyache: {name: 'Bodyache', icon: 'BodyacheSvgIcon'},
        fever: {name: 'Fever', icon: 'FeverSvgIcon'},
        cold_flu: {name: 'Cold/Flu', icon: 'ColdeFlueSvgIcon'},
        rash: {name: 'Rash', icon: 'RashSvgIcon'},
        itching: {name: 'Itching', icon: 'ItchingSvgIcon'},
        fatigue: {name: 'Fatigue', icon: 'FatigueSvgIcon'},
        insomnia: {name: 'Insomnia', icon: 'InsomniaSvgIcon'},
        appetite_increased: {
          name: 'Appetite increased',
          icon: 'AppetiteIncreaseSvgIcon',
        },
        appetite_decreased: {
          name: 'Appetite decreased',
          icon: 'AppetiteDecreasedSvgIcon',
        },
        increase_urine: {name: 'Increase urine', icon: 'IncreaseUrineSvgIcon'},
        empty_1: {name: '', empty: true},
        empty_2: {name: '', empty: true},
      },
    },
    emotion: {
      display: 'Emotion / Mood',
      items: {
        happy: {
          name: 'Happy',
          icon: 'HappySvgIcon',
          iconSelected: 'HappyWhiteSvgIcon',
        },
        mood_swings: {
          name: 'Mood swings',
          icon: 'MoodSwingSvgIcon',
          iconSelected: 'MoodSwingWhiteSvgIcon',
        },
        irritable: {
          name: 'Irritable',
          icon: 'IrritabilitySvgIcon',
          iconSelected: 'IrritabilityWhiteSvgIcon',
        },
        exhausted: {
          name: 'Exhausted',
          icon: 'ExaustedSvgIcon',
          iconSelected: 'ExaustedWhiteSvgIcon',
        },
        relaxed: {
          name: 'Relaxed',
          icon: 'RelaxedSvgIcon',
          iconSelected: 'RelaxedWhiteSvgIcon',
        },
        sad: {
          name: 'Sad',
          icon: 'SadSvgIcon',
          iconSelected: 'SadWhiteSvgIcon',
        },
        anger: {
          name: 'Anger',
          icon: 'AngrySvgIcon',
          iconSelected: 'AngryWhiteSvgIcon',
        },
        depressed: {
          name: 'Depressed',
          icon: 'DepressedSvgIcon',
          iconSelected: 'DepressedWhiteSvgIcon',
        },
        stressed: {
          name: 'Stressed',
          icon: 'StressedSvgIcon',
          iconSelected: 'StressedWhiteSvgIcon',
        },
        crying: {
          name: 'Crying',
          icon: 'CryingSvgIcon',
          iconSelected: 'CryingWhiteSvgIcon',
        },
        oversensitive: {
          name: 'Oversensitive',
          icon: 'OverSensativeSvgIcon',
          iconSelected: 'OverSensativeWhiteSvgIcon',
        },
        bored: {
          name: 'Bored',
          icon: 'BoredSvgIcon',
          iconSelected: 'BoredWhiteSvgIcon',
        },
        frustrated: {
          name: 'Frustrated',
          icon: 'FrustatedSvgIcon',
          iconSelected: 'FrustatedWhiteSvgIcon',
        },
        emotional: {
          name: 'Emotional',
          icon: 'EmotionalSvgIcon',
          iconSelected: 'EmotionalWhiteSvgIcon',
        },
        anxious: {
          name: 'Anxious',
          icon: 'AnxiousSvgIcon',
          iconSelected: 'AnxiousWhiteSvgIcon',
        },
        nervous: {
          name: 'Nervous',
          icon: 'NervousSvgIcon',
          iconSelected: 'NervousWhiteSvgIcon',
        },
        crying_spells: {
          name: 'Crying spells',
          icon: 'CryingSpellsSvgIcon',
          iconSelected: 'CryingSpellsWhiteSvgIcon',
        },
        lonely: {
          name: 'Lonely',
          icon: 'LonelySvgIcon',
          iconSelected: 'LonelyWhiteSvgIcon',
        },
        panic_attacks: {
          name: 'Panic attacks',
          icon: 'PanicAttackSvgIcon',
          iconSelected: 'PanicAttackWhiteSvgIcon',
        },
        empty_1: {name: '', empty: true},
      },
    },
    hygiene: {
      display: 'Hygiene',
      items: {
        pad: {
          name: 'Pad',
          icon: 'PadsSvgIcon',
          iconSelected: 'PadsWhiteSvgIcon',
        },
        pantyliner: {
          name: 'Pantyliner',
          icon: 'PantyLinerSvgIcon',
          iconSelected: 'PantyWhiteLinerSvgIcon',
        },
        tampon: {
          name: 'Tampon',
          icon: 'TamponSvgIcon',
          iconSelected: 'TamponWhiteSvgIcon',
        },
        cup: {
          name: 'Cup',
          icon: 'CupSvgIcon',
          iconSelected: 'CupWhiteSvgIcon',
        },
      },
    },
    fluid: {
      display: 'Fluid',
      items: {
        no_fluid: {
          name: 'No Fluid',
          icon: 'NoDischargeSvgIcon',
          iconSelected: 'LightWhiteSvgIcon',
        },
        watery: {
          name: 'Watery',
          icon: 'WaterySvgIcon',
          iconSelected: 'MediumWhiteSvgIcon',
        },
        creamy: {
          name: 'Creamy',
          icon: 'CreamySvgIcon',
          iconSelected: 'HeavyWhiteSvgIcon',
        },
        sticky: {
          name: 'Sticky',
          icon: 'StickySvgIcon',
          iconSelected: 'SpottingWhiteSvgIcon',
        },
        brown: {
          name: 'Brown',
          borderColor: '#ac2d06',
          icon: 'BrownSvgIcon',
          iconSelected: 'LightWhiteSvgIcon',
        },
        egg_white: {
          name: 'Egg White',
          borderColor: '#ffefc4',
          icon: 'EggWhiteSvgIcon',
          iconSelected: 'MediumWhiteSvgIcon',
        },
        yellow: {
          name: 'Yellow',
          borderColor: '#ffd257',
          icon: 'YellowSvgIcon',
          iconSelected: 'HeavyWhiteSvgIcon',
        },
        empty_1: {
          name: '',
          empty: true,
        },
      },
    },
    intercourse: {
      display: 'Intercourse',
      type: {
        title: 'Type',
        items: {
          unprotected: {
            name: 'Unprotected',
            icon: 'HeartSvgIcon',
            iconSelected: 'HeartWhiteSvgIcon',
          },
          protected: {
            name: 'Protected',
            icon: 'ProtectSvgIcon',
            iconSelected: 'ProtectWhiteSvgIcon',
          },
          female_orgasm: {
            name: 'Female\norgasm',
            icon: 'OrgasmYesSvgIcon',
            iconSelected: 'OrgasmYesWhiteSvgIcon',
            iconSelectedNo: 'OrgasmNoWhiteSvgIcon',
          },
          empty_1: {
            name: '',
            empty: true,
          },
        },
      },
      unprotected: {
        title: 'Unprotected',
        items: {
          withdrawal: {
            name: 'Withdrawal',
            subType: true,
            icon: 'WithdrawalSvgIcon',
            iconSelectedColor: '#ffffff',
          },
          morning_pill: {
            name: 'Morning after pill',
            subType: true,
            icon: 'PillSvgIcon',
            iconSelected: 'PillWhiteSvgIcon',
          },
        },
      },
      protected: {
        title: 'Protected',
        items: {
          condom: {
            name: 'Condom',
            subType: true,
            icon: 'MaleCondomSvgIcon',
            iconSelectedColor: '#ffffff',
          },
          feamle_condom: {
            name: 'Female Condom',
            subType: true,
            icon: 'FemaleCondomSvgIcon',
            iconSelectedColor: '#ffffff',
          },
        },
      },
      female_orgasm: {
        title: 'Female Orgasm',
        items: {
          yes: {
            name: 'Yes',
            subType: true,
            icon: 'OrgasmYesSvgIcon',
            iconSelected: 'OrgasmYesWhiteSvgIcon',
          },
          no: {
            name: 'No',
            subType: true,
            icon: 'OrgasmNoSvgIcon',
            iconSelected: 'OrgasmNoWhiteSvgIcon',
          },
        },
      },
    },
    testMonitor: {
      display: 'Tests/Monitors',
      type: {
        title: 'Type',
        items: {
          ovulation: {
            name: 'Ovulation',
            icon: 'OvulationSvgIcon',
          },
          pregnancy: {
            name: 'Pregnancy',
            icon: 'PregnancySvgIcon',
          },
          fertile: {
            name: 'Fertile',
            icon: 'HighFertileSvgIcon',
          },
          empty_1: {
            name: '',
            empty: true,
          },
        },
      },
      ovulation: {
        title: 'Ovulation Test',
        items: {
          positive: {
            name: 'Positive',
            icon: 'PositiveSvgIcon',
          },
          negative: {
            name: 'Negative',
            icon: 'NegativeSvgIcon',
          },
        },
      },
      pregnancy: {
        title: 'Pregnancy Test',
        items: {
          positive: {
            name: 'Positive',
            icon: 'PregnancyPositiveSvgIcon',
          },
          negative: {
            name: 'Negative',
            icon: 'PregnancyNegativeSvgIcon',
          },
        },
      },
      fertile: {
        title: 'Fertile',
        items: {
          low: {
            name: 'Low',
            icon: 'LowFertileSvgIcon',
          },
          high: {
            name: 'High',
            icon: 'HighFertileSvgIcon',
          },
          peak: {
            name: 'Peak',
            icon: 'PeakSvgIcon',
          },
        },
      },
    },
    moreSympt: {
      display: 'More',
      items: [
        {
          name: 'Medical History',
          icon: 'MedicalHistorySvgIcon',
          screen: 'MedicalHistory',
        },
        {
          name: 'Pregnancy History',
          icon: 'ObstertricsHistorySvgIcon',
          screen: 'ObstetricsHistory',
        },
        {
          name: 'Birth control',
          icon: 'BirthControlSvgIcon',
          screen: 'BirthControl',
        },
        {
          name: '',
          empty: true,
        },
      ],
    },
  },
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
