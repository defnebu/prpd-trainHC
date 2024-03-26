import { config } from "../config/main";
import { cameraEnd, cameraStart } from "../trials/camera";
//import { createHoneycombTimeline } from "./honeycombTimeline";
import { buildPRPDtimeline } from "../prpd_experiment";

/**
 * Experiment-wide settings for jsPsych: https://www.jspsych.org/7.3/overview/experiment-options/
 * Note that Honeycomb combines these with other options required for Honeycomb to operate correctly
 */
const jsPsychOptions = {
  on_finish: function (data) {
    console.log("The experiment has finished:", data);
    // Reload the page for another run-through of the experiment
    window.location.reload();
  },
  };




/**
 * Builds the experiment's timeline that jsPsych will run
 * The instance of jsPsych passed in will include jsPsychOptions from above
 * @param {Object} jsPsych The jsPsych instance that is running the experiment
 * @param {string} studyID The ID of the study that was just logged into
 * @param {string} participantID The ID of the participant that was just logged in
 * @returns The timeline for JsPsych to run
 */
function buildTimeline(jsPsych, studyID, participantID) {
  console.log(`Building timeline for participant ${participantID} on study ${studyID}`);
  //const timeline = createHoneycombTimeline(jsPsych);
  const timeline = buildPRPDtimeline(jsPsych, studyID, participantID);
  return timeline;
}

export { buildTimeline, jsPsychOptions };
