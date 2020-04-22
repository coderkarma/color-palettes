import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPlalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';

import { generatePalette } from './color-helper';

class App extends Component {
	savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));

	state = {
		palettes: this.savedPalettes || seedColors,
	};

	findPalette(id) {
		return this.state.palettes.find((palette) => palette.id === id);
	}

	deletePalette = (id) => {
		this.setState(
			(st) => ({
				palettes: st.palettes.filter((palette) => palette.id !== id),
			}),
			this.syncLocalStorage
		);
	};

	savePalette = (newPalette) => {
		this.setState(
			{
				palettes: [...this.state.palettes, newPalette],
			},
			this.syncLocalStorage
		);
	};

	syncLocalStorage = () => {
		// save palette to local storage
		window.localStorage.setItem(
			'palettes',
			JSON.stringify(this.state.palettes)
		);
	};
	render() {
		return (
			<Switch>
				<Route
					exact
					path='/palette/new/'
					render={(routeProps) => (
						<NewPaletteForm
							savePalette={this.savePalette}
							palettes={this.state.palettes}
							{...routeProps}
						/>
					)}
				/>
				<Route
					path='/palette/:paletteId/:colorId'
					render={(routeProps) => (
						<SingleColorPlalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(
								this.findPalette(
									routeProps.match.params.paletteId
								)
							)}
						/>
					)}
				/>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<PaletteList
							palettes={this.state.palettes}
							deletePalette={this.deletePalette}
							{...routeProps}
							key={routeProps}
						/>
					)}
				/>
				<Route
					exact
					path='/palette/:id'
					render={(routeProps) => (
						<Palette
							palette={generatePalette(
								this.findPalette(routeProps.match.params.id)
							)}
						/>
					)}
				/>
			</Switch>

			// <div>
			//     <Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
