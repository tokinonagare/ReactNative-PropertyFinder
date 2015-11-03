'use strict';

var React = require('react-native')
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image,
  Component
} = React

var PropertyDetail = React.createClass({
	render: function() {
		var property   = this.props.property;

		var stats      = property.bedroom_number + ' bed' + property.property_type;
		if (property.bathroom_number) {
										 stats += ', ' + 
										 property.bathroom_number + ' ' + 
										 (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom')
		}

		var price 		 = property.price_formatted.split(' ')[0];

		return (
			<View    style  = {styles.container}>
				<Image style  = {styles.image}
							 source = {{uri: property.img_url}}/>
				<View   style = {styles.heading}>
					<Text style = {styles.price}>£{price}</Text>
					<Text style = {styles.title}>{property.title}</Text>
					<Text style = {styles.separator}/>
				</View>
				<Text   style = {styles.description}>{stats}</Text>
				<Text   style = {styles.description}>{property.summary}</Text>
			</View>
		);
	}
})

var styles = StyleSheet.create({
	container: {
		marginTop: 65
	},
	heading: {
		backgroundColor: '#F8F8F8'
	},
	title: {
		fontSize: 18,
		margin: 	5,
		color: 	 '#656565'
	},
	separator: {
		height: 					1,
		backgroundColor: '#DDDDDD'
	},
	image: {
		width:  400,
		height: 300
	},
	price: {
		fontSize: 	 22,
		fontWeight: 'bold',
		margin: 		 5,
		color: 			'black'
	},
	description: {
		fontSize: 16,
		margin: 	5,
		color: 	 '#656565'
	}
})

module.exports = PropertyDetail