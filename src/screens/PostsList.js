import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, useWindowDimensions, ActivityIndicator, Image, RefreshControl, TouchableOpacity } from 'react-native';
import pidea from '../api/pidea';
import RenderHtml from 'react-native-render-html';

const PostsList = ( {navigation} ) => {
    // console.log(navigation);
    const [isLoading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const api = async () => {
        try {
            const response = await pidea.get('/?per_page=15&_embed')
            setRefreshing(false);
            setResults(response);
            
        } catch (err) {
            console.log(err);
        } finally {
            
            setLoading(false);
        }
    };

    useEffect(() => {
        api();
    },[]);
    
    const onRefresh = () => {
        setRefreshing(true);
        setLoading(true);
        setResults([]);
        api();
    };
    
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.8,
              width: '100%',
              backgroundColor: '#000000',
              marginBottom: 10,
              marginTop: 10
            }}
          />
        );
      };
    
    const { width } = useWindowDimensions();
    return (
        <View>
            <Text style={{fontSize: 18, alignSelf: 'center'}}>ΠΑΝΙΩΝΙΑ ΙΔΕΑ</Text>
            { isLoading ? <ActivityIndicator animating={true} size="large" style={{opacity:1}} color="#db0020" /> : (
                <FlatList
                data={results.data}
                keyExtractor={result=>result.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{flex: 1}} onPress={ () => navigation.navigate('Post', {id: item.id, title: item.title.rendered, image: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url, content: item.content.rendered }) }>
                        <RenderHtml
                        contentWidth={width}
                        source={{html: item.title.rendered}}
                        />
                        <Image
                        style={{height:200}}
                        source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url}}
                        />
                        </TouchableOpacity>
                    )
                }}
                ItemSeparatorComponent={ItemSeparatorView}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      tintColor="#dd0020"
                    />
                }
            />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default PostsList;