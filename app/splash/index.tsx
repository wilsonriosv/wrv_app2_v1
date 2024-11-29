import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

export default function SplashScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/splash2.png")} style={styles.image} />
            <Text style={styles.title}>¡Bienvenido a nuestra App!</Text>
            <Text style={styles.subtitle}>Descubre más sobre el clima y otras características</Text>
            <Button title="Iniciar" onPress={() => navigation.navigate("Login")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" },
    image: { width: 200, height: 200, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#666" },
});
