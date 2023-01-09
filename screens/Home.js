import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { ListItem } from "react-native-elements";
import app from "../database/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const dbRef = collection(db, "Teams");

const Home = (props) => {

  const isFocused = useIsFocused();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const data = await getDocs(dbRef);
      const aux = [];
      data.forEach(team => {
        const { name, league, country } = team.data();
        aux.push({
          id: team.id,
          name,
          country,
          league
        });
      })
      setTeams(aux);
      return;
    }
    fetchData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teams in database</Text>
      <View style={styles.teams}>
      {
        teams.map((team) => {
          return (
            <View style={styles.team}>
              <TouchableOpacity onPress={() => props.navigation.navigate('TeamInfo', { teamId: team.id })}>
                <ListItem 
                  key={team.id}
                  bottomDivider>
                  <ListItem.Chevron />
                  <ListItem.Content>
                    <ListItem.Title>{team.name}</ListItem.Title>
                    <ListItem.Subtitle>{team.id}</ListItem.Subtitle>
                    <ListItem.Subtitle>{team.country}</ListItem.Subtitle>
                    <ListItem.Subtitle>{team.league}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            </View>
          );
        })
      }
      </View>
      <Button 
        title='Create a Team'
        color='blue'
        onPress={() => props.navigation.navigate('CreateTeam', {
          userId: 1
        })}
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
  text: {
    marginTop: 10
  },
  teams: {
    marginVertical: 15
  },
  team: {
    marginVertical: 2
  }
})

export default Home;