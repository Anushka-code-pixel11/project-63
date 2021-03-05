import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ShadowPropTypesIOS
} from 'react-native';

class HomeScreen extends React.Component {
    getWord = (word) => {
        var searchKeyword = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json/" + searchKeyword +".json"
        return fetch(url)
        .then((data) => { 
            if(data.status === 200)
            {
                return data.json()
            }
            else {
                return null
            }
        })
        .then((response) => {
            //console.log(response);

            var responseObject = response
            //var word = responseObject.word
            //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCateogry.text
            if(responseObject) 
            {
                var wordData = responseObject.definitions[0]
                //console.log(responseObject[0]);
                var definition = wordData.description
                var lexicalCategory = wordData.wordType
                //conosle.log(lexicalCategory);
                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory

                });
            }
            else 
            {
                this.setState({
                    "word": this.state.text,
                    "definition": "not found"
                });
            }
        })
    }
    render(){
        return(
            <View> 
                <TextInput 
                    style = {styles.container}
                    onChangeText = {text => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            word: "loading.....",
                            lexicalCategory: " ",
                            expamles: [],
                            defination: " "
                        });
                    }}
                    value = {this.state.text}
                />

                <View> 
                    <TouchableOpacity 
                        style = {styles.searchButton}
                        onPress = {() => {
                            this.setState({ isSearchPressed: true});
                            this.getWord;{this.state.text}
                        }}> 
                    </TouchableOpacity>
                </View>

                <View style = {styles.detailsContainer}>
                    <Text style = {styles.detailsTitle}>
                        Word: {" "}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.word}
                    </Text>
                </View>

                <View style = {styles.detailsContainer}>
                    <Text style = {styles.detailsTitle}>
                        Type = {" "}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style = {{flexDirection: 'row',flexWrap: 'wrap'}}>
                    <Text style = {styles.detailsTitle}>
                        Definition: {" "}
                    </Text>
                    <Text style = {{fontSize: 18}}>
                        {this.state.definition}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchButton: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer:{
        
    },
    detailsTitle: {

    }
})

export default HomeScreen;