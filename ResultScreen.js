import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ResultScreen = ({ questions, userAnswers, score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Your score: {score}/{questions.length}</Text>
      {questions.map((question, index) => {
        let isCorrect = question.answer === '' ? userAnswers[index]: question.answer === userAnswers[index];
        return (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.correctAnswer}>{isCorrect ? "" : `Correct:${question.answer}`}</Text>
            <Text style={isCorrect ? styles.correctAnswer : styles.incorrectAnswer}>
              {isCorrect ? `Correct: ${userAnswers[index]}` : `Incorrect: ${userAnswers[index]}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: '40%'
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctAnswer: {
    color: 'green',
    fontSize: 25,
  },
  incorrectAnswer: {
    color: 'red',
    textDecorationLine: 'line-through',
    fontSize: 25,
  },
});

export default ResultScreen;
