import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('Example');
    const [phone, setPhone] = useState('+234');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (!name || !phone || !email || !location || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, email, location, password }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Signup successful!');
                router.push('/(auth)/login');
            } else {
                Alert.alert('Error', data.message || 'Signup failed');
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
                <Text style={styles.title}>SIGNUP</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Example"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.label}>phonenumber</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="+234"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.label}>email address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="example@email.com"
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                />
                <Text style={styles.label}>location</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter password"
                    placeholderTextColor="#ccc"
                />
                <Text style={styles.passwordHint}>
                    ✓ Password must be at least 8 character, uppercase, lowercase, and unique code like #!
                </Text>
                <Text style={styles.termsText}>
                    By click the agree and continue button, you're agree to Ifastlsquare Terms and Service and
                    acknowledge the Privacy and Policy
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Agree and continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2526',
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
    },
    form: {
        padding: 20,
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
    passwordHint: {
        color: '#32CD32',
        fontSize: 14,
        marginBottom: 20,
    },
    termsText: {
        color: '#ccc',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
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
});