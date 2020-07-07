import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Context} from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons'; 

const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context);
    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));
  
    console.log(blogPost);
    
    return <View>
        
        <Text>{navigation.getParam('id')}</Text> 
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
    </View>
};

ShowScreen.navigationOptions = ({navigation}) =>{
    return {
    headerRight: () => (
      <TouchableOpacity >
        <EvilIcons name="pencil" size={24} color="black" onPress = {()=>navigation.navigate('Edit', {id:navigation.getParam('id')})}/>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});

export default ShowScreen;