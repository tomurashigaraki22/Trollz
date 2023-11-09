import React from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Landing = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1920' }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Welcome to Trollz</Text>
                <Text style={styles.subHeader}>Your One-Stop E-commerce Destination</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 40,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    subHeader: {
        textAlign: "center",
        fontSize: 18,
        color: "#fff",
        marginBottom: 30,
    },
});

export default Landing;
