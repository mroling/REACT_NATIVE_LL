import React from 'react';
import { ScrollView, StyleSheet,TextInput,Button,View,Text } from 'react-native';


//******************************************************************************** 
//*********https://www.geeksforgeeks.org/merge-sort-linked-lists-javascript/******
//********************************************************************************

// Create Node of LinkedList 
function Node(data) { 
  this.node = data; 
  this.next = null; 
} 

// To initialize a linkedlist 
function LinkedList(list) { 
this.head = list || null
} 

// Function to insert The new Node into the linkedList 
LinkedList.prototype.insert = function(data) { 


    
    // Check if the linked list is empty 
    // so insert first node and lead head 
    // points to generic node 
    if (this.head === null) 
        this.head = new Node(data); 

    else { 

        // If linked list is not empty, insert the node 
        // at the end of the linked list 
        let list = this.head; 
        while (list.next) { 
            list = list.next; 
        } 

        // Now here list pointer points to last 
        // node let’s insert out new node in it 
        list.next = new Node(data) 
    } 
} 

// Returns string of 
LinkedList.prototype.iterate = function() { 

      let tempNode = this.head;
      let userList = "";
      
        while(tempNode) {
            userList += tempNode.node + " ";
            tempNode = tempNode.next;
            }
        
      
      return userList;


    // we will iterate until our list variable 
    // contains the “Next” value of the last Node 
    // i.e-> null 
    //while (list) { 
    //    document.write(list.node)  
    //    if (list.next) 
    //        document.write(' -> ') 
    //    list = list.next 
    //} 
} 

// Function to mergesort a linked list 
LinkedList.prototype.mergeSort = function(list) { 
  
    if (list.next === null) 
        return list; 

    let count = 0; 
    let countList = list 
    let leftPart = list; 
    let leftPointer = list; 
    let rightPart = null; 
    let rightPointer = null; 

    // Counting the nodes in the received linkedlist 
    while (countList.next !== null) { 
        count++; 
        countList = countList.next; 
    } 

    // counting the mid of the linked list 
    let mid = Math.floor(count / 2) 
    let count2 = 0; 

    // separating the left and right part with 
    // respect to mid node in tke linked list 
    while (count2 < mid) { 
        count2++; 
        leftPointer = leftPointer.next; 
    } 

    rightPart = new LinkedList(leftPointer.next); 
    leftPointer.next = null; 

    // Here are two linked list which 
    // contains the left most nodes and right 
    // most nodes of the mid node 
    return this._mergeSort(this.mergeSort(leftPart), 
                           this.mergeSort(rightPart.head)) 
} 

// Merging both lists in sorted manner 
LinkedList.prototype._mergeSort = function(left, right) { 

    // Create a new empty linked list 
    let result = new LinkedList() 

    let resultPointer = result.head; 
    let pointerLeft = left; 
    let pointerRight = right; 

      
    // If true then add left most node value in result, 
    // increment left pointer else do the same in 
    // right linked list. 
    // This loop will be executed until pointer's of 
   // a left node or right node reached null 
    while (pointerLeft && pointerRight) { 
        let tempNode = null; 

       // Check if the right node's value is greater than 
       // left node's value 
        if (pointerLeft.node > pointerRight.node) { 
            tempNode = pointerRight.node 
            pointerRight = pointerRight.next; 
        } 
        else { 
            tempNode = pointerLeft.node 
            pointerLeft = pointerLeft.next; 
        } 

        if (result.head == null) { 
            result.head = new Node(tempNode) 
            resultPointer = result.head 
        } 
        else { 
            resultPointer.next = new Node(tempNode) 
            resultPointer = resultPointer.next 
        } 
    } 

    // Add the remaining elements in the last of resultant 
    // linked list 
    resultPointer.next = pointerLeft; 
    while (resultPointer.next) 
        resultPointer = resultPointer.next 

        resultPointer.next = pointerRight 

    // Result is  the new sorted linked list 
     return result.head; 
} 

//Initalize LL

let linkedNumbList = new LinkedList(); 



export default class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    numberInput: '' ,
    displayList: false
      };
  }
  static navigationOptions = {
    title: 'Merge Sort',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
            <TextInput
                style={{height: 40}}
                placeholder="Type here to add a number!"
                returnKeyLabel = {"next"}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({numberInput:text})}
            />
                  <Button onPress={() => this._generateListButton()}
                  title = "Generate a Sample Unsorted List"
                  />
                  <Button onPress={() => this._addToListButton()}
                  title = "Add to List"
                  />
                  <Button onPress= {() => this._mergeSortButton()}
                  title = "Mergesort"
                  />

            <View style = {styles.getStartedContainer}>
          {this._maybeRenderNumberList()}

          </View>
                  
      </ScrollView>
    );
  }

  _generateListButton(){

    this.setState({displayList:true});

    //RNG for Unsorted List
    for(i = 0;i<20; i++){
        let randNum = Math.floor(Math.random() * 100); 
        linkedNumbList.insert(randNum);
    }

  }

  _mergeSortButton(){
    linkedNumbList.head = LinkedList.prototype.mergeSort(linkedNumbList.head);
    this.forceUpdate();
  }

  _addToListButton(){

    //check for blank form
    if(this.state.numberInput === ""){
      alert('You didnt enter anything Shane.')
    }

    else{
    this.setState({displayList:true});

    let numberInput = parseInt(this.state.numberInput);
    linkedNumbList.insert(numberInput);
    }

  }

  _maybeRenderNumberList() {
    
      if (this.state.displayList === true){
        let string = linkedNumbList.iterate();
        return (
          <Text>{string}</Text>
        );
      }

  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});
