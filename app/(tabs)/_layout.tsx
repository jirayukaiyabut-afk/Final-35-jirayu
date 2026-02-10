 import { Tabs } from "expo-router";
 import { Ionicons } from "@expo/vector-icons"

export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title:"รายการเมนูทั้งหมด",
                    tabBarIcon: () => (
                        <Ionicons name="home" size={20} color="lightblue" />
                    )
                }}
            />

            <Tabs.Screen
                name="Food"
                options={{
                    title:"เมนูอาหาร",
                    tabBarIcon: () => (
                        <Ionicons name="pizza" size={20} color="lightblue" />
                    )
                }}
            />

            <Tabs.Screen
                name="drink"
                options={{
                    title:"เมนูเครื่องดื่ม",
                    tabBarIcon: () => (
                        <Ionicons name="water" size={20} color="lightblue" />
                    )
                }}
            />
        </Tabs>
    )
 
}