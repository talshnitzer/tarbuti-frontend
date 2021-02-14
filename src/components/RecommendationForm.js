import React, { useContext } from "react";
import { Formik, FastField, Form } from "formik";
import * as Yup from "yup";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import { scope, holiday, audience, outInDoors } from "../services/tags-lists";
import ErrorContext from "../context/error-context";
import ErrorDialog from "../components/ErrorDialog";

const RecommendationForm = ({ recommendation, myOnSubmit }) => {
  console.log("render form");
  return (
    <Formik
      initialValues={recommendation ? { ...recommendation } : initialValues}
      validate={(values) => validate(values)}
      onSubmit={(values) => myOnSubmit(values)}
    >
      {(formik) => (
        <Form>
          {console.log("<Form>---formik", formik)}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MyFastField
                title="המלצה על"
                name="serviceName"
                helperText="שדה חובה*"
                raws={1}
                multiline={false}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MyFastField
                title="תאור - איך השרות/המוצר תרמו לארוע "
                name="description"
                helperText=""
                rows={3}
                multiline={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MyFastField
                title="שם הספק"
                name="providerName"
                helperText="שדה חובה*"
                rows={1}
                multiline={false}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MyFastField
                title="טלפון הספק"
                name="providerPhone"
                helperText=""
                rows={1}
                multiline={false}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MyFastField
                title="אימייל הספק"
                name="providerEmail"
                helperText=""
                rows={1}
                multiline={false}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <label htmlFor="eventDate">הארוע התקיים ב</label>
              <TextField
                id="eventDate"
                name="eventDate"
                type="month"
                onChange={formik.handleChange}
                value={formik.values.eventDate}
                error={
                  formik.touched.eventDate && Boolean(formik.errors.eventDate)
                }
                variant="outlined"
                fullWidth
                helperText="שנה וחודש"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={8}></Grid>
            <Grid item xs={12} sm={3}>
              <MyFastField
                title="מחיר"
                name="servicePrice"
                helperText="שדה חובה*"
                rows={1}
                multiline={false}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <MyFastField
                title="הערה למחיר"
                name="priceRemarks"
                helperText=""
                rows={1}
                multiline={false}
              />
            </Grid>
            {
              tags.map((tag)=>(
                <MyTagSelect
                title={tag.title}
                formik={formik}
                name={tag.name}
                options={tag.options}
              />
              ))
            }
            <Grid item xs={6} sm={3}>
              <Button color="primary" variant="contained" type="submit">
                שמירה
              </Button>
            </Grid>
            <Grid item sm={6}></Grid>
            <Grid item xs={6} sm={3}>
              <Button
                onClick={formik.handleReset}
                color="secondary"
                variant="contained"
                type="reset"
              >
                ביטול
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const MyFastField = ({ title, name, helperText, rows, multiline }) => {
  return (
    <>
      <label htmlFor="serviceName">{title}</label>
      <FastField name={name} validateOnChange="false" validateOnBlur="false">
        {({ form }) => (
          <TextField
            fullWidth
            required
            id={name}
            name={name}
            type="text"
            onChange={form.handleChange}
            value={form.values[`${name}`]}
            error={form.touched[`${name}`] && Boolean(form.errors[`${name}`])}
            helperText={helperText}
            variant="outlined"
            multiline={multiline}
            rows={rows}
          />
        )}
      </FastField>
    </>
  );
};

const MyTagSelect = ({ title, name, formik, options }) => {
  console.log("MyTagSelect---formik.values[`$name`]", formik.values[`${name}`]);
  return (
    <Grid item xs={12} sm={3}>
      <label htmlFor={name}>{title}</label>
      <Select
        multiple
        fullWidth
        id={name}
        name={name}
        value={formik.values[`${name}`]}
        onChange={formik.handleChange}
        variant="outlined"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

const initialValues = {
  serviceName: "",
  description: "",
  providerName: "",
  providerPhone: "",
  providerEmail: "",
  eventDate: "",
  servicePrice: "",
  priceRemarks: "",
  tags1: [],
  tags2: [],
  tags3: [],
  tags4: [],
};

const validate = (values) => {
  const errors = {};
  if (!values.serviceName) {
    errors.serviceName = "שדה חובה";
  }
  if (!values.providerName) {
    errors.providerName = "שדה חובה";
  }
  if (
    values.providerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.providerEmail)
  ) {
    errors.providerEmail = "כתובת אימייל לא תקינה";
  }
  if (!values.servicePrice) {
    errors.servicePrice = "שדה חובה";
  }
  return errors;
};

const tags = [{
  name: 'tags1',
  title: 'לאיזה תחום תרבותי שייכת ההמלצה?',
  options: scope
},
{
  name: 'tags2',
  title: 'מי קהל היעד?',
  options: audience
},
{
  name: 'tags3',
  title: 'לאיזה חג?',
  options: holiday
},
{
  name: 'tags4',
  title: 'לאירועים בפנים או בחוץ?',
  options: outInDoors
}
]
export { RecommendationForm as default };
