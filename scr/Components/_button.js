import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import PropTypes from "prop-types";

const _button = (props) => {
    return(
        <TouchableHighlight
            style={styles.touch}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.title}</Text>
        </TouchableHighlight>
    );
};

_button.propTypes = {
    disable: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onPress: PropTypes.func,
};

_button.defaultProps = {
    disable: false,
    title: "",
    onPress: null
};

const styles = StyleSheet.create({
    touch: {
        width: '30%',
        height: 120,
        backgroundColor: '#502701',
        margin: '1.7%',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 15
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: '23%'
    }
});

export default _button;
