import { useState, useEffect } from "react";
  import {  Text, View, TextInput, Button, StyleSheet } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage"

  type Food= {
    id : string,
    name : string,
    price : string
  }
  export default function Add(){
    const [FoodName,setFoodName] = useState("")
    const [FoodPrice, setFoodPrice] = useState("")
    const [allFood, setAllFood] = useState<Food[]>([])

    useEffect(() => {
      loadFood()
    }, [allFood])

    async function loadFood(){
      const data = await AsyncStorage.getItem("Food")
      if(data !== null){
        setAllFood(JSON.parse(data))
      }
    }

    async function addFood(){
      const Food = {
        id : Date.now().toString(),
        name : FoodName,
        price : FoodPrice
      }

      console.log(Food)

      const newFood = [...allFood, Food]
      await AsyncStorage.setItem("Food", JSON.stringify (newFood))
      setAllFood(newFood)

      setFoodName("")
      setFoodPrice("")

    }

     return(
         <View style={{alignItems:"center",justifyContent:"center",gap:10}}>
              <Text style={{fontWeight:"600"}}>ชื่ออาหารใต้</Text>
              <TextInput 
              value={FoodName}
              onChangeText={setFoodName}
              style={myStyle.input} />
              <Text style={{fontWeight:"600"}}>ราคาอาหารใต้</Text>
              <TextInput 
              value={FoodPrice}
              onChangeText={setFoodPrice}
              style={myStyle.input} />
              <Button title="นำเข้ามา" onPress={() => addFood()} />
         </View>
     )
  }

  const myStyle = StyleSheet.create({
    input : {
      width: "80%",
      borderWidth: 1
    }
  })