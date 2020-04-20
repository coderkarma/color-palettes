import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddtoPhotosIcon from '@material-ui/icons/AddToPhotos';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
	state = {
		newPaletteName: '',
		formShowing: false,
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	showForm = () => {
		this.setState({
			formShowing: true,
		});
	};

	hideForm = () => {
		this.setState({
			formShowing: false,
		});
	};

	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { formShowing } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position='fixed'
					color='default'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}>
					<Toolbar disableGutters={!open}>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.props.handleDrawerOpen}
							className={classNames(classes.menuButton, {
								[classes.hide]: open,
							})}>
							<AddtoPhotosIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' noWrap>
							Create A Palette
						</Typography>
					</Toolbar>

					<div className={classes.navBtns}>
						<Link to='/'>
							<Button
								variant='contained'
								color='secondary'
								className={classes.button}>
								Go Back
							</Button>
						</Link>

						<Button
							variant='contained'
							color='primary'
							className={classes.button}
							onClick={this.showForm}>
							Save
						</Button>
					</div>
				</AppBar>

				{formShowing && (
					<PaletteMetaForm
						palettes={palettes}
						handleSubmit={handleSubmit}
						hideForm={this.hideForm}
					/>
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
