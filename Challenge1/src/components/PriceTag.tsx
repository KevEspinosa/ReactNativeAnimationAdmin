import * as React from 'react';
import {Text, StyleSheet} from 'react-native';

const PriceTag = () => {
    return(
        <Text style={styles.priceText}>$29</Text>
    )
}

const styles = StyleSheet.create({
    priceText: {
        fontSize: 48,
        fontWeight: '300',
        color: 'rgb(130, 130, 130)'
    }
})

export default PriceTag;