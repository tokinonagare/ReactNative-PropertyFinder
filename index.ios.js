/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React       = require('react-native')
var SearchPage  = require('./app/SearchPage')
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React

var PropertyFinder   = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style        = {styles.container}
        initialRoute = {{
          title: 'Property Finder',
          component: SearchPage
        }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:             1,
    backgroundColor: 'white'
  }
})

AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder)
