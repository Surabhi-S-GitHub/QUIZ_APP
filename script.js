const startButton=document.getElementById('start-id');
const questionContainerElement=document.getElementById('question-container');
const questionElement=document.getElementById('question');
const answerButtonElement=document.getElementById('answer-btn');
const nextButton=document.getElementById('next-id');
let SuffleQuestions, currQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click',()=>{
    currQuestionIndex++
    NextSetQuestion()
})


function startGame(){
  console.log("Game started")
  startButton.classList.add('hide')
  SuffleQuestions=questions.sort(()=> Math.random() - .5)
  currQuestionIndex=0;
  questionContainerElement.classList.remove('hide')
  NextSetQuestion()
}

function NextSetQuestion(){
  resetState()
  showQuestion(SuffleQuestions[currQuestionIndex])
}

function showQuestion(question){
  questionElement.innerHTML=question.question
  question.answers.forEach(answer=> {
  const button=document.createElement('button')
  button.innerText=answer.text
  button.classList.add('btn')
  if(answer.correct)
  {
    button.dataset.correct=answer.correct
  }
  button.addEventListener('click',selectAnswer)
  answerButtonElement.appendChild(button)
  });
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonElement.firstChild){
      answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
  const selectedButton=e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body,correct)
  Array.from(answerButtonElement.children).forEach(button=>{
    setStatusClass(button,button.dataset.correct)
  })
  if(SuffleQuestions.length>currQuestionIndex+1){
    nextButton.classList.remove('hide')
  }
  else{
    startButton.innerText="Restart"
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element)
{
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


const questions=[
    {
        question: 'What is the summation of 0000+1101?',
        answers: [
            {text:'1101',correct:true},
            {text:'0001',correct:false}
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
          { text: 'Web Dev Simplified', correct: true },
          { text: 'Traversy Media', correct: true },
          { text: 'Dev Ed', correct: true },
          { text: 'Fun Fun Function', correct: true }
        ]
      },
      {
        question: 'Is web development fun?',
        answers: [
          { text: 'Kinda', correct: false },
          { text: 'YES!!!', correct: true },
          { text: 'Um no', correct: false },
          { text: 'IDK', correct: false }
        ]
      },
      {
        question: 'What is 4 * 2?',
        answers: [
          { text: '6', correct: false },
          { text: '8', correct: true }
        ]
      },
      {
        question: 'What is 2 + 2?',
        answers: [
          { text: '4', correct: true },
          { text: '22', correct: false }
        ]
      }
]

