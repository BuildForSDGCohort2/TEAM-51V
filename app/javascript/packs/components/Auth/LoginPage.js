
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import Toast from '../../Toast'
import UserStore from "./UserStore";

export default function LoginPage() {
    let history = useHistory();

    const [login, setLogin] = useState({ email: "", password: "" })
    const handleChange = e => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (UserStore.getUser()) {
            history.replace( '/dashboard')
        }
    }, [])
    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            user: login,
            // authenticity_token: document.querySelector('[name=csrf-token]').content

        };
        fetch('/users/sign_in', {
            method: 'POST',
            body: JSON.stringify(payload),
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,

            }
        }).then((response) => {
                return response.json()
        })
            .then((data) => {
                if (data && data.error) {
                    console.log(data.error);
                    throw Error(data.error)
                }
                Toast.fire({
                    icon: 'success',
                    title: `Welcome back ${data.username}`
                })
                UserStore.setUser(data)
                history.replace( '/dashboard')
            }
            ).catch((error) => {
                console.log(error);
                Toast.fire({
                    icon: 'error',
                    title: error
                })
            })
    }
    return (<div className="w-full max-w-md mx-auto my-8">
        <div className="bg-white border border-gray-300 rounded-lg px-8 pt-6 pb-8">

            <h2 className="pt-4 mb-8 text-4xl font-bold heading">Sign up</h2>
            <form onSubmit={handleSubmit}>

                <div className="input-group">
                    <label className="label" >Email</label>
                    <input type="email" name="email" autoComplete="email" className="input" onChange={e => handleChange(e)} />
                </div>

                <div className="input-group">
                    <div className="flex">
                        <label className="label" >Password</label>
                        <span className="pl-1 text-xs text-grey-dark"><em>(6  characters minimum)</em></span>
                    </div>
                    <input type="password" autoComplete="password" name="password" className="input" onChange={e => handleChange(e)} />
                </div>


                <div className="input-group">
                    <input type="submit" className="btn btn-default" />
                </div>

            </form>
            <hr className="mt-6 border" />
            <div className="flex flex-wrap">
                <Link to="/register" className="block py-2 text-gray-700 underline hover:no-underline" >Sign up</Link>
            </div>
        </div>

    </div >)
}