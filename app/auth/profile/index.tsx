import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();
                if (response.ok) {
                    setProfile(data);
                } else {
                    Alert.alert('Error', data.message || 'Failed to fetch profile');
                }
            } catch (error) {
                Alert.alert('Error', 'Network error or server unavailable');
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {profile ? (
                <View>
                    <Text>Name: {profile.name || 'Not available'}</Text>
                    <Text>Email: {profile.email || 'Not available'}</Text>
                    <Text>Phone: {profile.phone || 'Not available'}</Text>
                </View>
            ) : (
                <Text>Loading profile...</Text>
            )}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backArrow}>← Back</Text>
            </TouchableOpacity>
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