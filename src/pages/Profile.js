import React, { useEffect, useState,useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

const Profile = () => {
    let { id } = useParams()
    const [username, setUsername] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    let history = useHistory()
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
            .then((response) => {
                setUsername(response.data.username)
            })

        axios.get(`http://localhost:3001/posts/byuserId/${id}`)
            .then((response) => {
                setListOfPosts(response.data)
            })
    }, [id])

    return (
        <div>
            <div>
                <h1 className="text-6xl text-center text-red-400 font-bold capitalize"> Profile Page {username}</h1>
                {authState.username===username && <button onClick={()=>{history.push("/changepassword")}} type="submit" className="px-4 py-2 font-bold my-8 w-full text-lg text-white bg-indigo-400 hover:bg-indigo-600 rounded-md focus:bg-indigo-600 focus:outline-none">Change My Password</button>}
            </div>
            <div>Basic info </div>
            <div>
                {

                    listOfPosts.map((value, key) => {

                        return (
                            <div key={key} onClick={() => { history.push(`/post/${value.id}`); }} className="flex border-b border-solid border-grey-light">

                                <div className="w-1/8 text-right pl-3 pt-3">
                                    <div><a href="#!"><img src="https://gravatar.com/avatar/0ecdc6b26e5e62a9e804c82adeff3eca?s=400&d=robohash&r=x" alt="avatar" className="rounded-full h-12 w-12 mr-2" /></a></div>
                                </div>

                                <div className="w-7/8 p-3 pl-0">
                                    <div className="flex justify-between">
                                        <div>
                                            <span className="font-bold"><a href="#!" className="text-black">Tailwind CSS</a></span>
                                            <span className="text-grey-dark">@{value.username}</span>
                                            <span className="text-grey-dark">&middot;</span>
                                            <span className="text-grey-dark">{value.createdAt}</span>
                                        </div>
                                        <div>
                                            <a href="#!" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down"></i></a>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-4">
                                            <p className="mb-6">🎉 {value.title}</p>
                                            <p className="mb-4">{value.postText}</p>



                                        </div>
                                        <div className="pb-2 flex flex-row justify-between">
                                            <span className="mr-8"><a href="#!" className="text-red-400 hover:no-underline focus:text-red-500"><i className="fa fa-user fa-lg mr-2" ></i> {value.username}</a></span>
                                            <span className="mr-8"><a href="#!" className="text-red-400 hover:no-underline focus:text-red-500"><i className="fa fa-heart fa-lg mr-2" ></i> {value.Likes.length}</a></span>
                                        </div>
        
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile
