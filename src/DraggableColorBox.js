import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
	root: {
		width: '20%',
		height: '25%',
		margin: '0 auto',
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		marginBottom: '-3.5px',
	},

	boxContent: {
		position: 'absolute',
		left: '0px',
		width: '100%',
		padding: '10px',
		bottom: '0px',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		fontSize: '12px',
		display: 'flex',
		justifyContent: 'space-between',
		color: 'rgba(0, 0, 0, 0.5)',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)',
		},
	},

	deleteIcon: {
		transition: 'all 0.3s ease-in-out',
	},
};

const DraggableColorBox = SortableElement((props) => {
	const { classes, handleClick, name, color } = props;
	return (
		<div className={classes.root} style={{ backgroundColor: color }}>
			<div className={classes.boxContent}>
				<span>{name} </span>
				<DeleteIcon
					className={classes.deleteIcon}
					onClick={handleClick}
				/>
			</div>
		</div>
	);
});
export default withStyles(styles)(DraggableColorBox);