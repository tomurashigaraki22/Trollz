import React, { useState } from "react";
import { Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const [wrongEmailType, setwrongEmailtype] = useState(false);
    const [whiteEmailOrPass, setwhiteEmailOrPass] = useState(false);
    const [unknownError, setUnknownErr] = useState(false);

    const handleLogin = async () => {
        // Handle the login logic here
        // You can send the user's input to your backend for authentication
        try {
            const formdata = new FormData();
            if (email.trim() !== '' && password.trim() !== '') {
                formdata.append('email', email)
                formdata.append('password', password)

                const response = await fetch('http://192.168.1.188:5442/login', {
                    method: 'POST',
                    body: formdata,
                })
                const resp2 = await response.json()
                console.log('Response: ', resp2)
                const token = resp2.token

                if (resp2.status == 509) {
                    console.log('Error Wrong email address type')
                    setwrongEmailtype(true)
                    return
                }
                else if (resp2.status == 200) {
                    console.log('Signup successful')
                    await AsyncStorage.setItem('jwt', token)
                    const yes = 'Yes'
                    await AsyncStorage.setItem('isloggedin', yes)
                    navigation.navigate('HomePage')
                }
                else {
                    setUnknownErr(true)
                    console.log('Unknown Error')
                }
            }
            else {
                console.log('Error... Whitespace found')
                setwhiteEmailOrPass(true)
            }
        } catch (error) {
            console.error(error)
        }


    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=1920' }}
            style={{ width: width, height: height }}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Welcome Back!</Text>
                {unknownError && <Text style={styles.connError}>Connection Error... Please try again later</Text>}
                {wrongEmailType && <Text style={styles.connError}>Email must end in @gmail.com...</Text>}
                {whiteEmailOrPass && <Text style={styles.connError}>Email Or password must not be empty</Text>}
                <TextInput
                    style={{
                        width: width - 50,
                        height: 50,
                        borderColor: "#fff",
                        borderWidth: 1,
                        borderRadius: 5,
                        paddingLeft: 10,
                        marginBottom: 10,
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
                        borderRadius: 5,
                        paddingLeft: 10,
                        marginBottom: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    placeholder="Password"
                    placeholderTextColor='white'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupLink}>Dont have an account? Sign up Here</Text>
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
    loginButton: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
    },
    loginButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupLink: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
});

export default Login;
