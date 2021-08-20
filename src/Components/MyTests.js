import React, { Component } from 'react'
import RecordService from '../Services/RecordService'
import QuestionService from '../Services/QuestionService'
import Modal from 'react-modal'
import { withAuth0 } from '@auth0/auth0-react'

class MyTests extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            recordCategory: "",
            recordDate: "",
            recordAnswers: [],
            recordScore: 0,
            recordIndex: 0,
            page: 0,
            reset: false,
            nextPageExists: false,
            date: "all",
            category: "all",
            sortBy: "createdTimestamp",
            sortOrder: "ASC",
            questions: [],
            records: []

        }
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeOrder = this.handleChangeOrder.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);

    }

    setmodalIsOpen(param) {
        this.setState({
            modalIsOpen: param
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps === this.props && nextState === this.state)
            return false;
        return true;

    }

    componentDidMount() {
        const { user } = this.props.auth0;
        RecordService.getAllTestRecordsByUser(user.email, this.state.page, 'createdTimestamp', 'ASC').then((res) => {
            this.setState({ records: res.data })

        });
        RecordService.getAllTestRecordsByUserAndSize(user.email, this.state.page * 10 + 10, 1, 'createdTimestamp', 'ASC').then((res) => {
            this.setState({ nextPageExists: res.data.length > 0 })

        });
    }

    openTest(recordAnswers, recordCategory, recordDate, recordScore, recordIndex) {
        let i = 0;
        let questionsArr = []
        let splitedArr = []
        let questionsIds = []
        let qaPair = []
        let promises = []
        this.state.questions.splice(0, this.state.questions.length)
        for (i = 0; i < recordAnswers.length; i++) {
            qaPair = recordAnswers[i].match(/[a-zA-Z]+|[0-9]+/g)
            splitedArr = splitedArr.concat(qaPair);

        }
        questionsIds = splitedArr.filter(el => !isNaN(el))
        questionsIds = questionsIds.map(qid => parseInt(qid))

        for (i = 0; i < questionsIds.length; i++) {
            promises.push(
                QuestionService.getSpecificQuestion(questionsIds[i]).then(res => {
                    questionsArr.push(res.data);
                })
            )

        }
        this.setState({ recordAnswers: recordAnswers })
        this.setState({ recordScore: recordScore })
        this.setState({ recordCategory: recordCategory })
        this.setState({ recordDate: recordDate })
        this.setState({ recordIndex: recordIndex })
        this.setmodalIsOpen(true)
        Promise.all(promises).then(() => this.setState({ questions: questionsArr }));
    }

    isInsideUserAnswers(answerId) {
        let i = 0;
        for (i = 0; i < this.state.recordAnswers.length; i++) {
            if (this.state.recordAnswers[i] === answerId)
                return true
        }
        return false
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
        this.showResults(1, 1)
    }
    previousPage() {
        this.setState({ page: this.state.page - 1 })
        this.showResults(1, -1)
    }
    callResults() {
        this.setState({ page: 0 })
        this.showResults(0, 0)
    }
    showResults(resetFactor = 1, pageFactor = 0) {

        const { user } = this.props.auth0;
        if (this.state.date === "all" && this.state.category === "all") {
            RecordService.getAllTestRecordsByUser(user.email, resetFactor * (this.state.page + pageFactor), this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ records: res.data })

            });
            RecordService.getAllTestRecordsByUserAndSize(user.email, resetFactor * (this.state.page + pageFactor) * 10 + 10, 1, this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ nextPageExists: res.data.length > 0 })

            });
        }
        else if (this.state.date === "all" && this.state.category !== "all") {
            RecordService.getAllTestRecordsByUserAndCategory(user.email, this.state.category, resetFactor * (this.state.page + pageFactor), this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ records: res.data })

            });
            RecordService.getAllTestRecordsByUserAndCategoryAndSize(user.email, this.state.category, resetFactor * (this.state.page + pageFactor) * 10 + 10, 1, this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ nextPageExists: res.data.length > 0 })


            });

        } else if (this.state.date !== "all" && this.state.category === "all") {
            RecordService.getAllTestRecordsByUserAndTime(user.email, this.state.date, resetFactor * (this.state.page + pageFactor), this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ records: res.data })

            });
            RecordService.getAllTestRecordsByUserAndTimeAndSize(user.email, this.state.date, resetFactor * (this.state.page + pageFactor) * 10 + 10, 1, this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ nextPageExists: res.data.length > 0 })


            });
        } else {
            RecordService.getAllTestRecordsByUserAndCategoryAndTime(user.email, this.state.category, this.state.date, resetFactor * (this.state.page + pageFactor), this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ records: res.data })

            });
            RecordService.getAllTestRecordsByUserAndCategoryAndTimeAndSize(user.email, this.state.category, this.state.date, resetFactor * (this.state.page + pageFactor) * 10 + 10, 1, this.state.sortBy, this.state.sortOrder).then((res) => {
                this.setState({ nextPageExists: res.data.length > 0 })


            });
        }

    }
    parseDate(date) {
        var fixDate = date.substring(8, 10) + '/' + date.substring(5, 7) + '/' + date.substring(0, 4);
        return fixDate;
    }
    parseTime(date) {
        var fixTime = date.substring(11, 13) + ':' + date.substring(14, 16);
        return fixTime;
    }

    handleChangeDate(e) {
        this.setState({ date: e.target.value });

    }
    handleChangeCategory(e) {
        this.setState({ category: e.target.value });

    }
    handleChangeOrder(e) {
        this.setState({ sortOrder: e.target.value });

    }
    handleChangeField(e) {
        this.setState({ sortBy: e.target.value });

    }
    render() {
        let resultsTable;
        let pagingButtons;
        if (this.state.page === 0 && this.state.nextPageExists) {

            pagingButtons = <div className="pagingButtons">
                <img className="pagingButtonImage" src={process.env.PUBLIC_URL + '/images/next.png'} alt="next" width="25" height="15" onClick={() => this.nextPage()} /> <b>הבא</b>
            </div>
        }

        else if (this.state.page > 0 && !this.state.nextPageExists) {
            pagingButtons = <div className="pagingButtons">
                <b>הקודם</b> <img className="pagingButtonImage" src={process.env.PUBLIC_URL + '/images/previous.png'} alt="next" width="25" height="15" onClick={() => this.previousPage()} />

            </div>
        }
        else if (this.state.page > 0 && this.state.nextPageExists) {
            pagingButtons = <div className="pagingButtons">
                <img className="pagingButtonImage" src={process.env.PUBLIC_URL + '/images/previous.png'} alt="next" width="25" height="15" onClick={() => this.previousPage()} /> <b>הבא</b>
                <b>   הקודם   </b><img className="pagingButtonImage" src={process.env.PUBLIC_URL + '/images/next.png'} alt="next" width="25" height="15" onClick={() => this.nextPage()} />
            </div>
        } else {
            pagingButtons = <div>

            </div>
        }


        if (this.state.records.length === 0) {
            resultsTable = <div>
                <p>...לא קיימים מבחנים בחשבונך</p>

            </div>
        } else {
            resultsTable = <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>תאריך</th>
                            <th>ציון</th>
                            <th>קטגוריה</th>
                            <th>מספר מבחן</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.records.map((record, index) =>
                                <tr key={index}>
                                    <td><button className="greyButton" onClick={() => this.openTest(record.userAnswers, record.category, record.createdTimestamp, record.score, this.state.page * 10 + index + 1)}>לפתיחה</button></td>
                                    <td>{this.parseDate(record.createdTimestamp)}</td>
                                    <td>{record.score}</td>
                                    <td>{record.category}</td>
                                    <th>{this.state.page * 10 + index + 1}</th>
                                </tr>)

                        }
                    </tbody>
                </table>

            </div>
        }
        return (
            <div className="myTests">
                <h1>המבחנים שלי</h1>
                <p>בדף זה תוכל למצוא את כל המבחנים שכבר עשית ולעיין בהם</p>
                <div className="settingTable">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="categoryList" onChange={this.handleChangeCategory}>
                                        <option value="all" defaultValue>כל הקטגוריות</option>
                                        <option value="החייאות וחנק">החייאות וחנק</option>
                                        <option value="פגיעות בעלי חיים">פגיעות בעלי חיים</option>
                                        <option value="פגיעות אקלים">פגיעות אקלים</option>
                                        <option value="עצירת דימומים וחבישות">עצירת דימומים וחבישות</option>
                                    </select>
                                    <label>&nbsp;:קטגוריה</label>
                                </td>
                                <td>
                                    <select name="dateList" onChange={this.handleChangeDate} >
                                        <option value="all" defaultValue>כל התאריכים</option>
                                        <option value="lastday">מאתמול</option>
                                        <option value="lastweek">מהשבוע האחרון</option>
                                        <option value="lastmonth">מהחודש האחרון</option>
                                    </select>
                                    <label> &nbsp; :תאריך</label>
                                </td>
                                <th>סינון לפי</th>
                            </tr>
                            <tr>
                                <td>
                                    <select name="orderList" onChange={this.handleChangeOrder}>
                                        <option value="ASC" defaultValue>עולה</option>
                                        <option value="DESC">יורד</option>
                                    </select>
                                    <label>&nbsp;:בסדר</label>
                                </td>
                                <td>
                                    <select name="fieldList" onChange={this.handleChangeField}>
                                        <option value="createdTimestamp" defaultValue>תאריך</option>
                                        <option value="score">ציון</option>
                                    </select>
                                    <label>&nbsp;:שדה</label>
                                </td>
                                <th>מיון לפי</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br />
                <button className="blueButton" onClick={() => this.callResults()}>הצג תוצאות</button>
                <hr width='70%' />
                {resultsTable}
                {pagingButtons}
                <div>
                    <Modal isOpen={this.state.modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={() => this.setmodalIsOpen(false)}
                        style={
                            {
                                overlay: {
                                    backgroundColor: 'transparent'
                                },
                                content: {
                                    borderRadius: '60px'
                                }
                            }
                        }>
                        <div className="recordModal">
                            <img className="xclose" onClick={() => this.setmodalIsOpen(false)} src={process.env.PUBLIC_URL + '/images/close.png'} alt="logo" width="20" height="20"></img>
                            <h1>מבחן ב{this.state.recordCategory} - {this.state.recordIndex}</h1>
                            <div className="recordModalDetails">
                                <ul>
                                    <li><b>תאריך:</b> {this.parseDate(this.state.recordDate)}</li>
                                    <li><b>שעה:</b> {this.parseTime(this.state.recordDate)}</li>
                                    <li><b>ציון:</b> {this.state.recordScore}</li>
                                </ul>
                            </div>
                            <ol>
                                {
                                    this.state.questions.map((q) => <li key={q.id}>{q.text}
                                        <ol type="I">
                                            {
                                                q.answers.map((a) => {
                                                    if (a.correct && !this.isInsideUserAnswers(a.id))
                                                        return <li key={a.id}><span style={{ color: "green" }}><b>{a.text}</b></span></li>
                                                    else if (a.correct && this.isInsideUserAnswers(a.id))
                                                        return <li key={a.id}><span style={{ color: "green" }}><b>{a.text}</b></span></li>
                                                    else if (!a.correct && this.isInsideUserAnswers(a.id))
                                                        return <li key={a.id}><span style={{ color: "red" }}><b>{a.text}</b></span></li>
                                                    else
                                                        return <li key={a.id}>{a.text}</li>
                                                })

                                            }
                                        </ol>
                                        <hr />
                                    </li>
                                    )
                                }
                            </ol>

                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default withAuth0(MyTests)