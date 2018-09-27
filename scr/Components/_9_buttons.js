import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import Button from "./_button";

class _9_buttons extends React.Component {
    render() {
        return(
            <View>
                <View style={{flexDirection: "row", marginBottom: 10}}>
                    <Button
                        title={this.props.title1}
                        onPress={this.props.onPress1}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title2}
                        onPress={this.props.onPress2}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title3}
                        onPress={this.props.onPress3}
                        disable={this.props.disable_}
                    />
                </View>
                <View style={{flexDirection: "row", marginBottom: 10}}>
                    <Button
                        title={this.props.title4}
                        onPress={this.props.onPress4}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title5}
                        onPress={this.props.onPress5}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title6}
                        onPress={this.props.onPress6}
                        disable={this.props.disable_}
                    />
                </View>
                <View style={{flexDirection: "row", marginBottom: 10}}>
                    <Button
                        title={this.props.title7}
                        onPress={this.props.onPress7}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title8}
                        onPress={this.props.onPress8}
                        disable={this.props.disable_}
                    />
                    <Button
                        title={this.props.title9}
                        onPress={this.props.onPress9}
                        disable={this.props.disable_}
                    />
                </View>
            </View>
        );
    }
}

_9_buttons.propTypes = {
    title1: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title2: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title3: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title4: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title5: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title6: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title7: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title8: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),

    title9: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),
    //////////--------------------------------------/////////////////
    onPress1: PropTypes.func,
    onPress2: PropTypes.func,
    onPress3: PropTypes.func,
    onPress4: PropTypes.func,
    onPress5: PropTypes.func,
    onPress6: PropTypes.func,
    onPress7: PropTypes.func,
    onPress8: PropTypes.func,
    onPress9: PropTypes.func,
    disable_: PropTypes.bool,
    onPressIn: PropTypes.func,
};

_9_buttons.defaultProps = {
    title1: "none",
    title2: "none",
    title3: "none",
    title4: "none",
    title5: "none",
    title6: "none",
    title7: "none",
    title8: "none",
    title9: "none",
    onPress1: null,
    onPress2: null,
    onPress3: null,
    onPress4: null,
    onPress5: null,
    onPress6: null,
    onPress7: null,
    onPress8: null,
    onPress9: null,
    disable_: false
};

export default _9_buttons;
