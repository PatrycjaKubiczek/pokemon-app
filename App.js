import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { BarCodeScanner, Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, Button } from 'react-native-paper';

class PokemonCard extends React.Component {
  state = {
    loading: true,
  };
  
  componentDidMount() {
    this.loadPokemon(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPokemon(nextProps.id);
  }

  loadPokemon(id) {
    const result = fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      .then(response => {
        response.json().then(json => {
          this.setState({
            name: json.name,
            imageUrl: json.sprites.front_default,
          });
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <Card>
        <Text style={styles.paragraph}>{this.state.name}</Text>
        <Image
          source={{ uri: this.state.imageUrl }}
          style={{ width: 200, height: 200 }}
        />
        <Button
          icon="add-a-photo"
          mode="contained"
          onPress={this.props.onDismiss}>
          Usuń
        </Button>
      </Card>
    );
  }
}

export default class App extends React.Component {
  state = {
    pokemonId: null,
  };

  handleDismiss = () => {
    this.setState({
      pokemonId: null,
    });
  };

  handleBarCodeScanner = ({ data }) => {
    this.setState({
      pokemonId: data,
    });
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <BarCodeScanner
          style={StyleSheet.absoluteFill}
          onBarCodeScanned={this.handleBarCodeScanner}
        />
        {this.state.pokemonId && (
          <PokemonCard
            id={this.state.pokemonId}
            onDismiss={this.handleDismiss}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
