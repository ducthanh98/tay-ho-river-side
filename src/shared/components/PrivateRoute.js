import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'

const PrivateRoute = ({ isAuthenticated,children, ...rest })=>{
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect to={'login'}/>
                )
            }
        />
    );
}


const mapStateToProps=state=>{
    return {
        isAuthenticated:state.isAuthenticated
    }
}

export default connect(
    mapStateToProps,
    null
)(PrivateRoute);


