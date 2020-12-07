import React from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import {useTheme} from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {Switch, Route} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import SmallScreenMenu from './SmallScreenMenu'
import HeadModules from './HeadModules';
import { toogleSmallScreenMenu } from '../../redux/settings/settingsActions';
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow';


function Content(props) {
    const {toogleContentClass} = props
    const {pathname} = useLocation()
    const exception = pathname === '/'
  
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const rubrics = useSelector(state => state.settings.rubrics)
    const burgerMenuIsOpened = useSelector(state => state.burgerMenuIsOpened)

    console.log('class:', toogleContentClass)

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
     
        <div className={toogleContentClass} >
                
             
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

export default SmallScreenToogleShow(Content) 
