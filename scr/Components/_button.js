import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";

const _button = (props) => {
    return(
        <TouchableHighlight
            style={{width: '30%', height: 110,backgroundColor: '#502701', margin: '1.7%', borderWidth: 2, borderColor: '#000000', borderRadius: 15}}
            onPress={props.onPress}
            underlayColor={'#1dc81e'}
        >
            <Text style={{fontSize: 36, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: '23%'}}>{props.title}</Text>
        </TouchableHighlight>
    );
};

_button.propTypes = {
    disable: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),
    onPress: PropTypes.func,
};

_button.defaultProps = {
    disable: false,
    title: "",
    onPress: null
};

export default _button;
