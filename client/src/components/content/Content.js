import React from 'react'
import {useSelector} from 'react-redux'

import {Switch, Route} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import SmallScreenToogleShow from './HighOrderComponents/SmallScreenToogleShow';


function Content(props) {
    const {toogleContentClass} = props
  
    const rubrics = useSelector(state => state.settings.rubrics)

    const allCategories = []
    rubrics.forEach(element => {
       if(element.categories){
           
        element.categories.forEach(el=> {
            if(el.route){
                allCategories.push(el.route)
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
                        allCategories.map(
                            (subroute, i)=> <Route key={i} {...subroute} />
                        )
                    }
                    <Route component={ErrorPage} /> 

                </Switch> 
               
         </div>
    )
}

export default SmallScreenToogleShow(Content) 
