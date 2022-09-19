import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getAsAnswersLikes, getQuantyLikes, postAnswersLikes, deleteAnswersLikes } from "../../services/LikesService"
import StylesLayouts from './StylesLayouts';
import Moment from 'moment';
import { asToken } from '../../services/TokenService';

export default function CardAnswer({ id, title, content, date }) {

    const [quantityState, setQuantityState] = useState();
    const [asLike, setAsLike] = useState(false);

    useEffect(() => {

        asAnswersLikes()
        quantyLikes()

        return () => {
            asAnswersLikes()
            quantyLikes()
        };

    }, [])

    async function asAnswersLikes() {
        try {

            const data = await getAsAnswersLikes(id)

            if (data.message == 'n')
                setAsLike(false)

            else if (data.message == 's')
                setAsLike(true)

        } catch (error) {
            console.log(error);
        }
    }

    async function quantyLikes() {
        try {

            const response = await getQuantyLikes(id, 1)
            setQuantityState(response.count)

        } catch (error) {
            console.log(error);
        }
    }

    async function saveAnswersLikes() {
        try {
            await postAnswersLikes(id)
            asAnswersLikes()
            quantyLikes()

        } catch (error) {
            console.log(error);
        }
    }

    async function removeAnswersLikes() {
        try {
            await deleteAnswersLikes(id)

            asAnswersLikes()
            quantyLikes()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={StylesLayouts.card}>

            <View style={StylesLayouts.viewTitleCard}>

                <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="#19242E" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </Svg>

                <Text style={StylesLayouts.titleCard}> {title} </Text>

            </View>

            <Text style={StylesLayouts.textCard}>{content}</Text>

            <View style={StylesLayouts.viewCardQuantity}>

                <Text>
                    {Moment(date).format('DD/MM/YYYY')}
                </Text>

                <TouchableOpacity
                    onPress={async () => {

                        const asUserToken = await asToken()
                        if (!asUserToken)
                            return alert('Entre ou cadastre-se para curtir uma resposta.')

                        asLike ? removeAnswersLikes() : saveAnswersLikes()
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {asLike ?
                        <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#0AAD7C" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <Path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </Svg>
                        :
                        <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0AAD7C" class="bi bi-heart" viewBox="0 0 16 16">
                            <Path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </Svg>
                    }

                    <Text style={StylesLayouts.textQuantity} >
                        {quantityState}
                    </Text>
                </TouchableOpacity>

            </View>

        </View>);
}


