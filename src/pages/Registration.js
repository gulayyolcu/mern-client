import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


const Registration = () => {

    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/auth",data)
            .then(()=>{
                console.log(data);
            })      
    }

    return (
        <div className="mt-4 border p-4 rounded rounded-md">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form >

                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Username </label>
                        <Field autoComplete="off" className="w-full px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 " id="inputCreatePost" name="username" placeholder="(Ex. Enter username)" />
                        <ErrorMessage className="text-red-400 font-semibold" name="username" component="span" />

                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                        <Field type="password" autoComplete="off" className="w-full px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 " id="inputCreatePost" name="password" placeholder="(Ex. Enter password)" />
                        <ErrorMessage className="text-red-400 font-semibold" name="password" component="span" />

                    </div>

                    <div className="mb-3">
                        <button type="submit" className="w-full font-bold px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
                            Register
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-400" id="result">
                        <span>Powered by <a href="https://Web3Forms.com" className="text-gray-600" target="_blank" rel="noopener noreferrer">Gülay Yolcu</a></span>
                    </p>
                </Form>



            </Formik>
        </div>
    )
}

export default Registration
