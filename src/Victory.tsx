import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';

const Victory: FC<{ handler: () => void }> = ({ handler }) => {
  return (
    <div className="victory_page">
      <Typography gutterBottom variant="h3" color={'textPrimary'}>
        You Won!
      </Typography>
      <Typography gutterBottom variant="h5" color={'textPrimary'}>
        You are a true dog connoisseur!
      </Typography>
      <div>
        <Button variant="outlined" size="large" onClick={handler}>
          Try Again!
        </Button>
      </div>
    </div>
  );
};

export default Victory;
