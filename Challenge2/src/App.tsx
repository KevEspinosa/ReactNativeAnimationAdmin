import * as React from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Switch,
    Dimensions
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
const EntypoIcon = Animated.createAnimatedComponent(Entypo)

const PaymentSync = () => {
    const [paymentEnabled, changePaymentEnabled] = React.useState(false);
    const [paymentAnimation] = React.useState(new Animated.Value(0));

    const onPaymentValueChange = () => {
        const toValue = paymentEnabled ? 0 : 1;
        changePaymentEnabled(!paymentEnabled);
        Animated.timing(paymentAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const renderPaymentCard = () => {
        const { width } = Dimensions.get("window")
        const paymentBubbleScaleInterpolate = paymentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 100]
        })
        const paymentBubbleColor = paymentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgb(255, 255, 255)', 'rgb(36, 173, 251)']
        })
        const paymentTextInterpolate = paymentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['black', 'white']
        })

        const paymentTextColorStyle = {
            color: paymentTextInterpolate
        }
        const paymentBubbleTransformStyle = {
            transform: [
                {
                    scale: paymentBubbleScaleInterpolate
                }
            ]
        }
        const paymentBubbleColorStyle = {
            backgroundColor: paymentBubbleColor
        }
        return (
            <View style={[styles.card, {width: width, marginBottom: 1,}]}>
                <Animated.View style={[styles.bubbleStyle, paymentBubbleTransformStyle, paymentBubbleColorStyle]}/>
                <Animated.Text style={[styles.mainHeadingStyle, paymentTextColorStyle]}>Payment</Animated.Text>
                <Animated.Text style={[paymentTextColorStyle, styles.subHeadingStyle]}>Enable FingerPrint Payment. Make payments using the fingerprint sensor.</Animated.Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: "100%"}}>
                    <EntypoIcon name="fingerprint" size={42} color="black" style={[paymentTextColorStyle, {backgroundColor: 'transparent'}]}/>
                    <Switch
                        value={paymentEnabled}
                        onValueChange={onPaymentValueChange}
                        onTintColor="rgb(66, 203, 251)"
                    />
                </View>
            </View>
        )

    }
    const { width } = Dimensions.get("window")
    return(
        <View style={{flex: 1}}>
            <View style={{zIndex: 10, height: '25%', width, backgroundColor: 'rgb(240, 240, 240)' }}/>
            {renderPaymentCard()}
            <View style={{zIndex: 10, height: '25%', width, backgroundColor: 'rgb(240, 240, 240)' }}/>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultHeading: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainHeadingStyle: {
        fontSize: 28,
        backgroundColor: 'transparent'
    },
    bubbleStyle: {
        width: 15,
        height: 15,
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    subHeadingStyle: {
        textAlign: 'center',
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    card: {
        height: "50%",
        width: "80%",
        backgroundColor: 'white',
        shadowOpacity: .4,
        shadowOffset: {width: 0, height: 2},
        shadowColor: 'black',
        shadowRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default PaymentSync;