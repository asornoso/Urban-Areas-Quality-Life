import React, {useEffect, useRef, useState} from 'react'
import Chart from 'chart.js'

import '../styles/data.css'

//This component renders city related data passed in as props
//The component uses Google's chart.js to render a bar graph
//Receives 1 prop: data
//Data contains a list of categories and scores for which the city received
//Data contains the name of the city the data is for
//Data contains a written summary of the city
const DataResults = (props) => {
  const chartRef = useRef(null)
  const [chart, setChart] = useState({})

  //Create chart onMount
  useEffect( () => {

    let data = formatChartData(props.data)

    //Get context of canvas ref
    const context = chartRef.current.getContext('2d')
    let c = new Chart( context, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
           display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10
                },
            }]
        }
      }
    })
    setChart(c)
  }, [])

  //On props updating, update chart if chart exists
  useEffect( () => {
    if(Object.keys(chart).length !== 0){
      let data = formatChartData(props.data)
      chart.data = data
      chart.update()
    }
  }, [props.data])

  return (
    <div className='data-results'>
      <div className='header'> {props.data.name} </div>

      <div className='summary'>
        <div dangerouslySetInnerHTML={{__html: props.data.summary}}></div>
      </div>

      <div className='chart-wrapper'>
        <canvas id='chart' ref={chartRef}>  </canvas>
      </div>

    </div>
  )
}

const formatChartData = (input) => {
  const colors = [
    'rgba(229, 56, 53, 0.7)',
    'rgba(255, 235, 59, 0.7)',
    'rgba(67, 160, 72, 0.7)',
  ]
  let data = {
    labels: [],
    datasets: [{
      lineTension: 0,
      label: "Score out of 10",
      data: [],
      backgroundColor: []
    }]
  }

  if(input.categories){
    input.categories.forEach( (category, i) => {
      data.labels.push(category.name)
      data.datasets[0].data.push(category.score)
      data.datasets[0].backgroundColor.push(colors[Math.floor(category.score/4)])
    })
  }

  return data
}

export default DataResults
