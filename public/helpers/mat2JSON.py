
## convert experiment params in .mats to JSON for online experiment. 

import numpy as np
import scipy.io
import json
import os


def nan2null(obj):  ## jsons's don't take NaN- they need to be converted to null.
    '''
    recursively check for NaNs in dictionary values and turn them into nulls. 
    otherwise can't load JSONS.
    
    '''
    if isinstance(obj, np.ndarray):
        if obj.dtype == float:
            return [nan2null(x) for x in obj.tolist()]
        else:
            return obj.tolist()
    elif isinstance(obj, list):
        return [nan2null(item) for item in obj]
    elif isinstance(obj, dict):
        return {key: nan2null(value) for key, value in obj.items()}
    elif isinstance(obj, float) and np.isnan(obj):
        return None
    else:
        return obj
    

def mat2JSON(mat_path, json_path):
    '''
    turn subject parameters and training parameters into JSONS from mat.
    IN: 
        -.mat file path
        -output path. 
    OUT:
        - JSON containing numbers or arrays per subject for these params. 
    
    '''
    #Users/defnebyazgan/Dropbox (Brown)/
    root_output = '/Users/defnebyazgan/Dropbox (Brown)/prpd-trainHC/src'  #need to change this later it is flat but should make param dir
    root_mat = '/Users/defnebyazgan/Dropbox (Brown)/CLPS-BadreLab/PRPD_archive/PRPD_vf2/design_data_vf2/'

    mat_path = os.path.join(root_mat, 'subj_parameters','sub02_parameters.mat')
    json_path = root_output #os.path.join(root_output, 'subj_params')

    subj_parameters = scipy.io.loadmat(mat_path)
    train1_parameters = scipy.io.loadmat(os.path.join(root_mat, 'training_tasks', 'prpd_design_data_tr1_sub01.mat'))

    non_params = ['__header__', '__version__', '__globals__']

    # remove weird matlab stamp keys
    subj_params = {k: nan2null(v) for k, v in subj_parameters.items() if k not in non_params}
    train1_params = {k: nan2null(v) for k, v in train1_parameters.items() if k not in non_params}


    subj_param_dict = {
            "correctResponseMap": subj_params['correctResponseMap'],  
            "counterBalanceCode": int(subj_params['counterBalanceCode'][0][0]),
            "respTypeMap": subj_params['respTypeMap'],
            "taskMap": subj_params['taskMap']
        }
    
    train1_dict = {
            "trial_iti": train1_params['trial_iti'],  
            "blockSequence": train1_params['blockSequence'],  
            "singleTrialSequences": train1_params['singleTrialSequences'], 
            "taskOrder": train1_params['taskOrder'],
            "singleTaskSequences": train1_params['singleTaskSequences'],
            "soaSequences": train1_params['soaSequences']
        }
    
    with open(os.path.join(json_path, 'sub2_param2.json'), 'w') as json_file:
         json.dump(subj_param_dict, json_file, indent=4)

    # with open(os.path.join(json_path, 'sub1_train12.json'), 'w') as json_file:
    #      json.dump(train1_dict, json_file, indent=4)




    
