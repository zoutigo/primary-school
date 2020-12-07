import React from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {useTheme} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {Switch, Route} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import SmallScreenMenu from './SmallScreenMenu'
import HeadModules from './HeadModules';


function Content() {
    const {pathname} = useLocation()
    const exception = pathname === '/'
  
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const rubrics = useSelector(state => state.settings.rubrics)
    const burgerMenuIsOpened = useSelector(state => state.burgerMenuIsOpened)

    const subItems = []
    rubrics.forEach(element => {
       if(element.categories){
           
        element.categories.forEach(el=> {
            if(el.route){
                subItems.push(el.route)
            }
            
        })
       }
       
    });


    return (
        <div style={{maxWidth:'100vw' }}>
                
                    {
                       !exception && <HeadModules />
                    }
                
            
                    {
                        isSmallScreen  && <SmallScreenMenu /> 
                    }
                   
                   
                 <Switch>
                    {
                        rubrics.map(
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
               
         </div>
    )
}

export default Content
