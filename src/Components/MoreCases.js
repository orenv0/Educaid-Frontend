import React, { Component } from 'react'
import CaseBox from './CaseBox'


class MoreCases extends Component{
    render(){
        const cases = [
            { i: 1,title:"טיפול בכוויות", image: '/images/burns.jpg'},
            { i: 2,title:"קיבוע שבר", image: '/images/lay.png'},
            { i: 3,title:"תגובה אלרגית (אנפילקסיס)", image: '/images/elergy.jpg'}
        ]
        return(
    <div className = "categoryPage">
                <h1>מקרים נוספים</h1>
                <p>בחר מקרה אותו תרצה ללמוד</p>
       <ul>
         {
          cases.map((box)=>
          <li key={box.i}> <CaseBox title={box.title} image= {box.image}/> </li>)
         }  
       </ul>
       
    </div>
        );
    }
} 

export default MoreCases