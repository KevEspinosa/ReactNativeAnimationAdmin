import * as React from 'react';
import {View, StyleSheet,} from 'react-native';

interface IProps {
    width: string
    height: number
}

const GreyBar = (props: IProps) => {
    return(
        <View style={[styles.greyContent, {width: props.width, height: props.height}]}/>
    )
}

const styles = StyleSheet.create({
    greyContent: {
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'rgb(201, 205, 213)',
        borderRadius: 5,
    }
})

export default GreyBar;