import React, { Component } from 'react'
import CaseBox from './CaseBox'

class Animals extends Component {
    render() {
        const cases = [
            { i: 1, title: "הכשת נחש", image: '/images/snake.jpg' },
            { i: 2, title: "עקיצת דבורה", image: '/images/bee.jpg' },
            { i: 3, title: "נשיכת כלב", image: '/images/dog.jpg' }

        ]
        return (
            <div className="categoryPage">
                <h1>פגיעות בעלי חיים</h1>
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

export default Animals