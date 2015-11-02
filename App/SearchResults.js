'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image,
  Component
} = React;

var PropertyDetail = require('./PropertyDetail')

var SearchResults = React.createClass({

	getInitialState: function() {
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
		return {
			dataSource: dataSource.cloneWithRows(this.props.listings)
		};
	},

	rowPressed: function(propertyGuid) {
		var property = this.props.listings.filter(prop => prop.guid === propertyGuid)[0];

		this.props.navigator.push({
			title: 		'Detail',
			component: PropertyDetail,
			passProps: {property: property}
		});
	},

	renderRow: function(rowData, sectionID, rowID) {
		var price = rowData.price_formatted.split(' ')[0];

		return (
			<TouchableHighlight 
				onPress 			= {() => this.rowPressed(rowData.guid)}
				underlayColor = '#dddddd'>
				<View>
					<View     style = {styles.rowContainer}>
						<Image 	style = {styles.thumb} source = {{uri: rowData.img_url}}/>
						<View   style = {styles.textContainer}>
							<Text style = {styles.price}>£{price}</Text>
							<Text style = {styles.title}
										numberOflines = {1}>{rowData.title}</Text>
						</View>
					</View>
					<View 		style = {styles.separator}/>
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

var styles = StyleSheet.create({
	thumb: {
		width:  		 80,
		height: 		 80,
		marginRight: 10,
	},
	textContainer: {
		flex: 			      1,
	},
	separator: {
		height: 					1,
		backgroundColor: '#dddddd',
	},
	price: {
		fontSize:    20,
		fontWeight: 'bold',
		color: 			'black'
	},
	title: {
		fontSize: 16,
		color:    '#656565'
	},
	rowContainer: {
		padding: 				6,
		flexDirection: 'row'
	}
})

module.exports = SearchResults;