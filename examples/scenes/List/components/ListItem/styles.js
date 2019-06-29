import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
	item: {
		width: '90%',
		borderRadius: 20,
		marginBottom: 10,
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1
	},
	image: {
		flex: 1,
		maxWidth: 70,
		height: 70,
		backgroundColor: '#e2e2e2',
		borderRadius: 20,
		marginRight: 5
	},
	info: {
		flex: 1,
		borderRadius: 20,
		paddingLeft: 5,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	name: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
		backgroundColor: '#e2e2e2',
		width: '70%',
		height: 15,
		marginBottom: 5,
		borderRadius: 5
	},
	brand: {
		color: '#777',
		fontSize: 14,
		backgroundColor: '#e2e2e2',
		width: '50%',
		height: 15,
		marginBottom: 5,
		borderRadius: 5
	},
	status: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '40%',
		height: 15,
		backgroundColor: '#e2e2e2',
		marginBottom: 5,
		borderRadius: 5
	}
});
