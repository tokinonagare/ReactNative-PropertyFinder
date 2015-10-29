'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var SearchPage = React.createClass({
  render: function() {
    return (
      <View style   = {styles.container}>
        <Text style = {styles.description}>
          Search for houses to buy!
        </Text>
        <Text style = {styles.description}>
        	Search by place-name, posecode or search near your location.
        </Text>
      </View> 
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = SearchPage;