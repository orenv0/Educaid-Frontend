import React, { Component } from 'react'
import CaseBox from './CaseBox'


class Dressings extends Component {
    render() {

        const cases = [
            { i: 1, title: "ח.ע רוסי", image: '/images/russian.jpg' },
            { i: 2, title: "ח.ע גומי", image: '/images/gumi.jpg' },
            { i: 3, title: "חבישת ראש", image: '/images/head_dressing.jpg' },
            { i: 4, title: "חבישת אצבע", image: '/images/finger.jpg' },
            { i: 5, title: "חבישת גפיים", image: '/images/armdressing.jpg' }
        ]
        return (
            <div className="categoryPage">
                <h1>עצירת דימומים וחבישות</h1>
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

export default Dressings