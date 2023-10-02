// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const App = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterImage, setCharacterImage] = useState(null);

  const fetchCharacterData = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const character = data.results[0];
        setCharacterImage(character.image);
      } else {
        setCharacterImage(null);
      }
    } catch (error) {
      console.error('Error fetching character data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rick and Morty Guide</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del personaje"
        value={characterName}
        onChangeText={(text) => setCharacterName(text)}
        placeholderTextColor="#aaa" // Color de texto de marcador de posición
      />

      <Button title="Buscar" onPress={fetchCharacterData} color="#4CAF50" />

      {characterImage && (
        <Image source={{ uri: characterImage }} style={styles.characterImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Fondo oscuro
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50', // Color de texto verde
  },
  input: {
    height: 40,
    borderColor: '#4CAF50', // Borde verde
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
    color: '#fff', // Color de texto blanco
  },
  characterImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10, // Bordes redondeados
  },
});

export default App;
