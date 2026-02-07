import { useState, useEffect } from "react";
  import {  Text, View,FlatList, TouchableOpacity, StyleSheet } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage"
 import Index from '../../scripts/reset-project';

  type Food = {
    id : string,
    price : string
  }
  export default function Home(){
   const [allFood, setAllFood] = useState<Food[]>([])

    useEffect(() => {
      loadFood()
    }, [])

    async function loadFood(){
      const data = await AsyncStorage.getItem("Food")
      if(data !== null){
        setAllFood(JSON.parse(data))
      }
    }

    async function  removeFood(id:string) {
      const newFood = allFood.filter((_, i) => _.id != id)
      await AsyncStorage.setItem("Food", JSON.stringify(newFood))
      setAllFood(newFood)
    }

     return(
         <View>

             <FlatList
               data={allFood}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({item})=>(
               <View style={myStyle.box1}>
                  <Text style={{fontWeight:"600"}}>อาหาร : {item.id}</Text>
                  <Text style={{fontWeight:"600"}}>ราคา : {item.price}</Text>
                  <TouchableOpacity style={myStyle.rebutton} onPress={() => removeFood(item.id)}>
                     <Text style={{color:"white",fontWeight:"800"}}>ลบ</Text>
                  </TouchableOpacity>
               </View>
               )}
             />                 

         </View>
     )
  }

  const myStyle = StyleSheet.create({
    rebutton:{
      width:"80%",
      height:35,
      backgroundColor:"#FF6666",
      alignItems:"center",
      justifyContent:"center"
    },
    box1:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      gap:10
    }
  })