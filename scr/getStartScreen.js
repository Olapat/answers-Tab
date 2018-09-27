import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Container} from 'native-base';

export default class homeScreen extends Component {
    static navigationOptions = {
      header: null,
        drawerLabel: 'GetStart'
    };

    render() {
        let Point = this.props.navigation.getParam('Point');
        return(
            <Container>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {Point ? <Text style={styles.textPoint}>{`คะแนน\n${Point}`}</Text> : null}
                    <Button
                        style={styles.buttonStart}
                        color={'red'}
                        onPress={()=> this.props.navigation.navigate('GamePlayScreen')}
                        title={'Start'}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonStart : {
        width: 100,
        height: 100,
        color: '#fff'
    },
    textPoint: {
        color: '#000',
        textAlign: 'center',
        fontSize: 30
    }
});

