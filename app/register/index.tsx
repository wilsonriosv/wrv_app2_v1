import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const auth = getAuth();

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.updateProfile({ displayName: name }); // Actualizar nombre de usuario
                Alert.alert("Éxito", "Usuario registrado con éxito");
                navigation.replace("Home");
            })
            .catch((error) => Alert.alert("Error", error.message));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
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
            <Button title="Registrar" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
    input: { height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
});
