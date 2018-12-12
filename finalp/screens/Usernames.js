import React from 'react';
import {
  Image,
  AppRegistry,
  TextInput,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


//https://codeburst.io/js-data-structures-linked-list-3ed4d63e6571

class LinkedList {
  constructor(value) {
      this.head = null;
      this.length = 0;
  }

  
  addToHead(value) {
      const newNode = { value };
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
      return this;
  }
  
  removeFromHead() {
      if (this.length === 0) {
          return undefined;
      }
      
      const value = this.head.value;
      this.head = this.head.next;
      this.length--;
      
      return value;
  }

  
  

  //made changes to this - find is now print 
  print() {
      let thisNode = this.head;
      let userList = "";
      
      while(thisNode) {
          if(typeof thisNode.value === 'undefined'){
            thisNode = thisNode.next;
          }
          else{
          userList += thisNode.value + " ";
          thisNode = thisNode.next;
          }
      }
      
      return userList;
  }
  
  remove(val) {
      if(this.length === 0) {
          return undefined;
      }
      
      if (this.head.value === val) {
          return this.removeFromHead();
      }
      
      let previousNode = this.head;
      let thisNode = previousNode.next;
      
      while(thisNode) {
          if(thisNode.value === val) {
              break;
          }
          
          previousNode = thisNode;
          thisNode = thisNode.next;
      }
      
      if (thisNode === null) {
          return undefined;
      }
      
      previousNode.next = thisNode.next;
      this.length--;
      return this;
  }


}

let ll = new LinkedList();


export default class Usernames extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username: '' ,
    initializer: false
      };
  }


  /*
  handles text render
  handleUsername = (text) => {
    this.setState({username: text})
  }

  */ 


  static navigationOptions = {
    header: null,
  };
  



  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <Button onPress={() => this._generateUsers()}
            title = "Generate List"
            />
            <Button onPress={() => this._removeFromHeadButton()}
            title = "Remove from head"
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
              Generate a list of users, remove from head, add a username, or delete a username.
            </Text>
          </View>


                <View style={{padding: 10, }}>
                  <TextInput
                    style={{height: 40, color: '#A9A9A9'}}
                    placeholder="Touch here to input a username!"
                    textAlign={'center'}
                    placeholderTextColor="#A9A9A9" 
                    returnKeyLabel = {"next"}
                    onChangeText={(text) => this.setState({username:text})}
                  />
                </View>

                    <View style = {{flexDirection: "row", justifyContent: 'space-between'}}>
                        <Button onPress={() => this._addToListButton()}
                        title = "Add to List"
                        />
                        <Button onPress={() => this._removeFromListButton()}
                        title = "Remove from List"
                        />
                    </View>

          <View style = {styles.userListContainer}>
                <Text style={styles.userListText}>{this._maybeRenderUsernameList()}
                </Text>
          </View>

        </ScrollView>
      </View>
    );
  }


  _removeFromHeadButton(){

    ll.removeFromHead();

    this.forceUpdate();
  }





  _generateUsers(){

    this.setState({initializer:true});

    //Sample Users
    ll.addToHead('mroling');
    ll.addToHead('semmonds');
    ll.addToHead('kroling');
    ll.addToHead('knagley');
    ll.addToHead('broberts');
    ll.addToHead('bkurilko');
    ll.addToHead('dpawlak');
    ll.addToHead('thalling');
    ll.addToHead('dfrantz');
    ll.addToHead('tjbearse');
    ll.addToHead('amelk');

    this.forceUpdate();
  }

  _removeFromListButton(){

    //check for blank form
    if(this.state.username === ""){
      alert('You didnt enter anything Shane.')
    }

    else{

    let username = this.state.username;
    ll.remove(username);

    alert('You removed ' + username + ' from the list.')
    }

    this.forceUpdate();
  }  


  _addToListButton(){


    //check for blank form
    if(this.state.username === ""){
      alert('You didnt enter anything Shane.')
    }

    else{
    this.setState({initializer:true});

    let username = this.state.username;
      ll.addToHead(username);
    }

    console.log(this.state.initializer);

  }



    //  for (i = 1; i < ll.length; i++){
     //   <Text>{ll.head.value}</Text>
     //   console.log(ll.head.value);
    //  }

    //  console.log(ll.head.value);


    

    _maybeRenderUsernameList() 
    {

      if (this.state.initializer === true){
        console.log(ll.print());
        console.log(typeof ll.print());
        let string = ll.print();
        return (
          <Text>{string}</Text>
        );
      }

    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  userListContainer: {
    textAlign:'center',
    color: '#A9A9A9',
  },
  userListText:{
    paddingTop: 50,
    textAlign:'center',
    color: '#A9A9A9',
    fontSize: 18,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    padding:30
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
