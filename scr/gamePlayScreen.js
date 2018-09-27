//V.4.2 edit lv function from V.4
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from 'native-base';
import { Button } from 'react-native-elements'
import NineButtons from './Components/_9_buttons';

const timer = require('react-native-timer');
export default class gamePlayScreen extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            sum: 0,
            lv: 1500,
            lv1: 30,
            lv2: 50,
            lv3: 70,
            hp: 3,
            start: false,
            disable_button: true,
            resultAnswerInButton: {
                resultButton1: null,
                resultButton2: null,
                resultButton3: null,
                resultButton4: null,
                resultButton5: null,
                resultButton6: null,
                resultButton7: null,
                resultButton8: null,
                resultButton9: null,
            },
            question: ["2 + 4 = ?", "5 + 5 = ?", "8 x 2 = ?", "4 / 2 = ?", "5 % 0 = ?", "สีชมพูวันอะไร ?", "pig แปลว่า ?"],
            answer: [6, 10, 16, 2, 0, "อังคาร", "หมู", " ", 66, "พริก", "เขียว", "จันทร์"],
            IndexRandomStateQuestion: [],
            keyArrayQuestionRandom: 0,
            countDown: 60
        };
    };

    componentWillMount() {
        this._randomResInButton();
    }

    componentWillUnmount() {
        timer.clearInterval(this);
    };

    _randomResInButton = () => {
        let st = this.state;
        timer.setInterval(      // Random As 9 Button
            this, 'resInButton',
            () => {
                this.setState({
                    resultButton1: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton2: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton3: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton4: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton5: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton6: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton7: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton8: st.answer[Math.floor(Math.random() * st.answer.length)],
                    resultButton9: st.answer[Math.floor(Math.random() * st.answer.length)],
                });
        }, st.lv);
        timer.setInterval(this, 'countDown', () => {  //countDownTime
            this.setState({
                countDown: this.state.countDown - 1,
            });
        },1000)
    };


    _checkAnswer = (ans) => {
        let {answer, sum, hp} = this.state;
        let _answer = answer[this.IndexDisplayQuestion];
        if (ans === _answer) {
            this.setState({
                sum: sum + 10,
                keyArrayQuestionRandom: this.state.keyArrayQuestionRandom + 1
            });
        }else {
            this.setState({
                hp: hp - 1,
            });
        }
    };

    _lv = () => {
        // Level 1
        if (this.state.lv1 - this.state.sum === 0) {
            this.setState({
                lv: 1200,
                lv1: this.state.lv1 += 1
            });
            return;
        }
        // Level 2
        if (this.state.lv2 - this.state.sum === 0) {
            this.setState({
                lv: 1000,
                lv2: this.state.lv2 += 1
            });
            return;
        }
        // Level 3
        if (this.state.lv3 - this.state.sum === 0) {
            this.setState({
                lv: 800,
                lv3: this.state.lv3 += 1
            });
        }
    };

    _displayPoint = (time) => {
        let st = this.state;
        let timeX10 = time * 10;
        let HP = st.hp * 100;
        let Point = (st.sum + HP) * time;
        alert(`
            Point                   ${st.sum} 
                                            + 
            HP (HP x 100)           ${st.hp} (${HP})
                                            x 
            Time left (Time left x 10 ) ${time} (${timeX10}) 
                                            = 
            Sum point               ${Point}
            `
        );
    };

    _stop = () => {
        let {countDown} = this.state;
        timer.clearInterval(this);
        this._displayPoint(countDown);
        this.setState({
            disable_button: true,
            start: false,
            countDown: 60
        });

    };

    _checkTime = () => {
        if (this.state.countDown === 0) {
            this._stop();
        }
    };

    _hp = (hp) => {
        if (hp === 0) {
            this._stop();
            this.setState({
                hp: 3
            });
        }
    };

    _randomQuestion = (keyArrayQuestionRandom, start) => {
        let {IndexRandomStateQuestion, question} = this.state;
        this.IndexDisplayQuestion = IndexRandomStateQuestion[keyArrayQuestionRandom];
        let QuestionDisplay = question[this.IndexDisplayQuestion];
        if (!QuestionDisplay && start) {
            this._stop();
        }
        return <Text style={styles.textQuestion}>{start ? question[this.IndexDisplayQuestion] : ""}</Text>
    };

    _CreateIndexQuestionRandom = () => {
        let {question} = this.state;
        let arrayIndexQuestion = [];

        function pushNumberArray () {  // [1, 2, 3, 4, ....., n]
            let Index = 0;
            question.forEach(function () {
                arrayIndexQuestion.push(Index);
                Index++;
            });
            return arrayIndexQuestion;
        }
        arrayIndexQuestion = pushNumberArray();

        function shuffleIndexQuestion(arrayIndexQuestion) {  // [5, 7, 8, 3, ....., n]
            let IndexQuestion = arrayIndexQuestion.length,
                shuffleIndex = 0,
                valueTemporary;

            while (IndexQuestion--) {
                shuffleIndex = Math.floor(Math.random() * (IndexQuestion+1));
                valueTemporary = arrayIndexQuestion[IndexQuestion];
                arrayIndexQuestion[IndexQuestion] = arrayIndexQuestion[shuffleIndex];
                arrayIndexQuestion[shuffleIndex] = valueTemporary;
            }
            return arrayIndexQuestion;
        }
        let IndexRandomQuestion = shuffleIndexQuestion(arrayIndexQuestion);
        this.setState({
            IndexRandomStateQuestion: IndexRandomQuestion
        })
    };

    _renderOnPressButton = (ans) => {
        this._checkAnswer(ans);
        // this._lv();
    };

    _onPressButtonStart = () => {
        this.setState({
            start: true,
            disable_button: false,
            sum: 0,
            countDown: 60
        });
        this._CreateIndexQuestionRandom();
    };


    render() {
        let st = this.state;
        this._checkTime();
        this._hp(st.hp);

        return (
            <Container>
                {this._randomQuestion(st.keyArrayQuestionRandom, st.start)}
                <NineButtons
                    title1={st.start ? st.resultButton1 : ""}
                    onPress1={() => {this._renderOnPressButton(st.resultButton1);}}
                    title2={st.start ? st.resultButton2 : ""}
                    onPress2={() => {this._renderOnPressButton(st.resultButton2);}}
                    title3={st.start ? st.resultButton3 : ""}
                    onPress3={() => {this._renderOnPressButton(st.resultButton3);}}
                    title4={st.start ? st.resultButton4 : ""}
                    onPress4={() => {this._renderOnPressButton(st.resultButton4);}}
                    title5={st.start ? st.resultButton5 : ""}
                    onPress5={() => {this._renderOnPressButton(st.resultButton5);}}
                    title6={st.start ? st.resultButton6 : ""}
                    onPress6={() => {this._renderOnPressButton(st.resultButton6);}}
                    title7={st.start ? st.resultButton7 : ""}
                    onPress7={() => {this._renderOnPressButton(st.resultButton7);}}
                    title8={st.start ? st.resultButton8 : ""}
                    onPress8={() => {this._renderOnPressButton(st.resultButton8);}}
                    title9={st.start ? st.resultButton9 : ""}
                    onPress9={() => {this._renderOnPressButton(st.resultButton9);}}
                    disable_={st.disable_button}
                />
                <Text style={styles.textPoint}>{st.sum}</Text>
                <Text style={styles.textPoint}>{st.hp}</Text>
                <Text style={styles.textPoint}>{st.start ? st.countDown : ""}</Text>
                <Button
                    title={'clear'} onPress={() => {timer.clearInterval(this);}}/>
                <Button title={'start'} onPress={this._onPressButtonStart}
                />
                <Button title={"testTimer"} onPress={()=> this.props.navigation.navigate('TestTimers')}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textQuestion : {
        color: 'red',
        fontSize: 30,
        alignSelf: 'center'
    },
    textPoint: {
        color: '#000',
        textAlign: 'center',
        fontSize: 30
    }
});
