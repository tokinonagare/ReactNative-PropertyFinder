'use strict';

var React         = require('react-native')
var SearchResults = require('./SearchResults')
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React

function urlForQueryAndPage (key, value, pageNumber) {
  var data = {
      country:      'uk',
      pretty:       '1',
      encoding:     'json',
      listing_type: 'buy',
      action:       'search_listings',
      page:          pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
      .map(key => key + '=' + encodeURIComponent(data[key]))
      .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
}

var SearchPage = React.createClass({

  getInitialState: function() {
    return {
      searchString: 'london',
      isLoading:     false,
      message:      ''
    };
  },

  isLoadingInitial: function() {
    return{
      isLoading: false,
    };
  },

  _executeQuery: function(query) {
    console.log(query);
    this.setState({
      isLoading: true
    });
    fetch(query)
      .then(response => response.json())
      .then(json     => this._handleResponse(json.response))
      .catch(error   =>
        this.setState({
          isLoading: false,
          message:  'Something bad happend ' + error
        }));
  },

  _handleResponse: function(response) {
    this.setState({
      isLoading: false
    });
    if (response.application_response_code.substr(0, 1) === '1') {
        this.props.navigator.push({
          title: 'Results',
          component: SearchResults,
          passProps: {listings: response.listings}
        }); 
        } else {
          this.setState({message: 'Location not recognized; please try again.'});
    };
  },

  onSearchPressed: function() {
    if (this.state.isLoading == false) {
        this.setState({
          message: ''
        });
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    };     
  },

  onSearchTextChanged: function(event) {
    this.setState({searchString: event.nativeEvent.text})
  },

  onLocationPressed: function() {
    this.setState({
      message: ''
    });
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude;
        this.setState({searchString: search});
        var query  = urlForQueryAndPage('centre_point', search, 1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          nessage: 'There was a problem with obtaining your location:' + error
        });
      });
  },

  render: function() {

    var spinner = this.state.isLoading ?
      (<ActivityIndicatorIOS
        hidden  = 'true'
        size    = 'large'/>) :
      (<View/>);

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
            value         = {this.state.searchString}
            onChange      = {this.onSearchTextChanged}
            placeholder   = 'Search via name or postcode'/>
          <TouchableHighlight     
            style         = {styles.searchButton}
            onPress       = {this.onSearchPressed}
            underlayColor = 'gray'>
            <Text style   = {styles.searchButtonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style         = {styles.searchButton}
          onPress       = {this.onLocationPressed}
          underlayColor = 'gray'>
          <Text style   = {styles.searchButtonText}>Location</Text>
        </TouchableHighlight>
        <Image 
          style  = {styles.image}
          source = {require('image!house')}/>

        {spinner}

        <Text style = {styles.description}>{this.state.message}</Text>

      </View>
    );
  }
})

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
  },
  image: {
    width:  217,
    height: 138
  }
})

module.exports = SearchPage