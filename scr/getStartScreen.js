import React, {Component} from 'react';
import { StyleSheet, View, Button, TouchableHighlight, Text, Image } from 'react-native';
import { Container } from 'native-base';

export default class homeScreen extends Component {
    static navigationOptions = {
      header: null,
        drawerLabel: 'GetStart'
    };

    render() {
        let Point = this.props.navigation.getParam('Point');
        return(
            <Container style={{flex: 1, backgroundColor: '#ad7a56', alignItems: 'center'}}>
                <Text style={styles.textTitleQuiz}>Quiz Game</Text>
                <Image
                    style={{width: 200, height: 200, alignSelf: 'center'}}
                    source={require('../pubplic/img/quiz.png')}
                />
                <View>
                    <TouchableHighlight
                    style={styles.touchPlay}
                    onPress={()=> this.props.navigation.navigate('GamePlayScreen')}
                    >
                    <Text style={styles.textTouch}>Start Game</Text>
                    </TouchableHighlight>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        {Point ? <Text style={styles.textTouch}>Score: </Text> : null}
                        {Point || Point === 0 ? <Text style={styles.textTouch}>{Point}</Text> : null}
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    touchPlay: {
        backgroundColor: '#502701',
        paddingLeft: '10%',
        paddingRight: '10%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#000000',
        margin: '15%'
    },
    textTouch: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    textTitleQuiz: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#502701',
        margin: '10%'
    },
});

