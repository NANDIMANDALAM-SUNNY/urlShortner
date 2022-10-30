import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from "../FormsValidations/SignupForm";
import { useFormik } from "formik";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FileBase64  from 'react-file-base64'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
   const navigate = useNavigate();
   const [notification,setNotification] = useState("")
   const [img,setImg] = useState("")
   const[file,setFile] = useState("")
   const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: { name: "", email: "", password: "",},
    validationSchema: signUpSchema,
    onSubmit :async (values,action)=>{
      await  axios.post("http://localhost:8000/users/register",{...values,"profile":img})
        .then((res)=>{
            console.log(res.data)
                setNotification(res.data.message)
                setTimeout(() => {
                  navigate('/login')
              }, 3000);
          })
          .catch((err)=>{
              alert(err)
          })
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });

  const notifications = (msg)=>{
    if(notification  == "User Already Exists"){
      toast.warning("User Already Exists", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
    else if (notification == "Error"){
      toast.error("Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
    else if (notification == "Success"){
      toast.success("Please check your mail to confirm", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
  }
notifications()

  const handleChangeImage =async (e)=>{
     setImg(e.target.value, e.target.value);
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
                        <Grid container spacing={3}>
                                <Grid item xs={6}>
                                            <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Full Name"
                                        id="name"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Enter your Full Name"
                                        onBlur={handleBlur}
                                        value={values.name}
                                        variant="standard"
                                        />
                                         {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
                                </Grid>
                                <Grid item xs={6}>
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
                                </Grid>
                            </Grid>
                            <FileBase64 type="file" name='img' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>

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
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Typography component={RouterLink} to='/login'>{"Already having account ? Login here"}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
 </Grid>
  <Grid item xs={1} sm={0}></Grid>
</Grid>

<ToastContainer />
    </>

  );
};
export default Register;
