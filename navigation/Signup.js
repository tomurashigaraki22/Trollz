import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { width, height } = Dimensions.get('window');
    const [wrongEmailType, setwrongEmailtype] = useState(false);
    const [whiteEmailOrPass, setwhiteEmailOrPass] = useState(false);
    const [unknownError, setUnknownErr] = useState(false);
    const navigation = useNavigation();

    const handleSignup = async () => {
        // Handle the signup logic here
        // You can send the user's input to your backend for registration
        const formdata = new FormData();
        try {
            if (email.trim() !== '' && password.trim() !== '') {
                if (password === confirmPassword) {
                    formdata.append('email', email);
                    formdata.append('password', password);
                    if (email.includes('@gmail.com')) {
                        const response = await fetch('http://192.168.1.188:5442/signup', {
                            method: 'POST',
                            body: formdata
                        });
                        const resp2 = await response.json();
                        console.log('Response: ', resp2);
                        const token = resp2.token

                        if (resp2.status == 509) {
                            console.log('Error Wrong email address type')
                            setwrongEmailtype(true)
                            return
                        }
                        else if (resp2.status == 200) {
                            console.log('Signup successful')
                            AsyncStorage.setItem('jwt', token)
                            await AsyncStorage.setItem('jwt', token)
                            const yes = 'Yes'
                            await AsyncStorage.setItem('isloggedin', yes)
                            navigation.navigate('HomePage')
                        }
                        else {
                            console.log('Unknown Error')
                            setUnknownErr(true)
                            return
                        }
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            }
            else {
                console.log('Email and password shouldnt be empty')
                setwhiteEmailOrPass(true)
                return
            }
        } catch (error) {
            console.error(error);
            setUnknownErr(true)
            return
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1920' }}
            style={{ width: width, height: height }}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Create an Account</Text>
                {unknownError && <Text style={styles.connError}>Connection Error... Please try again later</Text>}
                {wrongEmailType && <Text style={styles.connError}>Email must end in @gmail.com...</Text>}
                {whiteEmailOrPass && <Text style={styles.connError}>Email Or password must not be empty</Text>}
                <TextInput
                    style={{
                        width: width - 50,
                        height: 50,
                        borderColor: "#fff",
                        borderWidth: 1,
                        color: 'white',
                        borderRadius: 8,
                        paddingLeft: 10,
                        marginBottom: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    placeholder="Email"
                    placeholderTextColor='white'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{
                        width: width - 50,
                        height: 50,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 10,
                        color: 'white',
                        marginBottom: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    placeholder="Password"
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TextInput
                    style={{
                        width: width - 50,
                        height: 50,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderRadius: 8,
                        color: 'white',
                        paddingLeft: 10,
                        marginBottom: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    placeholder="Confirm Password"
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                />
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Already a user? Login Here</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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
    connError: {
        fontSize: 16,
        color: 'red',
        paddingBottom: 5,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
    },
    loginLink: {
        color: '#fff',
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    signupButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
    },
    signupButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Signup;
