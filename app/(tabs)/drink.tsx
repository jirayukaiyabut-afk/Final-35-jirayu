import { useState, useEffect } from "react";
  import {  Text, View, TextInput, Button, StyleSheet } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage"

  type drink= {
    id : string,
    name : string,
    price : string
  }
  export default function Add(){
    const [drinkName,setdrinkName] = useState("")
    const [drinkPrice, setdrinkPrice] = useState("")
    const [alldrink, setAlldrink] = useState<drink[]>([])

    useEffect(() => {
      loaddrink()
    }, [alldrink])

    async function loaddrink(){
      const data = await AsyncStorage.getItem("drink")
      if(data !== null){
        setAlldrink(JSON.parse(data))
      }
    }

    async function adddrink(){
      const drink = {
        id : Date.now().toString(),
        name : drinkName,
        price : drinkPrice
      }

      console.log(drink)

      const newdrink = [...alldrink, drink]
      await AsyncStorage.setItem("drink", JSON.stringify (newdrink))
      setAlldrink(newdrink)

      setdrinkName("")
      setdrinkPrice("")

    }

     return(
         <View style={{alignItems:"center",justifyContent:"center",gap:10}}>
              <Text style={{fontWeight:"600"}}>ชื่อเครื่องดื่ม</Text>
              <TextInput 
              value={drinkName}
              onChangeText={setdrinkName}
              style={myStyle.input} />
              <Text style={{fontWeight:"600"}}>ราคาเครื่องดื่ม</Text>
              <TextInput 
              value={drinkPrice}
              onChangeText={setdrinkPrice}
              style={myStyle.input} />
              <Button title="นำเข้ามา" onPress={() => adddrink()} />
         </View>
     )
  }

  const myStyle = StyleSheet.create({
    input : {
      width: "80%",
      borderWidth: 1
    }
  })