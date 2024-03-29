
// all plugins you want to use should be imported like this.
import jsPsychImageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import jsPsychHtmlKeyboardResponse  from "@jspsych/plugin-html-keyboard-response";
import jsPsychPreload from "@jspsych/plugin-preload";
import { defaultsDeep } from "lodash";

// initialize and load subject params
let counterBalanceCode, taskMap, correctResponseMap, respTypeMap;
fetch('assets/subj_params/sub1_param.json')
  .then(response => {
    if(!response.ok) {
      console.log("uh oh, subject params didn't load as expected");
    }
      return response.json();
  })
  .then(data => {
    counterBalanceCode = data.counterBalanceCode;
    taskMap = data.taskMap;
    correctResponseMap = data.correctResponseMap;
    respTypeMap = data.respTypeMap;
  })
  .catch(error => {
    console.errpr("problem with fetch API for subject parameters", error)
  });

  // initialize and load training parameters
var trial_iti = 0.3; // fixed for trianing
let blockSequence, singleTrialSequences, singleTaskSequences, taskOrder, soaSequences; 
fetch('assets/train_params/sub1_train1.json')
  .then(response => {
    if(!response.ok) {
      console.log("uh oh, training params didn't load as expected");
    }
      return response.json();
  })
  .then(data => {
    blockSequence = data.blockSequence;
    singleTrialSequences = data.singleTrialSequences;
    singleTaskSequences = data.singleTaskSequences;
    taskOrder = data.taskOrder;
    soaSequences = data.soaSequences;
  })
  .catch(error => {
    console.error("problem with fetch API for training", error)
  });
  

// preload instructino screens and stimuli
var Stimpath = 'assets/stimuli/';
var StimNames = ['Stim1.png', 'Stim2.png','Stim3.png', 'Stim4.png','Stim5.png', 'Stim6.png',
                'Stim7.png', 'Stim8.png','Stim9.png', 'Stim10.png','Stim11.png', 'Stim12.png',
                'Stim13.png', 'Stim14.png','Stim15.png', 'Stim16.png',]
var Stims = StimNames.map(StimNames => Stimpath + StimNames)

var Instrpath = 'assets/instructions/';
var InstrNames = ['Slide1.png', 'Slide2.png', 'Slide3.png',
                  'Slide4.png', 'Slide5.png', 'Slide6.png',
                  'Slide7.png','Slide8.png','Slide9.png',
                  'Slide10.png','Slide11.png'];
var Instr = InstrNames.map(InstrNames => Instrpath + InstrNames)
var preloadStims = {
  type: jsPsychPreload,
  images: Stims
};
var preloadInstr = {
  type: jsPsychPreload,
  images: Instr
};

// styling with CSS 
var style = document.createElement('style');
//style.type = 'text/css';
style.innerHTML = `.black-background { background-color: black !important; }`;
document.head.appendChild(style);
document.body.classList.add('black-background');


// basic experiment params
var nTrials = 64 //singleTrialSequences[2].length; 
var nBlock = 12; 
var count = 1; //Keys = 
//let blockType = blockSequence[blockNumber-1];
// // each block takes in it's instr, then introduce 64 trials.
// function createExperimentBlock(blockNumber) {
//   let timeline1 = [];
  
//   let InstructionSlide = Instr[blockType];
//   let instruction = {
//       type: "html-keyboard-response",
//       stimulus: '<img src="' + InstructionSlide + '">',
//       choices: jsPsych.ALL_KEYS,
//       trial_duration: 2000, // modify so that no keys for 4 seconds and then all keys
//   };
//   timeline1.push(instruction);
// }

//   // Waiting for key press to continue, then starting the trial
//   let currStim = singleTrialSequences(blockNumber,)
//   let trial = {
//       type: "html-keyboard-response",
//       stimulus: "<p>Trial for block type " + blockType + ".<br>Press any key to continue.</p>",
//       on_start: function() {
//           // Wait for 2 seconds before showing this trial
//           return new Promise(resolve => setTimeout(resolve, 2000));
//       }
//   };
//   timeline1.push(trial);

//   return timeline1;

//var block = 1;
var currentStim  = singleTrialSequences[0];


// Trial to display the welcome message after a key press
var welcomeMessageTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="color: white;">Welcome to the Experiment. Please make a key press to continue</p>', // Welcome message in white text
  choices: "NO_KEYS", // No keys are allowed to end the trial, it ends after the duration
  trial_duration: 2000, // Display the message for 2000 milliseconds (2 seconds)
  post_trial_gap: 500, // Optional: adds a 500ms gap before proceeding to the next trial or ending
  on_finish: function() {
    document.body.style.backgroundColor = ''; // Reset the background color after the trial
  }
};

// fixation trial
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:90px;color:white;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000, // milliseconds
};
// Instruction trial that displays a randomly selected image
var instructionTrial = {
  type: jsPsychImageKeyboardResponse,
  stimulus: Stims[1], 
  choices: "ALL_KEYS",
  response_ends_trial: true, 
  //on_finish: function() {
    //document.body.style.backgroundColor = 'black';
  //}
};
var DisplaySingleStim = {
  type: jsPsychImageKeyboardResponse,
  stimulus: Stims[0],
  choices: "ALL_KEYS", // Prevent early skipping
  trial_duration: 100000, // Adjust duration as needed
  on_finish: function() {
    document.body.style.backgroundColor = 'black';
  }
};


var DisplaySingleStim2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      return `
        <div style="position: relative; text-align: center;">
          <img src="${Stims[0]}" style="width: auto; max-width: 100%; height: auto;">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -10%); color: white; font-size: 24px;">
            $.                        %
          </div>
        </div>
      `;
    },
    choices: "ALL_KEYS", // Prevent early skipping
    trial_duration: 100000, // Adjust duration as needed
    on_finish: function() {
      document.body.style.backgroundColor = 'black';
    }
  };
  

// Start the experiment
//jsPsych.run(timeline);
export function buildPRPDtimeline(jsPsych, studyID, participantID) {
    console.log("build prpd timeline");
    console.log(currentStim)
    var timeline = [welcomeMessageTrial,fixation, instructionTrial, DisplaySingleStim2];
    return timeline;
}


