import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from 'react-native';
import { Container } from 'native-base';
import Modal from 'react-native-modalbox';

export default class homeScreen extends PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            onOpen: false,
            Data: true
        }
    };

    _onOpenModal = () => {
        this.setState({onOpen : true});
    };

    _onCloseModal = () => {
        this.setState({onOpen : false,  Data: false});
    };

    render() {
        let DataScore = this.props.navigation.getParam('DataScore');
        let newDataScore;
        DataScore ? newDataScore = DataScore : null;
        if (DataScore && this.state.Data) {
            this.setState({onOpen: true});
        }

        return(
            <Container style={styles.container}>
                {newDataScore ?
                <Modal
                    style={{backgroundColor: '#ad7a56', height: "40%", borderWidth: 10, borderColor: '#502701',}}
                    isOpen={this.state.onOpen}
                    // backdropPressToClose={false}
                    onClosed={this._onCloseModal}
                >
                    <View style={[styles.viewScoreTotal,{alignSelf: 'center', marginTop: '2%'}]}>
                        <View style={styles.viewDataScore}>
                            <Text style={styles.texts}>{`Score: `}</Text>
                            {/*<Text style={styles.texts}>{"140"}</Text>*/}
                            <Text style={styles.texts}>{newDataScore.Score}</Text>
                        </View>
                        <View style={styles.viewDataScore}>
                            <Text style={styles.texts}>{`Time Left: `}</Text>
                            {/*<Text style={styles.texts}>{'26'}</Text>*/}
                            <Text style={styles.texts}>{newDataScore.TimeLeftScore}</Text>
                        </View>
                        <View style={styles.viewDataScore}>
                            <Text style={styles.texts}>{`HP Left: `}</Text>
                            <Text style={styles.texts}>{newDataScore.HpLeftScore}</Text>
                            {/*<Text style={styles.texts}>{'6'}</Text>*/}
                        </View>
                        <View style={[styles.viewDataScore,{marginTop: '5%'}]}>
                            <Text style={styles.text}>{`ScoreTotal:`}</Text>
                            {/*<Text style={styles.text}>{`140`}</Text>*/}
                            <Text style={styles.text}>{newDataScore.ScoreTotal}</Text>
                        </View>
                        <TouchableHighlight
                            style={styles.touchM}
                            onPress={this._onCloseModal}
                        >
                            <Text style={[styles.textM,{marginTop: '3%'}]}>{"OK"}</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                    : null
                }
                <Text style={styles.textTitleQuiz}>{"Asnwers Tab"}</Text>
                <Image
                    style={styles.image}
                    source={require('../public/img/quiz.png')}
                />
                <TouchableHighlight
                    style={styles.touchPlay}
                    onPress={() => this.props.navigation.navigate('GamePlayScreen')}
                >
                    <Text style={[styles.text,{marginTop: '3%'}]}>{"Start Game"}</Text>
                </TouchableHighlight>
                {newDataScore ?
                    <TouchableHighlight
                        style={styles.viewScoreTotalTouch}
                        onPress={this._onOpenModal}
                        underlayColor={'#813101'}
                    >
                        <View style={[styles.viewDataScoreT,{marginTop: '5%'}]}>
                            <Text style={styles.text}>{`ScoreTotal:`}</Text>
                            {/*<Text style={styles.text}>{`140`}</Text>*/}
                            <Text style={styles.text}>{newDataScore.ScoreTotal}</Text>
                        </View>
                    </TouchableHighlight>
                    : null
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ad7a56',
        alignItems: 'center',
    },
    image: {
        width: '62%',
        height: '41%',
        marginVertical: '10%',
    },
    touchPlay: {
        backgroundColor: '#502701',
        // paddingHorizontal: '10%',
        width: '70%',
        height: '10%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#000',
        marginBottom: '5%',
    },
    touchM: {
        backgroundColor: '#502701',
        width: '70%',
        height: '20%',
        alignItems: 'center',
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
        marginTop: '10%',
    },
    text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    textM: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    viewScoreTotal: {
        alignItems: 'center',
        width: '70%',
    },
    viewScoreTotalTouch: {
        alignItems: 'center',
        width: '80%',
        borderWidth: 5,
        borderRadius: 20,
        borderColor: '#502701',
        justifyContent: 'center',
    },
    texts: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
    },
    viewDataScore: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    viewDataScoreT: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    }
});

