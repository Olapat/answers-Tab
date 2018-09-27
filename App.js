import React from 'react';
import { StackNavigator } from 'react-navigation';
import GetStartScreen from './scr/getStartScreen';
import GamePlayScreen from './scr/gamePlayScreen';

export default StackNavigator({
    GetStartScreen: GetStartScreen,
    GamePlayScreen: GamePlayScreen,
});
