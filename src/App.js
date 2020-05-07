import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPlalette from './SingleColorPalette';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { generatePalette } from './color-helper';
import Page from './Page';

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
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition
							classNames='page'
							timeout={500}
							key={location.key}>
							<Switch location={location}>
								<Route
									exact
									path='/palette/new/'
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												savePalette={this.savePalette}
												palettes={this.state.palettes}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									path='/palette/:paletteId/:colorId'
									render={(routeProps) => (
										<Page>
											<SingleColorPlalette
												colorId={
													routeProps.match.params
														.colorId
												}
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.paletteId
													)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/'
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palettes}
												deletePalette={
													this.deletePalette
												}
												{...routeProps}
												key={routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palette/:id'
									render={(routeProps) => (
										<Page className='page'>
											<Palette
												palette={generatePalette(
													this.findPalette(
														routeProps.match.params
															.id
													)
												)}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		);
	}
}

export default App;
