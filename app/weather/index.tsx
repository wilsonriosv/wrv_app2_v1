import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, TextInput, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons"; // Importa los íconos

const WEATHER_API_KEY = "247487e5a528ef75401a2aa4016916c8"; // Reemplaza con tu propia API key de OpenWeatherMap

interface City {
    city: string;
    temperature: number;
    id: number;
}

export default function WeatherScreen() {
    const [cities, setCities] = useState<City[]>([]);
    const [newCity, setNewCity] = useState<string>("");

    const getWeatherForCity = async (cityName: string): Promise<City | null> => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
            );
            return {
                city: response.data.name,
                temperature: response.data.main.temp,
                id: response.data.id,
            };
        } catch (error) {
            Alert.alert("Error", "No se pudo obtener la información del clima para esta ciudad.");
            return null;
        }
    };

    const addCity = async () => {
        if (!newCity) {
            Alert.alert("Error", "Por favor ingresa el nombre de una ciudad.");
            return;
        }

        const cityData = await getWeatherForCity(newCity);
        if (cityData) {
            setCities([...cities, cityData]);
            setNewCity(""); // Limpiar el campo de entrada
        }
    };

    const removeCity = (cityId: number) => {
        setCities(cities.filter((city) => city.id !== cityId));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clima</Text>

            <TextInput
                style={styles.input}
                value={newCity}
                onChangeText={(text) => setNewCity(text)}
                placeholder="Agregar ciudad"
            />
            <Button title="Agregar Ciudad" onPress={addCity} />

            <FlatList
                data={cities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cityCard}>
                        {/* Contenedor de la información de la ciudad */}
                        <View style={styles.cityInfo}>
                            <Text style={styles.cityName}>{item.city}</Text>
                            <Text style={styles.cityTemperature}>{item.temperature}°C</Text>
                        </View>
                        {/* Botón eliminar */}
                        <TouchableOpacity onPress={() => removeCity(item.id)}>
                            <FontAwesome name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 10,
    },
    cityCard: {
        flexDirection: "row", // Organiza los elementos en una fila
        justifyContent: "space-between", // Espacia los elementos entre sí
        alignItems: "center", // Centra verticalmente
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ddd",
    },
    cityInfo: {
        flex: 1, // Toma el espacio restante
    },
    cityName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cityTemperature: {
        fontSize: 16,
        color: "#666",
    },
});
