import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Images from './images/Index';

const PhotoInfo = () => {
    const [activeImage, changeActiveImage] = React.useState<any>(null);
    const [animation] = React.useState(new Animated.Value(0));

    const handleImageOpen = (index: number) => {
        changeActiveImage(Images[index]);
        Animated.spring(animation, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true
        }).start();
    }

    const handleClose = () => {
        changeActiveImage(null)
        Animated.spring(animation, {
            toValue: 0,
            friction: 10,
            useNativeDriver: true
        }).start()
    }
    const interpolatePopHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["20%", "70%"]
    })

    const interpolatePopWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["20%", "90%"]
    })

    const popImageOpacityInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    const popImageZIndexInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    })

    const popImageStyle = {
        height: interpolatePopHeight,
        width: interpolatePopWidth
    }

    const popImageOpacityStyle = {
        opacity: popImageOpacityInterpolate,
        zIndex: popImageZIndexInterpolate
    }

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {
                    Images.map((src, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => handleImageOpen(index)}
                            >
                                <Image
                                    source={src}
                                    resizeMode="cover"
                                    style={styles.photoStyle}
                                />
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
            <TouchableWithoutFeedback onPress={handleClose}>
                <Animated.View style={[StyleSheet.absoluteFill, styles.popStyle, popImageOpacityStyle]}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.popImageStyle, popImageStyle]}>
                            <View style={styles.photoDetailBar}>
                                <Image
                                    source={Images[3]}
                                    style={styles.userIconImage}
                                />
                                <Text>Kuldeep Singh Grewal</Text>
                            </View>
                            <Image
                                style={styles.photo}
                                resizeMode="stretch"
                                source={activeImage}
                            />
                            <View style={styles.photoInteractions}>
                                <EvilIcons name="heart" size={32} color="grey"/>
                                <EvilIcons name="comment" size={32} color="grey"/>
                                <EvilIcons name="share-apple" size={32} color="grey"/>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    photoStyle: {
        width: "33%",
        height: 150,
        zIndex: 1
    },
    popStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    popImageStyle: {
        backgroundColor: 'white',
        height: 0,
        width: 0,
    },
    userIconImage: {
        height: 25,
        width: 25,
        borderRadius: 15,
        marginRight: 10
    },
    photoDetailBar: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    },
    photo: {
        flex: 6,
        width: 0,
        height: 0,
    },
    photoInteractions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgb(230, 230, 230)'
    }
})

export default PhotoInfo;