// import React,{useState,useEffect, useContext} from 'react'
// import axios from 'axios'
// import Main from './Main/Main'
// import Paginations from './Pagination'
// import Sort from './Sort'
// import { store } from '../../App'
// import './dashboard.css'
// import { Grid } from '@mui/material'
// import { useNavigate } from 'react-router-dom'

// const base_url = "http://localhost:8000/webscrap/product-details";
// const Dashboard = () => {
//     const [obj, setObj] = useState({});
// 	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
// 	const [page, setPage] = useState(1);
// 	const navigate = useNavigate()
// const {search,token} = useContext(store)
//     const getProducts = async ()=>{
//         try {
//             const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`;
//             const { data } = await axios.get(url,{
// 				headers: {
//                     'jwt-token':token
// 				}
// 			});
//             // setObj(data);
			
//         } catch (err) {
//             console.log(err)
//         }
//     }
// console.log(obj)
// useEffect(()=>{
//     getProducts()
// 	if(!token) navigate('/login')
// },[sort,page,search])


// console.log(obj.total)
//   return (
//    <>
//    {/* <div className="wrapper"> */}
// 			{/* <div className="container"> */}
// 				{/* <div className="body">
// 					<div className="table_container">
// 						<Table mobiles={obj.movies ? obj.movies : []} />
// 						<Paginations 
// 							page={page}
// 							limit={obj.limit ? obj.limit : 0}
// 							total={obj.total ? obj.total : 0}
// 							setPage={(page) => setPage(page)}
// 						/>

// 					<Pagination limit={obj.limit ? obj.limit : 0}
// 							total={obj.total ? obj.total : 0}
// 							setPage={(page) => setPage(page)} />
// 					</div>
// 					<div className="filter_container">
// 						<Sort sort={sort} setSort={(sort) => setSort(sort)} />
// 					</div>
// 				</div> */}
// 			{/* </div> */}
// 		{/* </div> */}



// 	{/* <Grid container >
// 		<Grid item xs={0} md={2}></Grid>
// 		<Grid item xs={4} md={2}></Grid>
// 		<Grid item xs={8} md={6}>
// 		<Table mobiles={obj.movies ? obj.movies : []} />
// 		<Paginations 
// 							page={page}
// 							limit={obj.limit ? obj.limit : 0}
// 							total={obj.total ? obj.total : 0}
// 							setPage={(page) => setPage(page)}
// 						/>
// 		</Grid>
// 		<Grid item xs={0} md={2}></Grid>
// 	</Grid>					 */}

// <Grid container >
// 	<Grid item xs={3} md={3}>
// 	<Sort sort={sort} setSort={(sort) => setSort(sort)} />
// 	</Grid>
// 	<Grid item xs={7} md={7}>
// 		<Main products={obj.products ? obj.products : []} />
// 		<Paginations 
//   			page={page}
//   			limit={obj.limit ? obj.limit : 0}
//   			total={obj.total ? obj.total : 0}
//   			setPage={(page) => setPage(page)}
// 						/>
// 	</Grid>
// 	<Grid item xs={2} md={2}></Grid>
// </Grid>


//    </>
//   )
// }

// export default Dashboard

import { Box, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Button, TextField} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { store } from '../../App'
import {  useNavigate } from 'react-router-dom';
import './dashboard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



const Dashboard = () => {
	const {token,profile} = useContext(store)
  const navigate = useNavigate()
	const [url,setUrls] = useState([])
  const [open, setOpen] = useState(false);
  const [postUrl, setPosturl] = useState("")
  const [notification,setNotification] = useState("")


	const getUrls = async ()=>{
     await axios.get('http://localhost:8000/url')
      .then((res)=>setUrls(res.data.data))
      .catch(err=>console.log(err))
	}

  const handleClick = (short)=>{
    getUrls()
    window.open(`http://localhost:8000/url/${short}`)
  }

  const postFullUrl = async ()=>{
    await axios.post("http://localhost:8000/url/shortUrls",{"full":postUrl})
      .then(res=>setNotification(res.data.message))
      .catch(error=>console.log(error))
      await getUrls() 
    setOpen(false)
    console.log(notification,'noti')
  }






	useEffect(()=>{
		postFullUrl()
    if(!token) {
      navigate('/login')
    } 
	},[])

const notifications = (msg)=>{
  if(notification  == "Already this url used"){
    toast.warning(notification, {
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
    toast.error(notification, {
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
    toast.success(notification, {
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
  return (
	<>
  {
    profile && <>
    <Box>
      <Button onClick={ () => setOpen(true)}>Create Short Url</Button>
      <Modal
        open={open}
        onClose={ () => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <TextField onChange={(e)=>setPosturl(e.target.value)}/>
            <Button onClick={postFullUrl}>COnvert</Button>
        </Box>
      </Modal>
    </Box>

  {/* <table class="table">
    <thead>
      <tr>
        <th scope="col">S.no</th>
        <th scope="col">Full Url</th>
        <th scope="col">Short Url</th>
        <th scope="col">Clicks</th>
      </tr>
    </thead>
    <tbody>
    {
      url?.map((url,idx)=>(
        <tr>
          <th scope="row" key={idx}>{idx}</th>
          <td scope="row">{url.full}</td>
          <td scope="row" className="cursor-pointer short" onClick={()=>handleClick(url.short)} >{url.short}</td>
          <td scope="row">{url.clicks}</td>
        </tr>
      ))
    }
    </tbody>
  </table> */}
  <div class="h-100 d-flex align-items-center justify-content-center">


  <table class="table">
  <thead>
    <tr>
        <th scope="col">S.no</th>
        <th scope="col">Full Url</th>
        <th scope="col">Short Url</th>
        <th scope="col">Clicks</th>
    </tr>
  </thead>
  <tbody>
   

    {
      url?.map((url,idx)=>{
         return <>
         <tr key={idx}>
         <td>{idx}</td>
            <td>{url.full}</td>
            <td  className="cursor-pointer " onClick={()=>handleClick(url.short)} >{url.short}</td>
            <td >{url.clicks}</td>
          </tr> 
        </>
    })
    }
  </tbody>
</table>

</div>
    </>
  
  }
  <ToastContainer />
	</>
  )
}

export default Dashboard