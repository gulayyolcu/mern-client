import React, { useEffect, useState, useContext } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'


const Post = () => {

    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext)
    var likeArray = [postObject.Likes]

    let history=useHistory()

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
            console.log(response.data)
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios
            .post(
                "http://localhost:3001/comments",
                {
                    commentBody: newComment,
                    PostId: id,
                },
                {
                    headers: {
                        //accessToken: sessionStorage.getItem("accessToken")
                        accessToken: sessionStorage.getItem("accessToken")
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = { commentBody: newComment, username: response.data.username };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id
                    })
                )
            })
    }

   const deletePost=(id)=>{
    axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: {
            accessToken: sessionStorage.getItem("accessToken")
        }
    })
        .then(() => {
            if(postObject.id===id){
                setPostObject({})
            }
            history.push('/')
        })
   }

   const editPost=(option)=>{
        if(option==="title"){
            let newTitle=prompt("Enter new title:")
            axios.put("http://localhost:3001/posts/title",{newTitle:newTitle,id:id},{
                headers:{accessToken:sessionStorage.getItem("accessToken")}
            })
            setPostObject({...postObject,title:newTitle})
        }else if(option==="body"){
            let newPostText=prompt("Enter new text:")
            axios.put("http://localhost:3001/posts/postText",{newText:newPostText,id:id},{
                headers:{accessToken:sessionStorage.getItem("accessToken")}
            })
            setPostObject({...postObject,postText:newPostText})
        }
   }

    return (
        <div className="flex flex-col">
            <div key={postObject.id} className="flex border-b border-solid border-grey-light">

                <div className="w-1/8 text-right pl-3 pt-3">
                    <div><a href="#!"><img src="https://gravatar.com/avatar/0ecdc6b26e5e62a9e804c82adeff3eca?s=400&d=robohash&r=x" alt="avatar" className="rounded-full h-12 w-12 mr-2" /></a></div>
                </div>

                <div className="w-7/8 p-3 pl-0">
                    <div className="flex justify-between">
                        <div>
                            <span className="font-bold"><a href="#!" className="text-black">Tailwind CSS</a></span>
                            <span className="text-grey-dark">@{postObject.username}</span>
                            <span className="text-grey-dark">&middot;</span>
                            <span className="text-grey-dark">{postObject.createdAt}</span>
                        </div>
                        <div>
                            <a href="#!" className="text-grey-dark hover:text-teal"><i className="fa fa-chevron-down"></i></a>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <div onClick={()=>{
                                if(authState.username===postObject.username){
                                    editPost("title")
                                }  
                            }} className="mb-6">🎉 {postObject.title}</div>
                            <div onClick={()=>{
                                if(authState.username===postObject.username){
                                    editPost("body")
                                } 
                            }} className="mb-4">{postObject.postText}</div>



                        </div>
                        <div className="pb-2 flex flex-row justify-between">

                            <span className="mr-8"><a href="#!" className="text-red-400 hover:no-underline focus:text-red"><i className="fa fa-heart fa-lg mr-2"></i>{likeArray.length}</a></span>
                            <span className="mr-8"><a href="#!" className="text-red-400 hover:no-underline focus:text-red-500"><i className="fa fa-user fa-lg mr-2" ></i> {postObject.username}</a></span>
                            {
                                authState.username === postObject.username && <span className="mt-1"><a href="#!" className="text-grey-dark hover:no-underline hover:text-teal"><i onClick={() => deletePost(postObject.id)} className="fa fa-trash-alt fa-lg mr-2"></i></a></span>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4 pl-24 pb-8">

                <div>

                    <form>
                        <label htmlFor="postText" className="block mb-2 text-sm text-gray-600 dark:text-gray-400 mt-4">Post Comment </label>
                        <textarea row="5" value={newComment} onChange={(event) => setNewComment(event.target.value)} autoComplete="off" className="w-full px-3 py-2 mb-4 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 break-all" name="commentBody" placeholder="Leave your comment.." />
                        <button onClick={addComment} type="submit" className="px-4 py-2 font-bold text-white bg-indigo-400 hover:bg-indigo-600 rounded-md focus:bg-indigo-600 focus:outline-none">Send Comment</button>
                    </form>


                </div>
                <div>
                    <div className="w-full px-4 py-2 text-white bg-blue-300 font-bold rounded-md focus:outline-none mt-4 ">Comments</div>
                    {
                        comments.map((comment, key) => {

                            return (
                                <div key={key} className="w-full pt-4">
                                    <div>
                                        <div className="mb-4 border rounded px-4 py-2">

                                            <p className="mb-2"><span><b>Comment Id:</b>{comment.id} </span>{comment.commentBody}</p>
                                            <span><b>Post Id:</b>{comment.PostId}</span>
                                            <div className="flex flex-row justify-between">
                                                <span className="mt-2 font-bold">{comment.username}</span>
                                                {
                                                    authState.username === comment.username && <span className="mt-1"><a href="#!" className="text-grey-dark hover:no-underline hover:text-teal"><i onClick={() => deleteComment(comment.id)} className="fa fa-trash-alt fa-lg mr-2"></i></a></span>
                                                }

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>



    )
}

export default Post
