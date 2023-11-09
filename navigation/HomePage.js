import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function HomePage() {
    const [email, setEmail] = useState(null)
    const navigation = useNavigation();
    const [password, setPassword] = useState(null)
    useEffect(() => {
        async function fetchDeets() {
            const token = await AsyncStorage.getItem('jwt')
            const decodedToken = jwt_decode(token)
            const { email, password } = decodedToken
            setEmail(email)
            setPassword(password)
        }
        fetchDeets();
    }, [])

    const logout = async () => {
        console.log('Working...')
        await AsyncStorage.removeItem('isloggedin')
        navigation.navigate('Landing')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome To The HomePage, {email}... This is your password: {password}</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
})

export default HomePage;

