import React, { Component } from 'react'
import CaseBox from './CaseBox'


class Climate extends Component {
    render() {
        const cases = [
            { i: 1, title: "התייבשות", image: '/images/dehydration.png' },
            { i: 2, title: "מכת חום", image: '/images/heat.jpg' },
            { i: 3, title: "היפותרמיה (מכת קור)", image: '/images/cold.jpeg' },
            { i: 4, title: "כוויות קור", image: '/images/coldhit.jpg' }
        ]
        return (
            <div className="categoryPage">
                <h1>פגיעות אקלים</h1>
                <p>בחר מקרה אותו תרצה ללמוד</p>
                <ul>
                    {
                        cases.map((box) =>
                            <li key={box.i}> <CaseBox title={box.title} image={box.image} /> </li>)
                    }
                </ul>

            </div>
        );
    }
}

export default Climate