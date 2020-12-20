import React, {useState, useContext} from 'react'
import { useFormik } from 'formik';

import RecommendationsContext from '../context/recommendations-context'

const validate = values => {
    const errors = {};
    if (!values.firstName) {
      errors.itemRecommended = 'שדה חובה';
    } 
  
    if (!values.description) {
      errors.description = '';
    } 
  
    if (!values.providerName) {
      errors.providerName = 'שדה חובה';
    } 

    if (!values.providerPhone) {
        errors.providerPhone = '';
    } 

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.providerEmail)) {
            errors.email = 'כתובת אימייל לא תקינה';
    }

    if (!values.eventDate) {
        errors.eventDate = '';
    } 

    if (!values.price) {
        errors.price = 'שדה חובה';
    } 

    if (!values.priceComment) {
        errors.price = '';
    }

    if (!values.tags) {
        errors.tags = ''
    }

    return errors;
  };

const RecommendationForm = () => {
    const [itemRecommended, setItemRecommended] = useState('')
    const [description, setDescription] = useState('')
    const {dispatch} = useContext(RecommendationsContext)

    const addRecommendation = (e) => {
        e.preventDefault()
        // setRecommendations([
        //   ...recommendations,
        //   { 
        //     itemRecommended,
        //     description
        //   }
        // ])
        dispatch({
          type: 'ADD_RECOMMENDATIONS',
          itemRecommended, 
          description
        })
        setItemRecommended('')
        setDescription('')
      }

    return (
        <div>
            <form onSubmit={addRecommendation}>
            <input value={itemRecommended} onChange={(e)=> setItemRecommended(e.target.value)}/>
            <textarea
                type="text"
                placeholder="Description"
                autoFocus
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            <button>שמור</button>
            </form>
        </div>
    )}

    export {RecommendationForm as default}
