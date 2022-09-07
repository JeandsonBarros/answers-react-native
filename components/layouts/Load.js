import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text } from 'react-native';

function Load() {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeIn()
    }, [])

    function fadeIn() {

        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    delay: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]),

        ).start()
    };

    return (
        <Animated.View
            style={[
                {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                {
                    // Bind opacity to animated value
                    opacity: fadeAnim
                }
            ]}
        >

            <Text style={{

                color: '#0AAD7C',
                fontSize: 90,
                alignItems: 'center',
                justifyContent: 'center'
            }} >?</Text>

        </Animated.View>
    );
}

export default Load;