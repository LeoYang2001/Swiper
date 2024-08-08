import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSpring
} from 'react-native-reanimated';
import { cardColors, iniCards, MyColors } from '../constants';
import * as Icon from 'react-native-feather'
import { runOnJS } from 'react-native-reanimated';


const Main = ({ navigation, route }) => {
    const [myCards, setMyCards] = useState(route.params.myCards)
    
    const offsets = myCards.map(() => useSharedValue(0));
    const presses = myCards.map(() => useSharedValue(false));


 

    const panHandlers = myCards.map((card, index) => {
        const offset = offsets[index];
        const pressed = presses[index];

        const pan = Gesture.Pan()
            .onBegin(() => {
                pressed.value = true;
            })
            .onChange((event) => {
                offset.value = event.translationX;
            })
            .onFinalize(() => {
                if (Math.abs(offset.value) > 180) {
                    offset.value = offset.value > 0 ? withSpring(500) : withSpring(-500);
                   
                } else {
                    offset.value = withSpring(0);
                }
               
                pressed.value = false;
            });

        return pan;
    });

    const animatedStyles = myCards.map((card, index) => useAnimatedStyle(() => {
    
        const cardColor = cardColors[index % cardColors.length]

        return ({
            transform: [
                { translateX: offsets[index].value },
                { scale: withTiming(presses[index].value ? 1.1 : 1) },
            ],
            backgroundColor: cardColor,
        })
    }));

    return (
        <View style={{ backgroundColor: MyColors.mainColor }} className="w-full h-full flex justify-center items-center">
            <GestureHandlerRootView style={{height: 520,
        width: 300,}} className="w-full h-full justify-center items-center mb-20" >
                {myCards.map((card, index) => (
                    <GestureDetector key={index} gesture={panHandlers[index]}>
                        <Animated.View className="absolute top-0 left-0 flex px-4 items-center justify-center " style={[styles.circle, animatedStyles[index]]}>
                            <Text className="font-semibold text-white text-lg text-center">{card.content}</Text>
                        </Animated.View>
                    </GestureDetector>
                ))}
            </GestureHandlerRootView>
            <TouchableOpacity onPress={
                ()=>{navigation.replace('Welcome')}}
             style={{backgroundColor:'rgba(255,255,255,0.12)'}} className="w-14 h-14 justify-center items-center rounded-full">
                <Icon.Home color={'white'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    circle: {
        height: 520,
        width: 300,
        borderRadius: 10,
    },
});

export default Main;
