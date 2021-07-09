import React,{useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router'
//import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
    //const { authState } = useContext(AuthContext);
    let history = useHistory()

    const initialValues = {
        title: "",
        postText: ""
    }
    useEffect(()=>{
      if(!sessionStorage.getItem("accessToken")){
          history.push('/login')
      }
    },[history])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        //username: Yup.string().min(3).max(15).required(),
    })
    const onSubmit = (data) => {

        axios.post('http://localhost:3001/posts', data,{
            headers:{
                accessToken:sessionStorage.getItem("accessToken")
            }
        })
        .then((response) => {
            history.push("/")
        })
    }
    return (
        <div>
            <div className="bg-gray-50 flex-grow p-6">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form >
                        <div className="mb-4">
                            <label for="title" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Title </label>
                            <Field autoComplete="off" className="w-full px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" id="inputCreatePost" name="title" placeholder="(Ex. Enter title)" />
                            <ErrorMessage className="text-red-400 font-semibold" name="title" component="span" />
                        </div>

                        <div className="mb-4">
                            <label for="postText" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Post Text </label>
                            <Field autoComplete="off" component="textarea" rows="5" className="w-full h-28 px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 break-all" id="inputCreatePost" name="postText" placeholder="Leave your message.." />
                            <ErrorMessage className="text-red-400 font-semibold" name="postText" component="span" />
                        </div>


                        



                        <div className="mb-3">
                            <button
                                type="submit"
                                className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                            >
                                Send Post
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-400" id="result">
                            <span>Powered by <a href="https://Web3Forms.com" className="text-gray-600" target="_blank" rel="noopener noreferrer">Gülay Yolcu</a></span>
                        </p>
                    </Form>



                </Formik>
            </div>


        </div>
    )
}

export default CreatePost
/* initialValues={} onSubmit={} validationSchema={} */