import React, { Component } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Welcome from './Welcome';
import GameOver from './GameOver';
import Victory from './Victory';
import GamePage from './GamePage';
import Correct from './Correct';

import './App.css';

export interface IGameOver {
  status: boolean;
  url: string;
  name: string;
}

const initialGameOverState: IGameOver = {
  status: false,
  url: '',
  name: '',
};
interface IState {
  process: number;
  isLoading: boolean;
  currentBreed: {
    name: string;
    link: string;
  };
  listOfBreeds: string[];
  gameOver: IGameOver;
  withSubBreeds: boolean;
  correctTimeoutIsOn: boolean;
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      process: 0,
      isLoading: false,
      currentBreed: {
        name: '',
        link: '',
      },
      listOfBreeds: [],
      gameOver: initialGameOverState,
      withSubBreeds: false,
      correctTimeoutIsOn: false,
    };
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const { message } = data;

          const breeds = Object.keys(message).reduce(
            (acc: string[], breed: string) => {
              const subBreeds = message[breed];
              if (subBreeds.length) {
                return acc.concat(
                  subBreeds.map((subBreed: string) => {
                    return `${breed}-${subBreed}`;
                  }),
                );
              } else {
                return acc.concat(breed);
              }
            },
            [],
          );
          this.setState({ listOfBreeds: breeds, isLoading: false });
        }
      });
  }

  startHandler = () => {
    this.setState({ process: 1 });
  };

  tryAgainHandler = () => {
    this.setState({
      process: 0,
      gameOver: initialGameOverState,
      withSubBreeds: false,
    });
  };

  chooseBreedHandler = (
    isRight: boolean,
    imgUrl: string,
    breedName: string,
  ): void => {
    if (isRight) {
      this.setState({
        process: this.state.process + 1,
        correctTimeoutIsOn: true,
      });
    } else {
      this.setState({
        process: this.state.process + 1,
        gameOver: {
          status: true,
          url: imgUrl,
          name: breedName,
        },
      });
    }
  };

  correctTimeOutHandler = () => {
    this.setState({ correctTimeoutIsOn: false });
  };

  subBreedDifficultyTicker = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      withSubBreeds: e.target.checked,
    });
  };

  innerComponent = (
    processQty: number,
    gameOver: IGameOver,
  ): React.ReactElement => {
    if (gameOver.status) {
      return (
        <GameOver
          handler={this.tryAgainHandler}
          gameOver={this.state.gameOver}
        />
      );
    } else if (processQty === 0) {
      return (
        <Welcome
          startHandler={this.startHandler}
          withSubBreeds={this.state.withSubBreeds}
          subBreedDifficultyTicker={this.subBreedDifficultyTicker}
        />
      );
    } else if (processQty > 16) {
      return <Victory handler={this.tryAgainHandler} />;
    } else if (processQty > 1 && this.state.correctTimeoutIsOn) {
      return <Correct handler={this.correctTimeOutHandler} />;
    } else {
      return (
        <GamePage
          progress={this.state.process}
          chooseBreedHandler={this.chooseBreedHandler}
          breedsList={
            !this.state.withSubBreeds
              ? this.state.listOfBreeds.filter(
                  breed => breed.indexOf('-') === -1,
                )
              : this.state.listOfBreeds
          }
        />
      );
    }
  };

  render() {
    const component = this.innerComponent(
      this.state.process,
      this.state.gameOver,
    );

    return (
      <ThemeProvider theme={theme}>
        <div className="App">{component}</div>
      </ThemeProvider>
    );
  }
}

export default App;
