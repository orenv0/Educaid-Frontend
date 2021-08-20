import React, { Component } from 'react'
import TestBox from "./TestBox"


class TestsPage extends Component {
    render() {
        const tests = [
            { i: 1, title: "פגיעות אקלים", image: '/images/dehydration.png' },
            { i: 2, title: "עצירת דימומים וחבישות", image: '/images/head_dressing.jpg' },
            { i: 3, title: "פגיעות בעלי חיים", image: '/images/snake.jpg' },
            { i: 4, title: "החייאות וחנק", image: '/images/cpr_adult.jpg' }
        ]
        return (
            <div className="testsPage">
                <h1>תרגול מבחנים</h1>
                <p>בחר קטגוריה עליה תרצה להיבחן</p>
                <ul>
                    {
                        tests.map((box) =>
                            <li key={box.i}> <TestBox title={box.title} image={box.image} /> </li>)
                    }
                </ul>
            </div>
        )
    }
}
export default TestsPage