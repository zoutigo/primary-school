import React from 'react'
import {useSelector} from 'react-redux'
import {makeStyles, useTheme} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {Switch, Route} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import SmallScreenMenu from './SmallScreenMenu'


function Content() {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const navElements = useSelector(state => state.settings.navElements)

    const subItems = []
    navElements.forEach(element => {
       if(element.sub){
           
        element.sub.forEach(el=> {
            if(el.route){
                subItems.push(el.route)
            }
            
        })
       }
       
    });

   

    return (
        <>
        {
            isSmallScreen && <SmallScreenMenu /> 
        }
        <Switch>

            {
                navElements.map(
                    (element, index) => <Route key={index} {...element.route} /> 
                )
            }
            {
                subItems.map(
                    (subroute, i)=> <Route key={i} {...subroute} />
                )
            }
           
             <Route component={ErrorPage} /> 


         </Switch>
         </>
    )
}

export default Content
