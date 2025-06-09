import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reset-password/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, new_password: newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Password reset successful');
                router.push('/(auth)/login');
            } else {
                Alert.alert('Error', data.message || 'Failed to reset password');
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
                <Text style={styles.title}>Create New Password</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.instruction}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </Text>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder="Enter new password"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder="Confirm password"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.passwordHint}>
                    ✓ Password must be at least 8 character, uppercase, lowercase, and unique code like #!
                </Text>
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