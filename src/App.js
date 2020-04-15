import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPlalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';

import { generatePalette } from './color-helper';

class App extends Component {
	state = {
		palettes: seedColors,
	};

	findPalette(id) {
		return this.state.palettes.find((palette) => palette.id === id);
	}

	savePalette = (newPalette) => {
		this.setState({
			palettes: [...this.state.palettes, newPalette],
		});
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
