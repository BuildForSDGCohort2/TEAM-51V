
import React from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {

    return (<div className="w-full max-w-md mx-auto my-8">
        <div className="bg-white border border-gray-300 rounded-lg px-8 pt-6 pb-8">



        <h2 className="pt-4 mb-8 text-4xl font-bold heading">Sign up</h2>
        <form action="">
            <div className="input-group">
                <label className="label" >Name</label>
                <input type="text" name="name" className="input" />
            </div>
            <div className="input-group">
                <label className="label" >Username</label>
                <input type="text" name="username" className="input" />
            </div>

            <div className="input-group">
                <label className="label" >Email</label>
                <input type="email" name="email" autoComplete="email" className="input" />
            </div>

            <div className="input-group">
                <div className="flex">
                    <label className="label" >Password</label>

                    <span className="pl-1 text-xs text-grey-dark"><em>(6  characters minimum)</em></span>

                </div>
                <input type="password" autoComplete="new-password" className="input" />
            </div>

            <div className="input-group">
                <label className="label" >Password Confirmation</label>
                <input type="password" name="password_confirmation" autoComplete="new-password" className="input" />
            </div>

            <label class="md:w-2/3 mb-3 block text-gray-500 font-bold">
                <input class="mr-2 leading-tight" name="is_mentor" type="checkbox"/>
                <span class="text-sm">
                I want to mentor
                </span>
            </label>

            <div className="input-group">
                <input type="submit" className="btn btn-default" />
            </div>

        </form>
            <hr className="mt-6 border" />
            <div className="flex flex-wrap">
                <Link to="/sign_in" className= "block py-2 text-gray-700 underline hover:no-underline" >Login</Link>
                </div>
        </div>

    </div >)
}