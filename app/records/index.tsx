import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";

// Define el tipo para los registros
interface Record {
    id: number;
    title: string;
    body: string;
}

export default function RecordsScreen() {
    const [records, setRecords] = useState<Record[]>([]); // Especifica el tipo del estado

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get<Record[]>("https://jsonplaceholder.typicode.com/posts");
                setRecords(response.data);
            } catch (error) {
                console.error("Error fetching records: ", error);
            }
        };
        fetchRecords();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Records</Text>
            <FlatList
                data={records}
                keyExtractor={(item) => item.id.toString()} // TypeScript reconoce que id existe
                renderItem={({ item }) => (
                  <View style={styles.card}>
                      <Text style={styles.cardTitle}>
                          {typeof item.title === "string" ? item.title : "Sin título"}
                      </Text>
                      <Text style={styles.cardDescription}>
                          {typeof item.body === "string" ? item.body : "Sin descripción"}
                      </Text>
                  </View>
              )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
    title: { fontSize: 24, marginBottom: 20 },
    card: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#ddd",
    },
    cardTitle: { fontSize: 18, fontWeight: "bold" },
    cardDescription: { fontSize: 14, color: "#666" },
});
