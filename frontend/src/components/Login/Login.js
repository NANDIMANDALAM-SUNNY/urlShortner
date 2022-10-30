// import React,{useContext, useEffect} from 'react'
// import axios from 'axios';
// import { Link, Link as RouterLink,useNavigate } from 'react-router-dom';
// import { loginSchema } from "../FormsValidations/LoginForm/index";
// import { useFormik } from "formik";
// import {store} from '../../App'
// import logo from '../../images/logo.png'
// import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';



// const Login = () => {
//      const navigate = useNavigate();
//   const {token,setToken} = useContext(store);
//   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
//     initialValues: {
//       email: '',
//       password:""
//     },
//     validationSchema: loginSchema,
//     onSubmit :async (values,action)=>{
//       await  axios.post("http://localhost:8000/users/login",values)
//         .then((res)=>{
//           setToken(res.data.data)
//           alert(res.data.message)
//         })
//         .catch((err)=>{
//           alert('Invalid Credentials')
//         })
//         action.resetForm()
//     },
//     onChange:(values)=>{
//         console.log(values)
//     }
//   });
//    if(token){
//      localStorage.setItem('jwt-token',token);
//      console.log(token)
//      navigate('/')
//    } 
 

//   return (
//     <>
//      <Grid container justifyContent="center" alignItems="center">
//      <img src={logo} style={{width:"200px",height:"200px"}}/>
//      </Grid>
// <Grid
//   container
//   spacing={0}
//   direction="column"
//   alignItems="center"
//   style={{ minHeight: '100vh' }}
// >

//   <Grid item xs={3}>
//   <Grid item  component={Paper} sx={{width:400,height:350,pt:3}} elevation={6}>
     
//     <Box
//           sx={{
//             mx: 4,          
//           }}
//         >
//           <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   // autoFocus
//                   onChange={handleChange}
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   onBlur={handleBlur}
//                   value={values.email}
//                 />
//                 {errors.email && touched.email && <p className="error">{errors.email}</p>}
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   label="Password"
//                   onChange={handleChange}
//                   id="password"
//                   type="password"
//                   placeholder="Enter Password"
//                   onBlur={handleBlur}
//                   value={values.password}
//                                 />
//                   {errors.password && touched.password && (<p className="error">{errors.password}</p>)}
//                     <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     sx={{ mt: 3, mb: 2 }}
//                     >
//                     Sign up
//                     </Button>
//           </Box>
//         </Box>
//              <Typography sx={{ml:3}} >Don't have account ?  <Typography  component={RouterLink} to='/register'>Sign up</Typography></Typography>   
//              {/* forgot-password */}
//              <Typography style={{display:"flex",flexDirection:"row-reverse"}} component={RouterLink} to='/forgot-password'>Fotgot pasword</Typography>

//     </Grid>
//    </Grid>
   
// </Grid> 

//     </>
//   )
// }

// export default Login


import React,{useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from "../FormsValidations/LoginForm";
import { useFormik } from "formik";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { store } from '../../App';



const Login = () => {
    const navigate = useNavigate();
  const {token,setToken} = useContext(store);
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      email: '',
      password:""
    },
    validationSchema: loginSchema,
    onSubmit :async (values,action)=>{
      await  axios.post("http://localhost:8000/users/login",values)
        .then((res)=>{
          setToken(res.data.data)
          alert(res.data.message)
        })
        .catch((err)=>{
          alert('Invalid Credentials')
        })
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });
  // jwttoken
  if(token){
    localStorage.setItem('jwt-token',token);
    navigate('/')
  } 
 


  return (    
    <>
<Grid container component="main" spacing={2} alignItems="stretch" height="100vh">
  <Grid item xs={1} md={3} ></Grid>
  <Grid item xs={10} md={6}  component={Paper} elevation={6} square>
  <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate autoComplete='off' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      
                                     
                                        <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email"
                                    variant="standard"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email "
                                    onBlur={handleBlur}
                                    value={values.email}
                                    />
                                     {errors.email && touched.email && <p className="error">{errors.email}</p>}
                              
                   
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                variant="standard"
                                onChange={handleChange}
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                onBlur={handleBlur}
                                value={values.password}
                                />
                                {errors.password && touched.password && (<p className="error">{errors.password}</p>)}                           
                        {/* </Grid> */}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Login
                    </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
                <Typography >Don't have Account   <Typography  component={RouterLink} to='/register' >Signup here ?</Typography> </Typography>
              <Grid item>
                <Typography component={RouterLink} to='/forgot-password'  sx={{ m: 4 }}>Forgot Password</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
 </Grid>
  <Grid item xs={1} sm={0}></Grid>
</Grid>

    </>

  );
};
export default Login;
