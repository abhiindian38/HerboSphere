
import { useContext } from 'react'
import {UserLoginContext} from '../../contexts/UserLoginContext'
import {Link, Outlet, useNavigate} from "react-router-dom"
import { CiBookmark } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";



function UserProfile() {

  let {currentUser} = useContext(UserLoginContext)
  let navigate = useNavigate()
  function onEditUser(){
    navigate("../edit-user")
  }
  return (
    <div>
      <div className='text-end p-3'>
        <img src={currentUser.propic} width="80px"  className='rounded-circle'/>
        <p className='fs-3'>{currentUser.username} <FaRegEdit onClick={onEditUser}/></p>
      </div>
      <ul className='nav fs-5 p-3 justify-content-around my-2 '>
        <li className="nav-item ">
            <Link to='' className='nav-link profile'> <CiBookmark />Bookmarks</Link>
        </li>

        <li className="nav-item ">
            <Link to='' className='nav-link profile'> <FiShoppingCart className='icons'/>Notes</Link>
           
        </li>
      </ul>
      <Chatbot />
      <Outlet />
    </div>
  )
}

export default UserProfile;