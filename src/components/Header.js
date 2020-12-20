import React from 'react';
import {Link} from 'react-router-dom';

import Container from '@material-ui/core/Container';
 

const Header = () => ( 
    
    <Container maxWidth="md" component="main" >
          <header >
          <div >
              <div >
                  <Link to="/dashboard" >
                  <h1>תרבותי</h1>
                  </Link>
                  <button>Logout</button>
              </div>
          </div>
      </header>
   
  </Container>
);
 export {Header as default}
