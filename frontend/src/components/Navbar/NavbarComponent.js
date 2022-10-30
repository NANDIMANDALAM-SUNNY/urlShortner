import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../../App'

const NavbarComponent = () => {
const {token,profile,setProfile} = useContext(store)

  const getProfile = async ()=>{
    try {
      const data = await axios.get("http://localhost:8000/users/get-profile",{
        headers: {
          "jwt-token" : token
        }
      }).then((res)=>{
        setProfile(res.data.data)
        console.log(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProfile()
  }, [token])
  

  return (
    <>
    {
      token && profile!==undefined? <>
      <nav class="navbar navbar-expand-sm navbar-dark " style={{background:"#2874F0"}}>
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)"><img src='https://camo.githubusercontent.com/56ea24702a43a27f55794275849e38c16cd393e244a59297a71266b9b34e3e53/68747470733a2f2f617368616c6c656e64657369676e2e636f2e756b2f696d616765732f637573746f6d2f73686f72742d75726c2d6c6f676f2e706e67' width="130x" height="35px"  alt="logo"/>  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav ms-auto">
        <li>
            <Avatar     component={Link}  >
            <Link to="/profile">
              <img src={profile.profile}  style={{borderRadius:"50%",height:"40px",width:"40px"}}/>
            </Link>
            </Avatar>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </>:null
    }
    
    </>
  )
}

export default NavbarComponent