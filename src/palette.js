import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Palette extends Component {
  state = {
    level: 500
  };

  changeLevel = level => {
    this.setState({ level });
  };
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));

    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
            trackStyle={{ backgroundColor: 'transparent' }}
            handleStyle={{
              backgroundColor: 'green',
              outline: 'none',
              border: '2px solid green',
              boxShadow: 'none',
              width: '13px',
              height: '13px',
              maringLeft: '-7px',
              marginTop: '-3px'
            }}
            railStyle={{ height: 8 }}
          />
        </div>

        {/* Nav bar goes here */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer goes here */}
      </div>
    );
  }
}

export default Palette;
