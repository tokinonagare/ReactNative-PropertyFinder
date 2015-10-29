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
        <View style = {styles.searchContainer}>
          <TextInput
            style         = {styles.searchInput}
            placeholder   = 'Search via name or postcode'/>
          <TouchableHighlight     
            style         = {styles.searchButton}
            underlayColor = 'gray'>
            <Text style   = {styles.searchButtonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style         = {styles.searchButton}
          underlayColor = 'gray'>
          <Text style   = {styles.searchButtonText}>Location</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding:     30,
    marginTop:   65,
    alignItems: 'center',
  },
  description: {
    marginBottom: 20,
    fontSize:     16,
    textAlign:   'center',
    color:       'gray'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems:    'center',
    alignSelf:     'stretch'
  },
  searchInput: {
    flex:         4,
    height:       32,
    padding:      4,
    marginRight:  5,
    borderWidth:  1,
    borderRadius: 8,
    fontSize:     14,
    borderColor: 'black',
    color:       'black'
  },
  searchButton: { 
    flex:             1,
    height:           32,
    borderWidth:      1,
    borderRadius:     8,
    marginBottom:     10,
    flexDirection:   'row',
    justifyContent:  'center',
    alignSelf:       'stretch',
    borderColor:     'black',
    backgroundColor: 'black'
  },
  searchButtonText: {
    fontSize:   18,
    color:     'white',
    alignSelf: 'center'
  }
});

module.exports = SearchPage;