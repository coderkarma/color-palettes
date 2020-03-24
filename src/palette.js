import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import './Palette.css';

import 'rc-slider/assets/index.css';

class Palette extends Component {
    state = {
        level: 500,
        format: 'hex'
    };

    changeLevel = level => {
        this.setState({ level });
    };

    changeFormat = val => {
        this.setState({
            format: val
        });
    };

    render() {
        const { colors } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} />
        ));

        return (
            <div className="Palette">
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                />
                {/* Nav bar goes here */}
                <div className="Palette-colors">{colorBoxes}</div>
                {/* footer goes here */}
            </div>
        );
    }
}

export default Palette;
