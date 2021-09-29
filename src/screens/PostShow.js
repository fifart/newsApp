import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
const PostShow = ({ route }) => {
    const { id, title, image, content } = route.params;
    const { width } = useWindowDimensions();
    return (
        <ScrollView>
        <View style={{flex: 1, marginBottom: 20, padding: 10}}>
            <RenderHtml
                contentWidth={width}
                source={{html: title}}
            />
            <Image 
            style={{height:200}}
            source={{uri: image}} />
            <RenderHtml
                contentWidth={width}
                source={{html: content}}
            />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({});

export default PostShow;