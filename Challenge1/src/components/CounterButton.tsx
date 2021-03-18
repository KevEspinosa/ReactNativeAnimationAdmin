import * as React from 'react';
import {
    View,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CounterButton = () => {
    const [open, changeOpen] = React.useState(0);
    const [counter, changeCounter] = React.useState(1);
    const [animation] = React.useState(new Animated.Value(0));
    const [tapAnimation] = React.useState(new Animated.Value(0));
    
    const startCounterAnimation = () => {
        if (!open){
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => changeOpen(1))
        } else {
            increaseCount()
        }
    }

    const animateQuanitityChange = () => {
        Animated.timing(tapAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start(() => tapAnimation.setValue(0))
    }

    const increaseCount = () => {
        changeCounter(counter + 1)
        animateQuanitityChange()
    }

    const decreaseCount = () => {
        if (counter > 1){
            changeCounter(counter - 1)
            animateQuanitityChange()
        }
    }

    const incrementBoxScaleX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, .7]
    })
    const incrementBoxtranslateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30]
    })
    const incrementBoxRotate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg']
    })
    const incrementBoxTransformStyle = {
        transform: [
            {
                scale: incrementBoxScaleX
            },
            {
                translateX: incrementBoxtranslateX
            },
            {
                rotate: incrementBoxRotate
            }
        ]
    }
    const counterDisplayScaleX = animation.interpolate({
        inputRange: [0, .2, 1],
        outputRange: [.9, 1, 1.25]
    })
    const counterDisplaytranslateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 100]
    })
    const counterDisplayTransformStyle = {
        transform: [
            {
                translateX: counterDisplaytranslateX
            },
            {
                scale: counterDisplayScaleX
            }
        ]
    }
    const decrementBoxtranslateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 0]
    })
    const decrementBoxTransformStyle = {
        transform: [
            {
                translateX: decrementBoxtranslateX
            },
            {
                scale: .7
            }
        ]
    }
    const textChangeScale = tapAnimation.interpolate({
        inputRange: [0, .2, .8, 1],
        outputRange: [1, .8, 1.25, 1]
    })
    const textChangeStyle = {
        transform: [
            {
                scale: textChangeScale
            }
        ]
    }
    return(
        <View style={{flexDirection: 'row'}}>
            <Animated.View style={[styles.counterDisplayStyle, counterDisplayTransformStyle]}>
                <Animated.Text style={[styles.quantityTextStyle, textChangeStyle]}>{counter}</Animated.Text>
            </Animated.View>
            <TouchableWithoutFeedback onPress={decreaseCount}>
                <Animated.View style={[styles.counterDefaultStyle, styles.counterDecrementStyle, decrementBoxTransformStyle]}>
                    <Ionicons name="md-remove" size={32} color="rgb(130, 130, 130)" />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={startCounterAnimation}>
                <Animated.View style={[styles.counterDefaultStyle, styles.counterIncrementStyle, incrementBoxTransformStyle]}>
                    <Ionicons name="md-add" size={32} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    counterDefaultStyle: {
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: .3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        paddingTop: 4
    },
    counterIncrementStyle: {
        backgroundColor: 'rgb(49, 186, 201)',
    },
    counterDecrementStyle: {
        backgroundColor: 'white',
        borderColor: 'rgb(130, 130, 130)',
        borderWidth: 3,
    },
    counterDisplayStyle: {
        backgroundColor: 'rgb(240, 240, 240)',
        borderRadius: 30,
        borderColor: 'rgb(240, 240, 240)',
        borderWidth: 1,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantityTextStyle: {
        fontSize: 28,
        color: 'rgb(130, 130, 130)'
    }
})

export default CounterButton;