import { Button, Toast } from '@ant-design/react-native';
import React from 'react';
import { View } from 'react-native';

export default function MyButton() {

    return (
        <View>
            <Button 
            type='primary'
            size='large'
            onPress={() => Toast.info('This is a toast tips')}>
            Start
            </Button>
        </View>
    )
}