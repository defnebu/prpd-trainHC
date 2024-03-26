
## convert experiment params in .mats to JSON for online experiment.

import scipy.io
import json
import os


def mat_to_JSON(mat_path, json_path):
    '''
    turn subject parameters and training parameters into JSONS from mat.
    IN: 
        -.mat file path
        -output path. 
    OUT:
        - JSON containing numbers or arrays per subject for these params. 
    
    '''
    root_output = '/Users/defnebyazgan/Dropbox (Brown)/prpd-trainHC/public/experiment_params'
    root_mat = '/Users/defnebyazgan/Dropbox (Brown)/CLPS-BadreLab/PRPD_archive/PRPD_vf2/design_data_vf2/'

    mat_path = os.path.join(root_mat, 'subj_parameters','sub01_parameters.mat')
    json_path = os.path.join(root_output, 'subj_parameters')
    subj_parameters = scipy.io.loadmat(mat_path)

    subj_param_dict = {
            "correctResponseMap": subj_parameters['correctResponseMap'].tolist(),  # Convert numpy array to list
            "counterBalanceCode": int(subj_parameters['counterBalanceCode'][0][0]),  # Extract single value
            "respTypeMap": subj_parameters['respTypeMap'].tolist()[0],  # Convert first dimension to list
            "taskMap": subj_parameters['taskMap'].tolist()[0]  # Convert first dimension to list
        }
#    with open(json_path, 'w') as json_file:
#         json.dump(data_for_json, json_file, indent=4)



# def mat_to_json(mat_file_path, json_file_path):
#     # Load the .mat file
#     mat_data = scipy.io.loadmat(mat_file_path)
    
#     # Extract the 'subj_parameters' struct
#     subj_parameters = mat_data['subj_parameters']
    
#     # Assuming 'correctResponseMap' is a NumPy array; convert it to a list of lists
#     correctResponseMap_list = subj_parameters['correctResponseMap'].tolist()

#     # Prepare the data structure for JSON with 'correctResponseMap' as a 4x100 matrix
#     data_for_json = {
#         "correctResponseMap": correctResponseMap_list,
#         # Handle other fields as necessary
#     }
    
#     # Write the data to a JSON file
#     with open(json_file_path, 'w') as json_file:
#         json.dump(data_for_json, json_file, indent=4)

# # Example usage
# mat_file_path = 'path_to_your_mat_file.mat'
# json_file_path = 'output_json_file.json'
# mat_to_json(mat_file_path, json_file_path)