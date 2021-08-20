import React, { Component } from 'react'
import RecordService from '../Services/RecordService'
import { withAuth0 } from '@auth0/auth0-react'
import Graph from './Graph'

class Statistics extends Component {
    constructor() {
        super()
        this.state = {
            category: "שקלול של כולן ביחד",
            numberOfTests: 0,
            average: 0,
            highestScore: 0,
            lowestScore: 0,
            error: false

        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);


    }

    componentDidMount() {
        const { user } = this.props.auth0;
        this.findLowestScore("all", user.email)
        this.findHighestScore("all", user.email)
        this.countTestRecords("all", user.email)
        this.findAverage("all", user.email)


    }

    handleChangeCategory(e) {
        let category = e.target.value;
        const { user } = this.props.auth0;
        if (category === "all")
            this.setState({ category: "שקלול של כולן ביחד" });
        else
            this.setState({ category: category });

        this.findLowestScore(category, user.email)
        this.findHighestScore(category, user.email)
        this.countTestRecords(category, user.email)
        this.findAverage(category, user.email)

    }

    findLowestScore(category, userEmail) {
        if (category === "all")
            RecordService.getStatisticsByUser("min", userEmail).then((res) => {
                this.setState({ lowestScore: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
        else
            RecordService.getStatisticsByCategoryAndUser("min", category, userEmail).then((res) => {
                this.setState({ lowestScore: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });

    }
    findHighestScore(category, userEmail) {
        if (category === "all")
            RecordService.getStatisticsByUser("max", userEmail).then((res) => {
                this.setState({ highestScore: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
        else
            RecordService.getStatisticsByCategoryAndUser("max", category, userEmail).then((res) => {
                this.setState({ highestScore: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
    }
    countTestRecords(category, userEmail) {
        if (category === "all")
            RecordService.getStatisticsByUser("count", userEmail).then((res) => {
                this.setState({ numberOfTests: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
        else
            RecordService.getStatisticsByCategoryAndUser("count", category, userEmail).then((res) => {
                this.setState({ numberOfTests: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
    }
    findAverage(category, userEmail) {
        if (category === "all")
            RecordService.getStatisticsByUser("average", userEmail).then((res) => {
                this.setState({ average: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
        else
            RecordService.getStatisticsByCategoryAndUser("average", category, userEmail).then((res) => {
                this.setState({ average: res.data })
                this.setState({ error: false })
            }).catch((error) => {
                if (error.response) {
                    this.setState({ error: true })
                }
            });
    }



    render() {
        const { user } = this.props.auth0;
        let statisticResults;
        let graphDiv;
        if (this.state.error) {
            statisticResults = <div className="statisticResults">
                <p>לא קיימים נתונים סטטיסטיים עבור הקטגוריה הרצויה</p>
            </div>
        } else {

            statisticResults = <div className="statisticResults">
                <h3>{this.state.category}</h3>
                <ul>
                    <li>מספר המבחנים שנעשו: <b>{this.state.numberOfTests}</b> </li>
                    <li>ממוצע: <b>{this.state.average}</b></li>
                    <li>הציון הגבוה ביותר: <b>{this.state.highestScore}</b></li>
                    <li>הציון הנמוך ביותר: <b>{this.state.lowestScore}</b></li>
                </ul>

            </div>
            graphDiv = <Graph userEmail={user.email} category={this.state.category} />
        }
        return (
            <div>
                <h1>סטטיסטיקה</h1>
                <p>כאן תוכל למצוא נתונים סטטיסטיים אודות המבחנים שלך בקטגוריות השונות</p>
                <select name="categoryList" onChange={this.handleChangeCategory}>
                    <option value="all" defaultValue>שקלול של כולן ביחד</option>
                    <option value="החייאות וחנק">החייאות וחנק</option>
                    <option value="פגיעות בעלי חיים">פגיעות בעלי חיים</option>
                    <option value="פגיעות אקלים">פגיעות אקלים</option>
                    <option value="עצירת דימומים וחבישות">עצירת דימומים וחבישות</option>
                </select>
                <label>&nbsp;:בחר קטגוריה בה תרצה לצפות</label>
                <hr width='70%' />
                {statisticResults}
                {graphDiv}
            </div>
        )
    }
}
export default withAuth0(Statistics)