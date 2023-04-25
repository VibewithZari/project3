import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import QuestionScreen from './QuestionScreen';
import ResultScreen from './ResultScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const questions = [
    {
      id: 1,
      type: 'multipleChoice',
      image: require('./assets/images/paris.jpeg'),
      question: 'What is the capital of France?',
      questionNumber: 'Question 1/4',
      options: ['Paris', 'Madrid', 'Rome', 'Berlin'],
      answer: 'Paris',
      userAnswer: '',
    },
    {
      id: 2,
      type: 'textInput',
      image: require('./assets/images/mathematics.jpeg'),      
      question: 'What is sum of  numbers 5 + 3?',
      questionNumber: 'Question 2/4',
      answer: '8',
      userAnswer: '',
    },
    {
      id: 3,
      type: 'dropDown',
      image: require('./assets/images/ocean.jpg'),
      question: 'What is the largest ocean in the world?',
      questionNumber: 'Question 3/4',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      answer: 'Pacific',
      userAnswer: '',
    },    
    {
      id: 4,
      type: 'survey',
      image: require('./assets/images/exercise.jpg'),
      questionNumber: 'Question 4/4',
      question: 'How much do you enjoy exercising ?',
      questionDescription: 'On a scale from 1 to 5 where 1 is the highest and 5 is the lowest',
      options: ['1', '2', '3', '4', '5'],
      answer: '',
      userAnswer: '',
    },
  ];

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));  

  function handleAnswerChange(index, answer) {    
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
    console.log("user answer",  userAnswers, userAnswers.length, index);
    // if(index===3){
    //   navigation.navigate('ResultScreen');
    // }
    // setRenderQuestionContent(true)
  }

  function calculateScore() {
    let score = 1;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  }

  return (
   
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{title: 'Welcome'}}
        />
      <Stack.Screen name="QuestionScreen">
           {(props) => (
             <QuestionScreen
               {...props}
               questions={questions}
               userAnswers={userAnswers}               
               onAnswerChange={handleAnswerChange}
             />
           )}
         </Stack.Screen>
          <Stack.Screen name="ResultScreen">
           {(props) => (
             <ResultScreen
               {...props}
               questions={questions}
               userAnswers={userAnswers}
               score={calculateScore()}
             />
           )}
         </Stack.Screen> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}