import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {Container} from 'native-base';

export default class homeScreen extends Component {
    static navigationOptions = {
      header: null,
        drawerLabel: 'GetStart'
    };

    render() {
        return(
            <Container>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        style={{width: 100, height: 100, color: '#fff'}}
                        color={'red'}
                        onPress={()=> this.props.navigation.navigate('GamePlayScreen')}
                        title={'HitMole'}
                    />
                </View>
            </Container>
        );
    }
}

