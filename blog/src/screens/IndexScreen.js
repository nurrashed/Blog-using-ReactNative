
import React, {useContext, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';

import {Context} from '../context/BlogContext';
import { Feather } from '@expo/vector-icons'; 


const IndexScreen = ({navigation}) =>{
    const {state, deleteBlogPost, getBlogPosts} = useContext(Context);

    useEffect(()=>{
        getBlogPosts();

        const listener = navigation.addListener('didFocus', ()=>{
            getBlogPosts();
        });

        return () =>{
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList 
                data = {state}
                keyExtractor = {(blogPosts) => blogPosts.title }
                renderItem = { ({item}) => {
                    return (
                        <TouchableOpacity onPress = {() =>navigation.navigate('Show', {id: item.id})}>
                            <View style = {styles.row}>
                                <Text style = {styles.text}>{item.title}  --  {item.id}</Text>
                                <TouchableOpacity onPress = {() =>deleteBlogPost(item.id)}>
                                    <Feather style = {styles.icon} name="trash-2"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                } }
            />
        </View>
    )
};

IndexScreen.navigationOptions = ({navigation}) =>{
    return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderColor: 'black',        
        borderBottomWidth: 1,
        paddingHorizontal: 15

    },
    text:{
        fontSize: 16,        
    },
    icon:{
        fontSize: 24
    }
});

export default IndexScreen;