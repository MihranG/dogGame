import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
import { IGameOver } from './App';

interface IPros {
  handler: () => void;
  gameOver: IGameOver;
}
const GameOver: FC<IPros> = ({ handler, gameOver }) => {
  return (
    <div className="gameover_page">
      <Typography gutterBottom variant="h3" color={'textPrimary'}>
        Game Over
      </Typography>
      <img
        className="dog_img"
        src={gameOver.url}
        alt="Seems, something went wrong, please reload the page"
      />
      <Typography gutterBottom variant="h5" color={'textPrimary'}>
        This dog is a <span className="breed_name_show">{gameOver.name}</span>
      </Typography>
      <div>
        <Button variant="outlined" size="large" onClick={handler}>
          Try Again!
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
