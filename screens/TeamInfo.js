import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import app from "../database/firebase";
import { getFirestore, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

const Separator = () => (
  <View style={styles.separator} />
);

const TeamInfo = (props) => {

  const [team, setTeam] = useState({
    name: '',
    country: '',
    league: ''
  });

  const updateTeam = async () => {
    const docRef = doc(db, "Teams", `${props.route.params.teamId}`);
    const data = {
      name: team.name,
      country: team.country,
      league: team.league
    };
    const response = await setDoc(docRef, data);
    props.navigation.navigate('Home');
  }
  
  const deleteTeam = async () => {
    const docRef = doc(db, "Teams", `${props.route.params.teamId}`);
    const response = await deleteDoc(docRef);
    props.navigation.navigate('Home');
  }

  const handleInputChange = (param, value) => {
    setTeam({...team, [param]: value})
  };

  const getTeamById = async (id) => {
    const docRef = doc(db, "Teams", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const teamData = docSnap.data();
      setTeam(teamData);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getTeamById(props.route.params.teamId);
  }, []);

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
      <Button
        title="GUARDAR EQUIPO"
        color="green"
        onPress={updateTeam}
      />
      <Separator />
      <Button
        title="ELIMINAR EQUIPO"
        color="red"
        onPress={deleteTeam}
      />
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
  },
  separator: {
    marginVertical: 5
  }
})

export default TeamInfo;