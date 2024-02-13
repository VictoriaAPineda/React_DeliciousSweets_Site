import React from 'react'

export default function DropdownMenu(){
    return(
        <div className='dropdown-container'>
            <div className='dropdown-trigger'>
                <div className='dropdown-menu'>
                    <ul>
                        <DropdownItem itemText = {'Option1.txt'}/>
                        <DropdownItem itemText = {'Option2.txt'}/>
                        <DropdownItem itemText = {'Option3.txt'}/>
                        <DropdownItem itemText = {'Option4.txt'}/>
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