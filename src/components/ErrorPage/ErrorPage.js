import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './ErrorPage.module.scss'


const ErrorPage = ({onMainPage}) => {
    return(
        <div className={classes.ErrorPage}>
            <span className={classes.ErrorPage__404}>404</span>
            <span className={classes.ErrorPage__Text}>Ups... No such page :(</span>
            <NavLink onClick={onMainPage} to="/rooms">Back to rooms</NavLink>
        </div>
    )
}

export default ErrorPage