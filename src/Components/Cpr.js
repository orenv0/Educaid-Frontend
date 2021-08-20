import React, { Component } from 'react'
import CaseBox from './CaseBox'


class Cpr extends Component {

    render() {
        const cases = [
            { i: 1, title: "חנק - תינוקות", image: '/images/gordon_hits.jpg' },
            { i: 2, title: "חנק - מבוגרים", image: '/images/Heimlich.jpg' },
            { i: 3, title: "החייאה - תינוקות", image: '/images/cpr_baby.jpg' },
            { i: 4, title: "החייאה - מבוגרים", image: '/images/cpr_adult.jpg' }
        ]
        return (
            <div className="categoryPage">
                <h1>החייאות וחנק</h1>
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

export default Cpr