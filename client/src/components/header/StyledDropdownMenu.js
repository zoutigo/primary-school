import React from 'react'
import './DropDownMenu.css'
import styled from 'styled-components/macro';

const Parent = styled.li`
display: block;
position: relative;
float: left;
line-height: 30px;
background-color: #4FA0D8;
border-right:#CCC 1px solid;
& a:{
    margin: 10px;color: #FFFFFF;text-decoration: none;
};
&:hover > ul {display:block;position:absolute;};
& li:hover {background-color: #F0F0F0;}

`

const Child = styled.ul`
display: 'none';
`
// & li: {background-color: #E4EFF7;line-height: 30px;border-bottom:#CCC 1px solid;border-right:#CCC 1px solid; width:100%;};
// & li a: {color: #000000;};

const Root = styled.div`
list-style: none;margin: 0;padding: 0px; min-width:10em;
& >ul ul ul{left: 100%;top: 0;margin-left:1px;};
& li:hover {background-color: #95B4CA;}
`
const Expand = styled.span`
font-size:12px;float:right;margin-right:5px;
`

function StyledDropdownMenu() {
    return (
        
            <Root >
    
                    <ul id="menu" >
                        <Parent> <a href="#">Popular Toys</a> 
                            <Child>
                            <li className='parent'><a href="#">Video Games <span class="expand">»</span></a>
                                <Child>
                                <li><a href="#">Car</a></li>
                                <li><a href="#">Bike Race</a></li>
                                <li><a href="#">Fishing</a></li>
                                </Child>
                            </li>
                            <li><a href="#">Barbies</a></li>
                            <li><a href="#">Teddy Bear</a></li>
                            <li><a href="#">Golf Set</a></li>
                            </Child>
                        </Parent>
                        <Parent><a href="#">Recent Toys</a>
                        <Child>	
                            <li><a href="#">Yoyo</a></li>
                            <li><a href="#">Doctor Kit</a></li>
                            <li className='parent'><a href="#">Fun Puzzle<span class="expand">»</span></a>
                                <Child>
                                <li><a href="#" nowrap>Cards</a></li>
                                <li><a href="#" nowrap>Numbers</a></li>
                                </Child>
                            </li>
                            <li><a href="#">Uno Cards</a></li>
                        </Child>	
                        </Parent>
                       <Parent><a href="#">Toys Category</a>
                        <Child>	
                            <li><a href="#">Battery Toys</a></li>
                            <li class="parent"><a href="#">Remote Toys <span class="expand">»</span></a>
                                <Child>
                                <li><a href="#">Cars</a></li>
                                <li><a href="#">Aeroplane</a></li>
                                <li><a href="#">Helicopter</a></li>
                                </Child>
                            </li>
                            <li><a href="#">Soft Toys</a>
                            </li>
                            <li><a href="#">Magnet Toys</a></li>
                            </Child>	
                        </Parent>
                    </ul>
                    
            </Root>
        
    )
}

export default StyledDropdownMenu
