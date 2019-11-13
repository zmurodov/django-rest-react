import axios from 'axios';
import { createMessage, returnErrors } from './messsages'
import {GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS} from './types';
import { tokenConfig } from './auth'

// GET LEADS ACTIONS

export const getLeads = () => (dispatch, getState) => {
     axios.get('/api/leads/',tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_LEADS,
                payload:res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE LEAD

export const deleteLead = (id) => (dispatch, getState) => {
    axios.delete(`/api/leads/${id}/`,tokenConfig(getState))
       .then(res => {
           dispatch(createMessage({deleteLead:"Lead Deleted"}))
           dispatch({
               type:DELETE_LEAD,
               payload:id
           });
       }).catch(err => console.log(err))
}

// ADD LEAD

export const addLead = (lead) => (dispatch, getState) => {
    console.log(lead);
    
    axios.post('/api/leads/',lead, tokenConfig(getState))
       .then(res => {
        dispatch(createMessage({addLead:"Lead added"}))
           dispatch({
               type:ADD_LEAD,
               payload:res.data
           });
       })
       .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}