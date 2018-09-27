import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";

const _button = (props) => {
    return(
        <Button
            raised={true}
            buttonStyle={{width: 100, height: 100}}
            disabled={props.disable}
            fontSize={35} fontWeight={'bold'}
            title={props.title}
            onPress={props.onPress}
        />
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
