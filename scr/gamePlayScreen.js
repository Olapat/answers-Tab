//V.5 edit RandomAnswer from V.4
import React, {PureComponent} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container} from 'native-base';
import NineButtons from './Components/_9_buttons';
import Questions from './question';
import Answers from './answers';

const timer = require('react-native-timer');
export default class gamePlayScreen extends PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            lv: 1500,
            lv1: 30,
            lv2: 50,
            lv3: 70,
            hp: 3,
            start: false,
            disable_button: true,
            displayQuestion: false,
            openCountDown: false,
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
            question: Questions,
            answer: Answers,
            IndexRandomStateQuestion: [],
            IndexRandomStateAnswers:[],
            keyArrayQuestionRandom: 0,
            countDown: 60,
        };
    };

    componentWillMount() {
        timer.setTimeout(this, 'delay',
            () => {
                this._CreateIndexQuestionRandom();
                this._randomAnswerInButton();
            }
            , 500);
    };

    componentWillUnmount() {
        timer.clearInterval(this);
        timer.clearTimeout(this);
    };

    _randomAnswers = () => {
        let st = this.state;
        this.answerRightful = st.answer[this.IndexDisplayQuestion];
        let ranButtonShowAnswerRightful = Math.floor(Math.random() * 9) + 1;
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
        switch (ranButtonShowAnswerRightful) {      //ทำให้ในแต่ละรอบมีคำตอบที่ถูกต้องอย่างน้อย 1 เสมอ
            case 1 : { this.setState({resultButton1: this.answerRightful}) } break;
            case 2 : { this.setState({resultButton2: this.answerRightful}) } break;
            case 3 : { this.setState({resultButton3: this.answerRightful}) } break;
            case 4 : { this.setState({resultButton4: this.answerRightful}) } break;
            case 5 : { this.setState({resultButton5: this.answerRightful}) } break;
            case 6 : { this.setState({resultButton6: this.answerRightful}) } break;
            case 7 : { this.setState({resultButton7: this.answerRightful}) } break;
            case 8 : { this.setState({resultButton8: this.answerRightful}) } break;
            case 9 : { this.setState({resultButton9: this.answerRightful}) } break;
        }
    };

    _randomAnswerInButton = () => {
        let st = this.state;
        timer.setInterval(      // Random As 9 Button
            this, 'resInButton',
            () => {
                this._randomAnswers();
            }, st.lv);
        timer.setTimeout(this, 'delayCountDown', () => {
            this.setState({
                start: true,
                disable_button: false,
                displayQuestion: true
            });
            timer.setInterval(this, 'countDown', () => {  //countDownTime
                this.setState({
                    countDown: this.state.countDown - 1,
                });
            }, 1000)
        },st.lv);

    };

    _checkAnswer = (ans) => {
        let {answer, sum, hp} = this.state;
        this.answerRightful = answer[this.IndexDisplayQuestion];
        if (ans === this.answerRightful) {
            this.setState({
                sum: sum + 10,
                keyArrayQuestionRandom: this.state.keyArrayQuestionRandom + 1
            });
        } else {
            this.setState({
                hp: hp - 1,
            });
        }
        ans = "";
        return ans;
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
        timeX10 === 0 ? timeX10 = 1 : null;
        let Point = (st.sum + HP) * timeX10;
        this.props.navigation.navigate('GetStartScreen', {Point: Point})
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
        return<View style={{backgroundColor: '#502701'}}><Text style={styles.textQuestion}>{start ? question[this.IndexDisplayQuestion] : ""}</Text></View>
    };

    _CreateIndexQuestionRandom = () => {
        let {question} = this.state;
        let arrayIndexQuestion = [];

        function pushNumberArray() {  // [1, 2, 3, 4, ....., n]
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
                shuffleIndex = Math.floor(Math.random() * (IndexQuestion + 1));
                valueTemporary = arrayIndexQuestion[IndexQuestion];
                arrayIndexQuestion[IndexQuestion] = arrayIndexQuestion[shuffleIndex];
                arrayIndexQuestion[shuffleIndex] = valueTemporary;
            }
            return arrayIndexQuestion;
        }

        let IndexRandomQuestion = shuffleIndexQuestion(arrayIndexQuestion);
        this.setState({
            IndexRandomStateQuestion: IndexRandomQuestion,
        })
    };

    _clearAnswerInButtons = (key) => {
        switch (key) {
            case 1 : {this.setState({resultButton1: ""})} break;
            case 2 : {this.setState({resultButton2: ""})} break;
            case 3 : {this.setState({resultButton3: ""})} break;
            case 4 : {this.setState({resultButton4: ""})} break;
            case 5 : {this.setState({resultButton5: ""})} break;
            case 6 : {this.setState({resultButton6: ""})} break;
            case 7 : {this.setState({resultButton7: ""})} break;
            case 8 : {this.setState({resultButton8: ""})} break;
            case 9 : {this.setState({resultButton9: ""})} break;
        }
    };

    _renderOnPressButton = (ans, key) => {
        this._checkAnswer(ans);
        this._clearAnswerInButtons(key);
        // this._lv();
    };

    render() {
        let st = this.state;
        this._checkTime();
        this._hp(st.hp);

        return (
            <Container style={{backgroundColor: '#ad7a56'}}>
                <Text style={{fontSize: 48, textAlign: 'center', color: '#502701', fontWeight: 'bold'}}>Quiz Game</Text>
                {st.displayQuestion ? this._randomQuestion(st.keyArrayQuestionRandom, st.start) : null}
                <NineButtons
                    title1={st.start ? st.resultButton1 : ""}
                    onPress1={(key) => {
                        this._renderOnPressButton(st.resultButton1, key);
                    }}
                    title2={st.start ? st.resultButton2 : ""}
                    onPress2={(key) => {
                        this._renderOnPressButton(st.resultButton2, key);
                    }}
                    title3={st.start ? st.resultButton3 : ""}
                    onPress3={(key) => {
                        this._renderOnPressButton(st.resultButton3, key);
                    }}
                    title4={st.start ? st.resultButton4 : ""}
                    onPress4={(key) => {
                        this._renderOnPressButton(st.resultButton4, key);
                    }}
                    title5={st.start ? st.resultButton5 : ""}
                    onPress5={(key) => {
                        this._renderOnPressButton(st.resultButton5, key);
                    }}
                    title6={st.start ? st.resultButton6 : ""}
                    onPress6={(key) => {
                        this._renderOnPressButton(st.resultButton6, key);
                    }}
                    title7={st.start ? st.resultButton7 : ""}
                    onPress7={(key) => {
                        this._renderOnPressButton(st.resultButton7, key);
                    }}
                    title8={st.start ? st.resultButton8 : ""}
                    onPress8={(key) => {
                        this._renderOnPressButton(st.resultButton8, key);
                    }}
                    title9={st.start ? st.resultButton9 : ""}
                    onPress9={(key) => {
                        this._renderOnPressButton(st.resultButton9, key);
                    }}
                    disable_={st.disable_button}
                />
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.textPoint}>Score: </Text>
                    <Text style={styles.textResult}>{st.sum}</Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.textPoint}>Hp: </Text>
                    <Text style={styles.textResult}>{st.hp}</Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.textPoint}>Time out: </Text>
                    <Text style={styles.textResult}>{st.start ? st.countDown : null}</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textQuestion : {
        color: '#ad7a56',
        fontSize: 36,
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    textPoint: {
        color: '#502701',
        fontSize: 30,
        fontWeight: 'bold'
    },
    textResult: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
});
