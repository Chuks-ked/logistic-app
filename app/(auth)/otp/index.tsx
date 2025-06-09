import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OTPScreen() {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    };

    const handleSubmit = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 4) {
            Alert.alert('Error', 'Please enter a 4-digit OTP');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/verify-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otpCode }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'OTP verified');
                router.push({ pathname: '/(auth)/reset-password', params: { email } });
            } else {
                Alert.alert('Error', data.message || 'Invalid OTP');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error or server unavailable');
            console.error(error);
        }
    };

    const handleResend = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/resend-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'New OTP sent');
            } else {
                Alert.alert('Error', data.message || 'Failed to resend OTP');
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
                <Text style={styles.title}>OTP Verification</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.instruction}>
                    We've just send you 4 digits code to your email {email}
                </Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendText}>Didn't received code? Resend Code</Text>
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