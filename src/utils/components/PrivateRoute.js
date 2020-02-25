import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";

import {AuthService} from '../../services/authService'

const PrivateRoute = (props)=>{
    const [userInfo,setUserInfo] = useState(AuthService.get().userInfo);

    useEffect(()=>{
        console.log('test')
        AuthService.onChange('privateRoute',()=>{
           setUserInfo(AuthService.get().userInfo)
        });

        return ()=>{
            AuthService.deleteKey('privateRoute')
        }
    },[])

        return (
            <Route
                {...props.rest}
                render={({ location }) =>
                    userInfo ? (
                        props.children
                    ) : (
                        <Redirect to='login'/>
                    )
                }
            />
        );

}



export default PrivateRoute;


