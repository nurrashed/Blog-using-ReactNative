import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';

const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return <View>
        <Text style = {styles.text}>Enter Title</Text>
        <TextInput style = {styles.input} value = {title} onChangeText = {(text) => setTitle(text)}/>
        <Text style = {styles.text}>Enter Content</Text>
        <TextInput style = {styles.input} value = {content} onChangeText = {(text) => setContent(text)}/>
        <Button 
            title = 'Save Blog Post'
            onPress = {()=> onSubmit(title, content)}
        />
    </View>
};

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    text:{
        textTransform: 'uppercase',
        fontSize: 18,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom:10,
    },
    input:{
        borderWidth: 1,
        borderColor: 'black', 
        fontSize: 18,
        marginBottom: 15,
        padding: 5,
        marginLeft: 5
    }
});

export default BlogPostForm;