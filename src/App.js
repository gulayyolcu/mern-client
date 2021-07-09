/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registration from './pages/Registration'
import PageNotFound from './pages/PageNotFound'
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'
import { AuthContext } from './helpers/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/auth", {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.error) {
                    setAuthState({ ...authState, status: false });
                } else {
                    setAuthState({
                        username: response.data.username,
                        id: response.data.id,
                        status: true,
                    });
                }
            });
    }, []);

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setAuthState({ username: "", id: 0, status: false });
    };
    return (
        <div className="App">
            <div className="bg-grey-light font-sans">
                <div className="bg-white">
                    <div className="container mx-auto flex flex-col lg:flex-row items-center py-4">
                        <nav className="w-full lg:w-2/5">
                            <a href="#!" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-home fa-lg"></i> Home</a>
                            <a href="#!" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-bolt fa-lg"></i> Moments</a>
                            <a href="#!" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-bell fa-lg"></i> Notifications</a>
                            <a href="#!" className="text-grey-darker text-sm mr-4 font-semibold pb-6 border-b-2 border-solid border-transparent no-underline hover:text-teal hover:border-teal hover:no-underline"><i className="fa fa-envelope fa-lg"></i> Messages</a>

                        </nav>
                        <div className="w-full lg:w-1/5 text-center my-4 lg:my-0"><a href="#!"><i className="fa fa-twitter fa-lg text-blue"></i></a></div>
                        <div className="w-full lg:w-2/5 flex lg:justify-end">
                            <div className="mr-4 relative">
                                <input type="text" className="bg-grey-lighter h-8 px-4 py-2 text-xs w-48 rounded-full" placeholder="Search Twitter" />
                                <span className="flex items-center absolute pin-r pin-y mr-3"><i className="fa fa-search text-grey"></i></span>
                            </div>
                            <div className="mr-4"><a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_avatar.jpg" alt="avatar" className="h-8 w-8 rounded-full" /></a></div>
                            <div><button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Tweet</button></div>
                        </div>
                    </div>
                </div>

                <div className="hero h-32 bg-cover h-56"></div>

                <div className="bg-white shadow">
                    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:relative">
                        <div className="w-full lg:w-1/4">
                            <img src="data:image/png;base64,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" alt="logo" className="rounded-full h-36 w-36 lg:absolute lg:pin-l lg:pin-t lg:-mt-24" />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-reset flex">
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent border-teal">
                                    <a href="#!" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                        <div className="text-lg tracking-tight font-bold text-teal">60</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#!" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Following</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">4</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#!" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Followers</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">3,810</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#!" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Likes</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">9</div>
                                    </a>
                                </li>
                                <li className="text-center py-3 px-4 border-b-2 border-solid border-transparent hover:border-teal">
                                    <a href="#!" className="text-grey-darker no-underline hover:no-underline">
                                        <div className="text-sm font-bold tracking-tight mb-1">Moments</div>
                                        <div className="text-lg tracking-tight font-bold hover:text-teal">1</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-1/4 flex my-4 lg:my-0 lg:justify-end items-center">
                            <div className="mr-6">
                                <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full">Following</button>
                            </div>
                            <div>
                                <a href="#!" className="text-grey-dark"><i className="fa fa-ellipsis-v fa-lg"></i></a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="container mx-auto flex flex-col lg:flex-row mt-3 text-sm leading-normal">
                    <div className="w-full lg:w-1/4 pl-4 lg:pl-0 pr-6 mt-8 mb-4">
                        <h1><a href="#!" className="text-black font-bold no-underline hover:underline">Tailwind CSS Official Page</a></h1>
                        <div className="mb-4"><a href="#!" className="text-grey-darker no-underline hover:underline">@tailwindcss</a></div>

                        <div className="mb-4">
                            A utility-first CSS framework for rapid UI development. By <a href="#!" className="text-teal no-underline hover:underline">@adamwathan</a>, <a href="#!" className="text-teal no-underline hover:underline">@reinink</a>, <a href="#!" className="text-teal no-underline hover:underline">@davidhemphill</a>, and <a href="#!" className="text-teal no-underline hover:underline">@steveschoger</a>.
                        </div>

                        <div className="mb-2"><i className="fa fa-link fa-lg text-grey-darker mr-1"></i><a href="#!" className="text-teal no-underline hover:underline">tailwindcss.com</a></div>
                        <div className="mb-4"><i className="fa fa-calendar fa-lg text-grey-darker mr-1"></i><a href="#!" className="text-teal no-underline hover:underline">Joined August 2017</a></div>

                        <div className="mb-4">
                            <button className="bg-teal hover:bg-teal-dark text-white font-medium py-2 px-4 rounded-full w-full h-10">Tweet to Tailwind CSS</button>
                        </div>

                        <div className="mb-4"><i className="fa fa-user fa-lg text-grey-dark mr-1"></i><a href="#!" className="text-teal no-underline hover:underline">27 Followers you know</a></div>

                        <div className="mb-4">
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower01.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower02.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower03.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower04.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower05.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower06.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower07.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower08.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower09.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                            <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follower10.jpg" alt="avatar" className="rounded-full h-12 w-12" /></a>
                        </div>

                        <div className="mb-4"><i className="fa fa-picture-o fa-lg text-grey-dark mr-1"></i><a href="#!" className="text-teal">Photos and videos</a></div>

                        <div className="mb-4">

                        </div>
                    </div>


                    <div className="w-full lg:w-1/2 bg-white mb-4">

                        <div className="p-3 text-lg font-bold border-b border-solid border-grey-light">
                            <a href="#!" className="text-black mr-6 no-underline hover-underline">Tweets</a>
                            <a href="#!" className="mr-6 text-teal no-underline hover:underline">Tweets &amp; Replies</a>
                            <a href="#!" className="text-teal no-underline hover:underline">Media</a>
                        </div>





                        {/**********************************************************************************************/}
                        {/* JSX */}
                        <AuthContext.Provider value={{ authState, setAuthState }}>
                            <Router >
                                <div className="flex flex-row">
                                    <Link to="/" className="no-underline" ><i className="fab fa-twitter flex inline-flex rounded rounded-full text-5xl text-white bg-blue-500  h-auto w-auto p-4 mt-4 mr-4"></i></Link>
                                    <Link to="/createpost"><img src="https://i1.wp.com/credomobblog.wpengine.com/wp-content/uploads/2018/04/1060_icons_compose-tweet.png?ssl=1" className="rounded rounded-full h-20 w-20 mt-4" alt="add tweet" /></Link>
                                    {authState.status===false ? (
                                        <>
                                            <Link to="/login"><i className="fas fa-sign-in-alt fa-6x text-blue-600 mt-4 ml-4"></i></Link>
                                            <Link to="/registration"><i className="fas fa-user-plus fa-5x text-blue-600 mt-4 ml-4"></i></Link>
                                        </>
                                    ) : (<button onClick={logout}><i className="fas fa-sign-out-alt fa-6x text-blue-600 mt-4 ml-4"></i></button>)}
                                    {
                                        authState.status===true && (
                                            <div className="flex flex-col ml-64 items-center">
                                                <i className="fas fa-user-alt fa-3x text-blue-600 mt-4 mb-2"></i>
                                                <span className="text-center text-xl text-blue-600 font-bold capitalize">{authState.username}</span>
                                            </div>
                                        )
                                    }

                                </div>

                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/posts" component={Home} />
                                    <Route path="/createpost" exact component={CreatePost} />
                                    <Route path="/post/:id" exact component={Post} />
                                    <Route path="/registration" exact component={Registration} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/profile/:id" exact component={Profile}/>
                                    <Route path="/changepassword" exact component={ChangePassword}/>
                                    <Route path="*" exact component={PageNotFound} />
                                </Switch>
                            </Router>
                        </AuthContext.Provider>


                        {/* JSX */}
                        {/**********************************************************************************************/}





                    </div>

                    <div className="w-full lg:w-1/4 pl-4">
                        <div className="bg-white p-3 mb-3">
                            <div>
                                <span className="text-lg font-bold">Who to follow</span>
                                <span>&middot;</span>
                                <span><a href="#!" className="text-teal text-xs">Refresh</a></span>
                                <span>&middot;</span>
                                <span><a href="#!" className="text-teal text-xs">View All</a></span>
                            </div>

                            <div className="flex border-b border-solid border-grey-light">
                                <div className="py-2">
                                    <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow1.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                                </div>
                                <div className="pl-2 py-2 w-full">
                                    <div className="flex justify-between mb-1">
                                        <div>
                                            <a href="#!" className="font-bold text-black">Nuxt.js</a> <a href="#!" className="text-grey-dark">@nuxt_js</a>
                                        </div>

                                        <div>
                                            <a href="#!" className="text-grey hover:text-grey-dark"><i className="fa fa-times"></i></a>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex border-b border-solid border-grey-light">
                                <div className="py-2">
                                    <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow2.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                                </div>
                                <div className="pl-2 py-2 w-full">
                                    <div className="flex justify-between mb-1">
                                        <div>
                                            <a href="#!" className="font-bold text-black">Laracon EU</a> <a href="#!" className="text-grey-dark">@LaraconEU</a>
                                        </div>

                                        <div>
                                            <a href="#!" className="text-grey hover:text-grey-dark"><i className="fa fa-times"></i></a>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border-b border-solid border-grey-light">
                                <div className="py-2">
                                    <a href="#!"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_follow3.jpg" alt="follow1" className="rounded-full h-12 w-12" /></a>
                                </div>
                                <div className="pl-2 py-2 w-full">
                                    <div className="flex justify-between mb-1">
                                        <div>
                                            <a href="#!" className="font-bold text-black">Laracon US</a> <a href="#!" className="text-grey-dark">@LaraconUS</a>
                                        </div>

                                        <div>
                                            <a href="#!" className="text-grey hover:text-grey-dark"><i className="fa fa-times"></i></a>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="bg-transparent text-xs hover:bg-teal text-teal font-semibold hover:text-white py-2 px-6 border border-teal hover:border-transparent rounded-full">
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex border-b border-solid border-grey-light">
                                <div className="py-4">
                                    <a href="#!" className=" p-1"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_outlook.png" alt="follow1" className="rounded h-6 w-6" /></a>
                                </div>
                                <div className="pl-2 py-2 w-full">
                                    <div className="flex justify-between">
                                        <div>
                                            <a href="#!" className="font-bold text-black">Find people you know</a>
                                        </div>
                                    </div>
                                    <div className="text-xs">
                                        Import your contacts from Outlook
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a href="#!" className="text-teal text-xs">Connect other address book</a>
                            </div>
                        </div>

                        <div className="bg-white p-3 mb-3">
                            <div className="mb-3">
                                <span className="text-lg font-bold">Trends for you</span>
                                <span>&middot;</span>
                                <span><a href="#!" className="text-teal text-xs">Change</a></span>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">Happy New Year</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">645K Tweets</a></div>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">Happy 2018</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">NYE 2018 Celebrations</a></div>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">#ByeBye2017</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">21.7K Tweets</a></div>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">#SomeHashTag</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">45K Tweets</a></div>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">Something Trending</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">36K Tweets</a></div>
                            </div>

                            <div className="mb-3 leading-tight">
                                <div><a href="#!" className="text-teal font-bold">#ColdAF</a></div>
                                <div><a href="#!" className="text-grey-dark text-xs">100K Tweets</a></div>
                            </div>

                        </div>

                        <div className="mb-3 text-xs">
                            <span className="mr-2"><a href="#!" className="text-grey-darker">&copy; 2018 Twitter</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">About</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">Help Center</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">Terms</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">Privacy policy</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">Cookies</a></span>
                            <span className="mr-2"><a href="#!" className="text-grey-darker">Ads info</a></span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );

}

export default App;
