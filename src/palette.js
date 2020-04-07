import React, { Component } from "react";
import Navbar from "./Navbar";
import PaletteFotter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import "./Palette.css";

import "rc-slider/assets/index.css";

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },

    colors: {
        height: "90%",
    },
};

class Palette extends Component {
    state = {
        level: 500,
        format: "hex",
    };

    changeLevel = (level) => {
        this.setState({ level });
    };

    changeFormat = (val) => {
        this.setState({
            format: val,
        });
    };

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const { classes } = this.props;

        const colorBoxes = colors[level].map((color) => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                moreUrl={`/palette/${id}/${color.id}`}
                showingFullPalette
            />
        ));

        return (
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors
                />

                <div className={classes.colors}>{colorBoxes}</div>
                <PaletteFotter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
