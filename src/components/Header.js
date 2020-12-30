import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';

import UsersContext from '../context/users-context'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory()
  const {user} = useContext(UsersContext)
  const isAdmin = user.userType === 'admin'
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    history.push('/')
  };

  const handleSignUpClick = () => {
    history.push('/signUp')
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            תרבותי
          </Typography>
          <Button onClick={handleLoginClick} color="inherit">התחברות</Button>
          <Button onClick={handleSignUpClick} color="inherit">הרשמה</Button>
        </Toolbar>
      </AppBar>
      <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <Link  to="/create">הוסף המלצה</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link  to="/dashboard">דף הבית</Link>
        </MenuItem>
        {isAdmin ? (
        <MenuItem onClick={handleClose}>
            <Link  to="/admin">ניהול משתמשים</Link>
        </MenuItem>
        ) : ('')
      }
      </Menu>
    </div>
    </div>
  );
} 

// const Header = () => ( 
    
//     <Container maxWidth="md" component="main" >
//           <header >
//           <div >
//               <div >
//                   <Link to="/dashboard" >
//                   <h1>תרבותי</h1>
//                   </Link>
//                   <button>Logout</button>
//               </div>
//           </div>
//       </header>
   
//   </Container>
// );
 export {Header as default}
