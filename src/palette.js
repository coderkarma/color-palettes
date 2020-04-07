import React, { Component } from "react";
import Navbar from "./Navbar";
import PaletteFotter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import ColorBox from "./ColorBox";

// import "rc-slider/assets/index.css";


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
