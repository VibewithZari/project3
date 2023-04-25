import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, Image, TouchableOpacity } from 'react-native';

export default function QuestionScreen({ questions, userAnswers, onAnswerChange, navigation  }) {
  const currentQuestion = questions[userAnswers.filter(Boolean).length];
  const [idValue, setIdValue]=useState(0)
  const [optionValue, setOptionValue]=useState("")
  const [renderQuestionContent, setRenderQuestionContent] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null);
  

  function handleAnswer() {
    // navigation.navigate('ResultScreen');
    
    const { id } = currentQuestion;
    console.log("handle answer", idValue, optionValue, id - 1, currentQuestion.userAnswer)
    //onAnswerChange(id - 1, currentQuestion.userAnswer);
    onAnswerChange(idValue, optionValue);
    console.log("app component", userAnswers.filter(Boolean).length)
    
    if (userAnswers.filter(Boolean).length === questions.length - 1) {
      navigation.navigate('ResultScreen');
    }else {
      setRenderQuestionContent(false); // set to false to hide current question content
      setTimeout(() => { // use setTimeout to delay rendering of next question
        setOptionValue("")
        setRenderQuestionContent(true); // set to true to show next question content
      }, 500); // delay for half a second
    }    
    
  }

  function onAnswerChangeSelected(id, option, index){
    console.log("id", id, "option", option, "index", index)
    setSelectedOption(index);
    setIdValue(id)
    setOptionValue(option)
    console.log("id", id)
  }

  function renderQuestion() {    
    switch (currentQuestion?.type) {
      case 'multipleChoice':
        return (
          <>
          <Image 
          source={currentQuestion?.image}
          style={{width: 250, height: 250}}
          />
          <Text style={styles.questionText}>{currentQuestion.questionNumber}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option, index) => (
              // <Button              
              //   key={index}
              //   title={option}
              //   onPress={() => onAnswerChange(currentQuestion.id - 1, option)}
              //   color={userAnswers[currentQuestion.id - 1] === option ? 'green' : '#fff'}
              // />
              <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index ? styles.selectedOptionButton : null,
              ]}
              // style={{ backgroundColor: 'blue', margin: 10, padding: 10, borderRadius: 5, width: 140 }}
              onPress={() => onAnswerChangeSelected(currentQuestion.id - 1, option, index)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: "center" }}>{option}</Text>
            </TouchableOpacity>
            ))}
          </>
        );
      case 'textInput':
        return (
          <>
          <Image 
          source={currentQuestion?.image}
          style={{width: 250, height: 250}}
          />
          <Text style={styles.questionText}>{currentQuestion.questionNumber}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => onAnswerChangeSelected(currentQuestion.id - 1, text, "index")}
              value={optionValue}
            />
          </>
        );
      case 'dropDown':
        return (
          <>
          <Image 
          source={currentQuestion?.image}
          style={{width: 250, height: 250}}
          />
          <Text style={styles.questionText}>{currentQuestion.questionNumber}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <Picker
              // selectedValue={userAnswers[currentQuestion.id - 1]}
              style={{width:"100px",height: "40px", margin: "10px"}}
              onValueChange={(itemValue) => onAnswerChangeSelected(currentQuestion.id - 1, itemValue, "index")}
            >
              {currentQuestion.options.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
              ))}
            </Picker>
          </>
        );
      case 'survey':
        return (
          <>
          <Image 
          source={currentQuestion?.image}
          style={{width: 250, height: 250}}
          />
          <Text style={styles.questionText}>{currentQuestion.questionNumber}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <Text style={styles.questionText}>{currentQuestion?.questionDescription}</Text>
            {currentQuestion.options.map((option, index) => (
              <View key={index} style={styles.surveyOption}>
                <Text>{option}</Text>
                <Button
                  title={userAnswers[currentQuestion.id - 1] === option ? 'Selected' : 'Select'}
                  onPress={() => onAnswerChangeSelected(currentQuestion.id - 1, option, index)}
                  color={index === selectedOption ? 'green' : 'blue'}
                  // style={[
                  //   styles.optionButton,
                  //   selectedOption === index ? styles.selectedOptionButton : null,
                  // ]}
                />
              </View>
            ))}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      {/* renderQuestion() ? renderQuestion(): navigation.navigate('ResultScreen') */}
      {renderQuestionContent && renderQuestion()}
       
      {renderQuestionContent && <Button title="Next" onPress={handleAnswer} disabled={false}  />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 40,
    marginBottom: 20,    
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 20
  },
  surveyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: 'orange',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    width: 140,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOptionButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
    
  },
  optionText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#fff',
  }
});
