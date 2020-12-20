import React, {useContext} from 'react';
import { useFormik } from 'formik';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import RecommendationsContext from '../context/recommendations-context'
import {scope, holiday, audience, outInDoors} from '../services/tags-lists'



const RecommendationForm = ({recommendation, myOnSubmit} ) => {
  
  const formik = useFormik({
      initialValues: recommendation ? {...recommendation} : initialValues,
      validate,
      onSubmit: values => myOnSubmit(values)
    });

      return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <label htmlFor="serviceName">המלצה על</label>
            <TextField
              fullWidth
              required
              id="serviceName"
              name="serviceName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.serviceName}
              error={formik.touched.serviceName && Boolean(formik.errors.serviceName)}
              helperText='שדה חובה*'
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <label htmlFor="description">תאור - איך השרות/המוצר תרמו לארוע</label>
            <TextField
              id="description"
              name="description"
              type="text"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="providerName">שם הספק</label>
            <TextField
              id="providerName"
              name="providerName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.providerName}
              error={formik.touched.providerName && Boolean(formik.errors.providerName)}
              helperText='שדה חובה*'
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="providerPhone">טלפון הספק</label>
            <TextField
              id="providerPhone"
              name="providerPhone"
              type="text"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.providerPhone}
              error={formik.touched.providerPhone && Boolean(formik.errors.providerPhone)}
              helperText={formik.touched.providerPhone && formik.errors.providerPhone}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <label htmlFor="providerEmail">אימייל הספק</label>
            <TextField
              id="providerEmail"
              name="providerEmail"
              type="email"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.providerEmail}
              error={formik.touched.providerEmail && Boolean(formik.errors.providerEmail)}
              helperText={formik.touched.providerEmail && formik.errors.providerEmail}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <label htmlFor="eventDate">הארוע התקיים ב</label>
            <TextField
              id="eventDate"
              name="eventDate"
              type='month'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventDate}
              error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
              helperText={formik.touched.eventDate && formik.errors.eventDate}
              variant="outlined" 
              fullWidth 
              label="שנה וחודש" 
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
          </Grid>
        
          <Grid item xs={12} sm={3}>
            <label htmlFor="servicePrice">מחיר</label>
            <TextField
              id="servicePrice"
              name="servicePrice"
              type="number"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.servicePrice}
              error={formik.touched.servicePrice && Boolean(formik.errors.servicePrice)}
              helperText='שדה חובה*'
              required
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <label htmlFor="priceRemarks">הערה למחיר</label>
            <TextField
              id="priceRemarks"
              name="priceRemarks"
              type="text"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.priceRemarks}
              error={formik.touched.priceRemarks && Boolean(formik.errors.priceRemarks)}
              helperText={formik.touched.priceRemarks && formik.errors.priceRemarks}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <label htmlFor="tags1">לאיזה תחום תרבותי שייכת ההמלצה?</label>
            <Select
            multiple
            fullWidth
            id="tags1"
            name="tags1"
            value={formik.values.tags1}
            onChange={formik.handleChange}
            variant="outlined"
            >
            {scope.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
          <label htmlFor="tags2">מי קהל היעד?</label>
            <Select
            multiple
            fullWidth
            id="tags2"
            name="tags2"
            value={formik.values.tags2}
            onChange={formik.handleChange}
            variant="outlined"
            >
            {audience.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <label htmlFor="tags3">לאיזה חג?</label>
            <Select
            multiple
            fullWidth
            id="tags3"
            name="tags3"
            value={formik.values.tags3}
            onChange={formik.handleChange}
            variant="outlined"
            >
            {holiday.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <label htmlFor="tags4">לאירועים בפנים או בחוץ?</label>
            <Select
            multiple
            fullWidth
            id="tags4"
            name="tags4"
            value={formik.values.tags4}
            onChange={formik.handleChange}
            variant="outlined"
            >
            {outInDoors.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button color="primary" variant="contained"  type="submit">שמור</Button>
          </Grid>
          <Grid item sm={6} >
          </Grid>
          <Grid item xs={6} sm={3} >
            <Button onClick={formik.handleReset} color="secondary" variant="contained" type="reset">בטל</Button>
          </Grid>
        </Grid>
      </form>
      );
}



const initialValues =   
  {
  serviceName: '',
  description: '',
  providerName: '',
  providerPhone: '',
  providerEmail: '',
  eventDate: '',
  servicePrice: '',
  priceRemarks: '',
  tags1: [],
  tags2: [],
  tags3: [],
  tags4: []
}
  


const validate = values => {
  const errors = {};
  if (!values.serviceName) {
    errors.serviceName = 'שדה חובה';
  } 

  if (!values.providerName) {
    errors.providerName = 'שדה חובה';
  } 

  if (values.providerEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.providerEmail)) {
      errors.providerEmail = 'כתובת אימייל לא תקינה';
  }

  if (!values.servicePrice) {
      errors.servicePrice = 'שדה חובה';
  }

  return errors;
};

    export {RecommendationForm as default}
