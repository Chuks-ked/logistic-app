import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('example@example.com');

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/forgot-password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'OTP sent to your email');
                router.push({ pathname: '/otp', params: { email } });
            } else {
                Alert.alert('Error', data.message || 'Failed to send OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error or server unavailable');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Forgot Password</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.instruction}>
                    Input your linked email to your Movees account below, we'll send you a link
                </Text>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="example@example.com"
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2526',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        paddingRight: 10,
    },
    backArrow: {
        color: '#F5A623',
        fontSize: 18,
    },
    title: {
        color: '#F5A623',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    form: {
        padding: 20,
    },
    instruction: {
        color: '#F5A623',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 16,
    },
    label: {
        color: '#F5A623',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
        color: '#000',
        borderWidth: 1,
        borderColor: '#fff',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        textAlign: 'center',
        marginHorizontal: 5,
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        backgroundColor: '#F5A623',
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendText: {
        color: '#F5A623',
        textAlign: 'center',
        marginTop: 10,
    },
    passwordHint: {
        color: '#32CD32',
        fontSize: 14,
        marginBottom: 20,
    },
});