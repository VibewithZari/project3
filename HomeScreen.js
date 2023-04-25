import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {
    let image = require('./assets/images/home.jpeg');
    return (
        <>
        <Text style={styles.headerText}>Welcome To Quiz</Text>
        <Image
        source={image}
        style={{width: '100%', height: 250}} 
        />
         <TouchableOpacity      
        style={styles.navigateButton}
        onPress={() =>
          navigation.navigate('QuestionScreen')
        }
      > 
      <Text style={styles.buttonText}>LEVEL I: RANDOM</Text>
      
      </TouchableOpacity>
        </>
      
    );
  };

  const styles = StyleSheet.create({
    headerText: {        
        fontSize: 25,
        textAlign: 'center',
        padding: 40,        
        // backgroundColor: '#009688',
        // color: 'white',
        marginBottom: 10,    
      },
      navigateButton:{        
        margin: 20,      
        // height: 40,
        // width: 40,
        // padding: 40,
        // backgroundColor: '#1abc9c',
        // borderRadius: '50%',
        
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: '40%',
        width: 400,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center' 
                
      },
      buttonText:{
        fontSize: 25,
        textAlign: 'center',            
        
        color: 'white',    

      }
  })

  export default HomeScreen;