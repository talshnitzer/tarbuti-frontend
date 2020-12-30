import React from 'react';
import {useHistory} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import sendPostReq from '../services/api.service'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        tarbuti
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required')
});

const SignUp = () =>{
  const classes = useStyles();
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      community: '',
      phoneNum: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
        const response = await sendPostReq(values,'/user/create');
        console.log('SignUp---onSubmit---response from server',response);
        
        history.push('/')
    }
  });

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          הרשמה
        </Typography>
        <Typography className={classes.form}>
          ההרשמה מותנית באישור מנהלת.
        </Typography>
        <Typography className={classes.form}>
        עם האישור תשלח הסיסמא לכתובת האימייל שתירשם בטופס ההרשמה למטה
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                autoFocus
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                autoComplete="lname"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="כתובת אימייל"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}   
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="community"
                label="ישוב"
                type="community"
                id="community"
                autoComplete="community"
                value={formik.values.community}
                onChange={formik.handleChange}
                error={formik.touched.community && Boolean(formik.errors.community)}
                helperText={formik.touched.community && formik.errors.community}                 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="phoneNum"
                label="מס׳ הנייד"
                type="phoneNum"
                id="phoneNum"
                autoComplete="phoneNum"
                value={formik.values.phoneNum}
                onChange={formik.handleChange}
                error={formik.touched.phoneNum && Boolean(formik.errors.phoneNum)}
                helperText={formik.touched.phoneNum && formik.errors.phoneNum}                   
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            הרשמה
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                כבר יש חשבון? להתחברות נא ללחוץ כאן
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export {SignUp as default}