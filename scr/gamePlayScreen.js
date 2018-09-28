//V.5 edit RandomAnswer from V.4
import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
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
            lv: 5000,
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
                this._onPressButtonStart();
                this._randomAnswerInButton();
            }
            , 1000);
    };

    componentWillUnmount() {
        timer.clearInterval(this);
        timer.clearTimeout(this);
    };

    _CreateIndexAnswersRandom = () => {
        let {answer} = this.state;
        let arrayIndexAnswers = [];
        let IndexLength = answer.length - 1;
        this.shareArray = [];
        function pushNumberArray(share) {  // [11, 5, 11, 5, ....., n]
            let IndexHalf = Math.floor(IndexLength / share);
            let Index = 0;
            for (let i = 9; i > 0; i--){
                if (Index % share === 0) {
                    arrayIndexAnswers.push(IndexLength);
                }else {
                    arrayIndexAnswers.push(IndexHalf);
                }
                Index++;
            }
            return arrayIndexAnswers;
        }

        function mod (Index) {
            let mod = 0;
            let ii,
                ss,
                arrayss = [];
            for (let i = 3; i < (Index / 2); i++) {
                if (Index % i === 0) {
                    mod = i;
                    break;
                }
            }

            ii = Index / mod;

            for (let i = 1; i <= mod; i++) {
                ss = ii * i;
                arrayss.push(ss)
            }

            return arrayss;
        }

        this.shareArray = mod(IndexLength);

        arrayIndexAnswers = pushNumberArray(2);

        function shuffleIndexQuestion(arrayIndexAnswers) {  // [5, 11, 11, 5, ....., n]
            let IndexQuestion = arrayIndexAnswers.length,
                shuffleIndex = 0,
                valueTemporary;

            while (IndexQuestion--) {
                shuffleIndex = Math.floor(Math.random() * (IndexQuestion + 1));
                valueTemporary = arrayIndexAnswers[IndexQuestion];
                arrayIndexAnswers[IndexQuestion] = arrayIndexAnswers[shuffleIndex];
                arrayIndexAnswers[shuffleIndex] = valueTemporary;
            }
            return arrayIndexAnswers;
        }

        let IndexRandomAnswers = shuffleIndexQuestion(this.shareArray);
        this.setState({
            IndexRandomStateAnswers: IndexRandomAnswers,
        });
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
                hp: hp + 1,
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
        return <Text style={styles.textQuestion}>{start ? QuestionDisplay : ""}</Text>
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
            displayQuestion: true
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

    _onPressButtonStart = () => {
        this.setState({
            start: true,
            disable_button: false,
        });
        this._CreateIndexQuestionRandom();
    };

    render() {
        let st = this.state;
        this._checkTime();
        this._hp(st.hp);

        return (
            <Container>
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
                <Text style={styles.textPoint}>{st.sum}</Text>
                <Text style={styles.textPoint}>{st.hp}</Text>
                <Text style={styles.textPoint}>{st.start ? st.countDown : null}</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textQuestion: {
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

