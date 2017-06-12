/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
 AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Buffer
} from 'react-native';

var buffer = require('buffer');

export default class DevPro extends Component {
    constructor(props){
        super(props);

        this.state = {
            showProgress: false
        }
    }

    render(){
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>
                That username and password combination did not work
            </Text>;
        }

        if(!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>
                We experienced an unexpected issue
            </Text>;
        }

        return (
       <View style={styles.container}>
        <Text style={styles.heading}>
        Welcome To The Future!
        </Text>
        
        <TextInput
        
        onChangeText={(text) => this.setState({username: text})}
        style={styles.input}
        placeholder='Github Username' />
        <TextInput
        onChangeText={(text) => this.setState({password: text})}
        style={styles.input}
        placeholder='Github Password'
        secureTextEntry='true' />
        
        <TouchableOpacity 
        onPress={this.onLoginPressed.bind(this)}
        style={styles.button}>
        <Text style={styles.buttonText}>
        Log in 
        </Text>
        </TouchableOpacity>
<ActivityIndicator
        animating={this.state.showProgress}
        size="large"
        style={styles.loader}
        />
        
      </View>
    );
}

onLoginPressed(){
        console.log('Attempting to log in with username ' + this.state.username);
        this.setState({showProgress: true});

        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        }, (results)=> {
            this.setState(Object.assign({
                showProgress: false
            }, results));

            if(results.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DADFE1',
      padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#7A942E',
    marginBottom: 5,
  },
    heading:{
        fontSize: 30,
        marginTop: 10,
    },
    input:{
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
    },
    button:{
        height: 50,
        backgroundColor: '#CF000F',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        
    },
    buttonText:{
        fontSize: 22,
        color: '#C3272B',
        alignSelf: 'center'
    },
    loader:{
        marginTop: 20,
    }
});

AppRegistry.registerComponent('DevPro', () => DevPro);