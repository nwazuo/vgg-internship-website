import React, { useState } from "react";
import Image from "./images/intro-img.png";
import CloseBtn from "./images/close-icon.png"
import "./SurveyPage.css";
import { Link } from "react-router-dom";
import { Questions } from './surveyquestions'

export default function SurveyPage() {
const Point = 2
const [firstChoice, setFirstChoice] = useState("")
const [secondChoice, setSecondChoice] = useState("")
const [frontend, setFrontend] = useState(0)
const [backend, setBackend] = useState(0)
const [uiux, setUiux] = useState(0)
const [qa, setQa] = useState(0)
const [point, setPoint] = useState(0)

const [showScore, setShowScore] = useState(false)
const [questionIndex, setquestionIndex] = useState(0) 
let currentQuestion = Questions[questionIndex]
let currentAnswers = currentQuestion.answers
let questionText = currentQuestion.question
let firstButton = currentAnswers[0].answer
let secondButton = currentAnswers[1].answer
let thirdButton = currentAnswers[2].answer

const handleClick = (event) => {
    const Value = event.target.value
    givePoints(questionIndex, Value)
    if (questionIndex < Questions.length - 1) {
        setquestionIndex(prevIndex => prevIndex + 1)
    } else {
        setShowScore(true)
        const scores = [frontend, backend, uiux, qa]
        const Labels = ["Frontend Development", "Backend Development", "UI/UX Design", "Software Quality Assurance"]
        getFirstChoice(scores, Labels)
        
        
    }
}
const getFirstChoice = (arr, Labels) => {
    const Max = Math.max.apply(null,arr)
    const maxIndex = arr.indexOf(Max)
    setFirstChoice(Labels[maxIndex])

    Labels.splice(maxIndex, 1)
    arr.splice(maxIndex, 1)
    getSecondChoice(arr, Labels)
}

const getSecondChoice = (arr, Labels) => {
    const Max = Math.max.apply(null,arr)
    const maxIndex = arr.indexOf(Max)
    setSecondChoice(Labels[maxIndex])
}

const givePoints = (questionIndex, Value) => {
    const answers = Questions[questionIndex].answers
    answers.forEach(Answer => {
        if (Value === Answer.answer) {
            const trackList = Answer.track
            trackList.forEach(track => {
                track === "frontend" ? setFrontend(prevScore => prevScore + Point) :
                track === "backend" ? setBackend(prevScore => prevScore + Point) :
                track === "uiux" ? setUiux(prevScore => prevScore + Point) :
                track === "qa" ? setQa(prevScore => prevScore + Point) :
                setPoint(prevScore => prevScore + 0)
            });
        }
    });
}

  return(
    <div className="survey-page-container" >
      <div className="survey-page-body">
        
        <div className="survey-intro">
          <div className="intro-layer">
            <div className="intro-container">
              <div className="img-container">
                <div>
                  <img alt="vgg-img" src={Image}></img>
                </div>
              </div>
              <div className="intro-text">
                <div className="close-btn" style={{marginBottom: "20px", padding: "10px", fontSize: "18px"}}>
                  <Link to="/registration-form"><img alt="close-btn" src={CloseBtn} style={{width: "30px", height: "30px"}}/></Link>
                </div>
                <span className="span-1">Survey</span>
                <span className="span-2">Questionnaire</span>
              </div>
            </div>
          </div>
        </div>
        <div className="survey-question">
          {showScore? 
          <div className="result">
            <div>
            <div className="pb-3" style={{borderBottom: "1px solid #228B22"}}><span className="question" style={{fontWeight: "bolder", fontSize: "larger"}}>OUR RECOMMENDATION</span></div>
            <div className="question result-text" >
              Based on your survey result, We Advise that you go for <span style={{fontWeight: "bolder", color: "#228B22"}}>{firstChoice}</span>, or pick the second option of <span style={{fontWeight: "bolder", color: "#228B22"}}>{secondChoice}</span>
              <div className="mt-3" style={{borderRadius: "10px"}}><img src="https://cdn1.vc4a.com/media/2016/08/Schermafbeelding-2018-05-24-om-12.28.11-1280x300.png" alt="venture garden group" style={{width: "100%", height: "100%", borderRadius: "10px"}}/></div>
            </div> 
            </div>
          </div>
          : 
          <div className="question-container">
            <div className="px-2" style={{fontSize: "17px", fontWeight: "bolder"}}>
              Help us get to know you, pick the option that best describes your interests and personality.
            </div>
            <div className="question">{questionText}</div>
            <div className="button-container">
              <button type="button" className="option-btn" value={firstButton} onClick={handleClick}>{firstButton}</button>
              <button type="button" className="option-btn" value={secondButton} onClick={handleClick}>{secondButton}</button>
              <button type="button" className="option-btn" value={thirdButton} onClick={handleClick}>{thirdButton}</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
