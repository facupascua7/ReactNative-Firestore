import { React, useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import app from "../database/firebase";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

const db = getFirestore(app);
// addDoc
const dbRef = collection(db, "Teams");
// setDoc
// const dbRef = doc(db, "cities", "id-inventado");

const CreateTeam = (props) => {

  const [team, setTeam] = useState({
    name: '',
    country: '',
    league: ''
  });

  const [id, setId] = useState(0);

  useEffect(() => {
    setId(props.route.params.userId);
  })
 
  const handleInputChange = (param, value) => {
    setTeam({...team, [param]: value})
  };

  const saveTeam = () => {
    if (team.name === '') {
      console.log("Falta el nombre");
    } else {
      const data = {
        name: team.name,
        country: team.country,
        league: team.league
      };
      addDoc(dbRef, data)
        .then(docRef => {
          console.log("Document has been added successfully");
        })
        .catch(error => {
          console.log(error);
        })
      props.navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          onChangeText={name => handleInputChange("name", name)}
          value={team.name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={country => handleInputChange("country", country)}
          value={team.country}
          placeholder="Country"
        />
        <TextInput
          style={styles.input}
          onChangeText={league => handleInputChange("league", league)}
          value={team.league}
          placeholder="League"
        />
      </View>
      <Button title="Save team" color="black" onPress={saveTeam}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAEBD7',
    padding: 10
  },
  inputs: {
    marginVertical: 15
  },
  input: {
    padding: 5,
    marginVertical: 5,
    borderWidth: .5,
    borderColor: 'black',
    borderRadius: 10
  }
})

export default CreateTeam;