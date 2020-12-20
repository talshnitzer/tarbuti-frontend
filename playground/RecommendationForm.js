import React from 'react'
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.itemRecommended) {
      errors.itemRecommended = 'שדה חובה';
    } else if (values.itemRecommended.length > 15) {
        errors.itemRecommended = 'Must be 15 characters or less';
    }
  
    if (!values.description) {
      errors.description = '';
    } 
  

    

    
    

    return errors;
  };

const RecommendationForm = () => {
    const formik = useFormik({
        initialValues: {
            itemRecommended: '',
            description: ''
            
        },
        validate,
        onSubmit: values => {
            console.log("values", values);
          alert(JSON.stringify(values, null, 2));
        }
      });

      return (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="itemRecommended">המלצה על</label>
          <input
            id="itemRecommended"
            name="itemRecommended"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.itemRecommended}
          />

          <label htmlFor="description">תאור - איך השרות/המוצר תרמו לארוע</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          


          <button type="submit">שמור</button>
        </form>
      );
}

    export {RecommendationForm as default}
