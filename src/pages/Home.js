import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
//import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import axios from 'axios'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    /* if(!sessionStorage.getItem("accessToken")) */
    if (authState.status === false && (!sessionStorage.getItem("accessToken"))) {
      history.push('/login')
    } else {
      axios.get("http://localhost:3001/posts", {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
          console.log(response.data.likedPosts);
        });
    }


  }, [authState, history]);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: sessionStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
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
                    <span className="text-grey-dark"><Link to={`/profile/${value.UserId}`}>{value.username}</Link></span>
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
                  <div onClick={() => { likeAPost(value.id) }} className="pb-2 flex flex-row justify-between">
                    <span className="mr-8">
                      <a href="#!" className="text-red-400 hover:no-underline focus:text-red-500">
                        <i className="fa fa-user fa-lg mr-2" ></i><Link to={`/profile/${value.UserId}`}>{value.username}</Link> 
                      </a>
                    </span>
                    <span className="mr-8"><a href="#!" className="text-red-400 hover:no-underline focus:text-red-500"><i className="fa fa-heart fa-lg mr-2" ></i> {value.Likes.length}</a></span>
                  </div>
                  {/*  <div className="buttons">
                    <ThumbUpAltIcon
                      onClick={() => {
                        likeAPost(value.id);
                      }}
                      className={
                        likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                      }
                    /> 
                    <label> {value.Likes.length}</label>
                  </div>*/}
                </div>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default Home
