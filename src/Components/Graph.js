import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import RecordService from '../Services/RecordService'


const Graph = (props) => {
    const [chartData, setChartData] = useState({});


    const chart = useCallback(() => {
        let graphLab = [];
        let graphData = [];
        if (props.category === "שקלול של כולן ביחד") {
            RecordService.getAllTestRecordsByUser(props.userEmail, 0, 'createdTimestamp', 'DESC')
                .then(res => {
                    for (const dataObj of res.data) {
                        graphLab.unshift(dataObj.createdTimestamp.split('T')[0]);
                        graphData.unshift(dataObj.score);
                    }
                    setChartData({
                        labels: graphLab,
                        datasets: [
                            {
                                label: "עשרת המבחנים האחרונים לפי תאריך",
                                data: graphData,
                                backgroundColor: "rgba(100, 8, 8)",
                                borderColor: 'rgb(0, 0, 0)',
                                borderWidth: 1
                            }
                        ]
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            RecordService.getAllTestRecordsByUserAndCategory(props.userEmail, props.category, 0, 'createdTimestamp', 'DESC')
                .then(res => {
                    for (const dataObj of res.data) {
                        graphLab.unshift(dataObj.createdTimestamp.split('T')[0]);
                        graphData.unshift(dataObj.score);
                    }
                    setChartData({
                        labels: graphLab,
                        datasets: [
                            {
                                label: "עשרת המבחנים האחרונים",
                                data: graphData,
                                backgroundColor: "rgba(100, 8, 8)",
                                borderColor: 'rgb(0, 0, 0)',
                                borderWidth: 1
                            }
                        ]
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [props]);

    useEffect(() => {
        chart();
    }, [chart]);
    return (

        <div className="graph" >
            <Line data={chartData} />
        </div>

    );
};

export default Graph;