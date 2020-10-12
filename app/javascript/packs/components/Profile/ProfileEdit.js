
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from '../../Toast'
import UserStore from "./UserStore";
import axios from 'axios'

export default function ProfileEdit() {
    let history = useHistory();

    const [login, setLogin] = useState({ email: "", password: "", password_confirmation: "", username: "" })
    const [error, setError] = useState({})
    const handleChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleError = e => {
        setError({ ...error, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            user: login,
            // authenticity_token: document.querySelector('[name=csrf-token]').content

        };
        axios.post('/users',
            payload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log('Response', response.data)
            if (response) {
                UserStore.setUser(response.data)
                history.replace('/dashboard')
            }
        })
            .catch(e => {
                console.log('Error: ', e.response.data)
                //     console.log("error"+error);
                Toast.fire({
                    icon: 'error',
                    title: "Registration failed"
                })

                setError({ ...e.response.data.errors })

            })
    }

    return (<div className="w-full max-w-md mx-auto my-8">
        <div className="bg-white border border-gray-300 rounded-lg px-8 pt-6 pb-8">



            <h2 className="pt-4 mb-8 text-4xl font-bold heading">Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label" >Name</label>
                    <input onChange={e => handleChange(e)} type="text" name="name" className="input" />
                    {error.name && <p className="text-red-500 text-xs italic">Full name {error.name.join(",")}.</p>}
                </div>
                <div className="input-group">
                    <label className="label" >Username</label>
                    <input onChange={e => handleChange(e)} type="text" name="username" className="input" />
                    {error.username && <p className="text-red-500 text-xs italic">Username {error.username.join(",")}.</p>}
                </div>

                <div className="input-group">
                    <label className="label" >Email</label>
                    <input onChange={e => handleChange(e)} type="email" name="email" autoComplete="email" className="input" />
                    {error.email && <p className="text-red-500 text-xs italic">Email {error.email.join(",")}.</p>}
                </div>

                <div className="input-group">
                    <div className="flex">
                        <label className="label" >Password</label>

                        <span className="pl-1 text-xs text-grey-dark"><em>(6  characters minimum)</em></span>

                    </div>
                    <input onChange={e => handleChange(e)} type="password" name="password" autoComplete="new-password" className="input" />
                    {error.password && <p className="text-red-500 text-xs italic">Password {error.password.join(",")}.</p>}
                </div>
                <div className="input-group">
                    <label className="label" >Password Confirmation</label>
                    <input onChange={e => handleChange(e)} type="password" name="password_confirmation" autoComplete="new-password" className="input" />
                    {error.password_confirmation && <p className="text-red-500 text-xs italic">Password Confirmation {error.password_confirmation.join(",")}.</p>}
                </div>

                <label className="md:w-2/3 mb-3 block font-bold">
                    <input onChange={e => handleChange(e)} className="mr-2 leading-tight" name="is_mentor" type="checkbox" />
                    <span className="text-sm">
                        I want to mentor
                    </span>
                </label>

                <div className="input-group">
                    <input type="submit" className="btn btn-default" />
                </div>

            </form>
            <hr className="mt-6 border" />
            <div className="flex flex-wrap">
                <Link to="/sign_in" className="block py-2 text-gray-700 underline hover:no-underline" >Login</Link>
            </div>
        </div>

    </div >)
}