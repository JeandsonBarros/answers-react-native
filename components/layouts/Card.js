
import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import StylesLayouts from '../styles/StylesLayouts';
import Styles from '../styles/Styles';

export default function Card({ id, title, content, icon, getQuantity }) {

    const [quantityState, setQuantityState] = useState();

    useEffect(() => {

        getQuantity(id, 1).then(response => {

            setQuantityState(response.count)
        })

    }, [])

    return (
        <View style={StylesLayouts.card}>

            <View style={StylesLayouts.viewTitleCard}>

                <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="#19242E" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </Svg>

                <Text style={StylesLayouts.titleCard}> {title} </Text>

            </View>

            <Text style={StylesLayouts.textCard}>{content}</Text>

            <TouchableOpacity
                style={StylesLayouts.viewCardQuantity}
                
            >

                {icon}

                <Text style={StylesLayouts.textQuantity} >
                    {quantityState}
                </Text>

            </TouchableOpacity>

        </View>);
}


