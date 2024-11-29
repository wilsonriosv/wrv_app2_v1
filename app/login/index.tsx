import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => navigation.replace("Home")) // Navegar a Home al iniciar sesión
            .catch((error) => Alert.alert("Error", error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Ingresar" onPress={handleLogin} />
            <Button
                title="Crear Cuenta"
                onPress={() => navigation.navigate("Register")}
                color="#4caf50"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: { height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
});
