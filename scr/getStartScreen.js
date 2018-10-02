import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import { Container } from 'native-base';

export default class homeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        let ScoreTotal = this.props.navigation.getParam('ScoreTotal');
        return(
            <Container style={styles.container}>
                <Text style={styles.textTitleQuiz}>{"Asnwers Tab"}</Text>
                <Image
                    style={styles.image}
                    source={require('../public/img/quiz.png')}
                />
                <View style={styles.viewCenter}>
                    <TouchableHighlight
                        style={styles.touchPlay}
                        onPress={() => this.props.navigation.navigate('GamePlayScreen')}
                    >
                        <Text style={styles.text}>{"Start Game"}</Text>
                    </TouchableHighlight>
                    <View>
                        {ScoreTotal || ScoreTotal === 0 ?
                            <Text style={styles.text}>{`Score: ${ScoreTotal}`}</Text>
                            : null
                        }
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ad7a56',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        margin: '10%',
        alignSelf: 'center'
    },
    viewCenter: {
        alignItems: 'center'
    },
    touchPlay: {
        backgroundColor: '#502701',
        paddingHorizontal: '10%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#000',
        marginTop: '5%',
        marginBottom: '10%',
    },
    textTitleQuiz: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#502701',
        marginTop: '15%',
        marginBottom: '5%',
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
});

