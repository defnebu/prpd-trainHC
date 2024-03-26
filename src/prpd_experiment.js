
// all plugins you want to use should be imported like this.
import jsPsychImageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import jsPsychHtmlKeyboardResponse  from "@jspsych/plugin-html-keyboard-response";
import jsPsychPreload from "@jspsych/plugin-preload";

///////////////////////////////////// all helper functions go here /////////////////////////////////////
// getting subject params
    function loadJSON(url) {
            return fetch(url).then(response => response.json());
          }
    
    function loadExperimentParams() {
        Promise.all([loadJSON('assets/subj_params/sub1_param.json'), loadJSON('assets/train_params/sub1_train1.json')])
        .then(([config1, config2]) => {
        const experimentParams = {...config1, ...config2};
        startExperiment(experimentParams);
        })
        .catch(error => console.error("Failed to load param files:", error));
        }

// matrix algebra        

// initialize main experiment function
    
    function startExperiment(params) {
          }
          
 



var Stimpath = 'assets/';
var Stimnames = ['Slide1.png', 'Slide2.png']
var Stims = Stimnames.map(Stimnames => Stimpath + Stimnames)
// ,'Stim4.png', 'Stim5.png', 'Stim6.png',
// 'Stim7.png', 'Stim8.png', 'Stim9.png',
// 'Slide01.png','Slide02.png','Slide03.png',
// 'Slide04.png','Slide05.png','Slide06.png',
// 'Slide07.png','Slide08.png','Slide09.png',
// 'Slide10.png','Slide11.png'];



// prelod stimuli 

var preload = {
  type: jsPsychPreload,
  images: Stims
};


// styling with CSS 

var style = document.createElement('style');
//style.type = 'text/css';
style.innerHTML = `.black-background { background-color: black !important; }`;
document.head.appendChild(style);




// Directly set the background to black at the start of the experiment
document.body.classList.add('black-background');


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
  



var combinedTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    var slideNumber = getRandomSlideNumber(); // Ensure this function returns a random number for the slide
    // Combine the image and symbols in one HTML string
    var html = '<div style="text-align: center; color: white;">' +
               '<img src="Stim' + slideNumber + '.png" style="margin-bottom: 20px;"><br>' +
               '$&nbsp;&nbsp;&nbsp;&nbsp;%</div>';
    return html;
  },
  choices: "ALL_KEYS",
  response_ends_trial: true
};


// Create a timeline and add the trials
//var timeline = [welcomeMessageTrial,instructionTrial, DisplaySingleStim, combinedTrial];

// Start the experiment
//jsPsych.run(timeline);
export function buildPRPDtimeline(jsPsych, studyID, participantID) {
    console.log("build prpd timeline");
    var timeline = [welcomeMessageTrial,fixation, instructionTrial, DisplaySingleStim2];
    return timeline;
}
