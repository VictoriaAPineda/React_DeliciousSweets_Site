import React from 'react'

export default function DropdownMenu(){
    return(
        <div className='dropdown-container'>
            <div className='dropdown-trigger'>
                <div className='dropdown-menu'>
                    <ul>
                        <DropdownItem itemText = {'Option1'}/>
                        <DropdownItem itemText = {'Option2'}/>
                        <DropdownItem itemText = {'Option3'}/>
                        <DropdownItem itemText = {'Option4'}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}
function DropdownItem({itemText}){
    return(
        <li className='dropdown-item'>
            <a>{itemText}</a>
        </li>
    );
}