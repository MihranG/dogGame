import * as React from 'react';
import { Button } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface IProps {
  startHandler: () => void;
  withSubBreeds: boolean;
  subBreedDifficultyTicker: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Welcome: React.FC<IProps> = ({
  startHandler,
  withSubBreeds,
  subBreedDifficultyTicker,
}) => {
  return (
    <div className="welcome_page">
      <Typography variant="h3" gutterBottom color={'textPrimary'}>
        Who wants to be a dogellionaire?
      </Typography>
      <Typography gutterBottom variant="h5" color={'textSecondary'}>
        It’s a quiz which will test your knowledge of dog breeds. You will be
        given an image of a dog and 4 answers. Let’s see how good are you at
        knowing your good boys and girls
      </Typography>
      <div className="welcome_page__toggle ">
        <Switch
          checked={withSubBreeds}
          onChange={subBreedDifficultyTicker}
          value="checkedF"
          color="default"
        />
        <label className="MuiTypography-h6 MuiTypography-colorTextSecondary">
          {withSubBreeds ? 'hard - with subbreeds' : 'easy'}
        </label>
      </div>

      <div>
        <Button variant="outlined" size="large" onClick={startHandler}>
          Start!
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
