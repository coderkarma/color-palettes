import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentColor: 'teal',
			newColorName: '',
		};
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
			return this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			);
		});

		ValidatorForm.addValidationRule('isColorUnique', (value) => {
			return this.props.colors.every(
				({ color }) => color !== this.state.currentColor
			);
		});
	}

	updateCurrentColor = (newColor) => {
		this.setState({
			currentColor: newColor.hex,
		});
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName,
		};

		this.props.addNewColor(newColor);
		this.setState({
			newColorName: '',
		});
	};

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={this.updateCurrentColor}
					className={classes.picker}
				/>
				<ValidatorForm
					onSubmit={this.handleSubmit}
					ref='form'
					instantValidate={false}>
					<TextValidator
						value={newColorName}
						className={classes.colorNameInput}
						placeholder='Color Name'
						name='newColorName'
						margin='normal'
						variant='filled'
						onChange={this.handleChange}
						validators={[
							'required',
							'isColorUnique',
							'isColorNameUnique',
						]}
						errorMessages={[
							'Enter a color name',
							'Color must be unique',
							'Color already used',
						]}
					/>
					<Button
						variant='contained'
						type='submit'
						color='primary'
						className={classes.addColor}
						disabled={paletteIsFull}
						style={{
							backgroundColor: paletteIsFull
								? 'grey'
								: currentColor,
						}}>
						{paletteIsFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}
export default withStyles(styles)(ColorPickerForm);
