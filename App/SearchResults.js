'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView,
  Image,
  Component
} = React;

var SearchResults = React.createClass({

	getInitialState: function() {
		var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			dataSource: dataSource.cloneWithRows(this.props.listings)
		};
	},

	renderRow: function(rowData, sectionID, rowID) {
		return (
			<TouchableHighlight
				underlayColor = 'gray'>
				<View>
					<Text>{rowData.title}</Text>
				</View>
			</TouchableHighlight>
		);
	},

	render: function() {
		return (
			<ListView
				dataSource = {this.state.dataSource}
				renderRow  = {this.renderRow}/>
		);
	},

});

module.exports = SearchResults;