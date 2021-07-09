import React,{useState} from 'react'
import axios from 'axios'

const ChangePassword = () => {
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")

    const changePassword=()=>{
        axios.put("http://localhost:3001/auth/changepassword",
        {oldPassword:oldPassword,newPassword:newPassword},
        {
            headers:{accessToken:sessionStorage.getItem("accessToken")}
        })
        .then((response)=>{
            if(response.data.error){
                alert(response.data.error)
            }
        })
    }

    return (
        <div className="flex flex-col ">
            <h1 className="my-8 text-3xl text-red-400 font-bold text-center">Change Your Password</h1>
            <input onChange={(event)=>{
                setOldPassword(event.target.value)
            }} type="password" placeholder="Old Password" className="px-4 py-2  border-gray-200 my-2 w-1/3 text-md rounded-md focus:outline-none" />
            <input onChange={(event)=>{
                setNewPassword(event.target.value)
            }} type="password" placeholder="New Password" className="px-4 py-2  border-gray-200 my-2 w-1/3 text-md rounded-md focus:outline-none" />
            <button onClick={changePassword} type="submit" className="px-4 py-2 font-bold my-8 w-1/3 text-lg text-white bg-indigo-400 hover:bg-indigo-600 rounded-md focus:bg-indigo-600 focus:outline-none">Change My Password</button>
        </div>
    )
}

export default ChangePassword
