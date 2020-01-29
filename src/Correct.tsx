import React, { FC, useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const Correct: FC<{ handler: () => void }> = ({ handler }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  useEffect(() => {
    let intervalId = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft]);

  useEffect(() => {
    let timeOutId = setTimeout(() => {
      handler();
    }, 5000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [handler]);

  return (
    <div className="victory_page">
      <div className="victory__correct_wrapper">
        <CheckIcon
          fontSize="large"
          className="victory__correct_wrapper__icon--large 
                        victory__correct_wrapper__icon--white"
        />
        <Typography gutterBottom variant="h2" color={'textPrimary'}>
          Correct
        </Typography>
      </div>

      <Typography gutterBottom variant="h5" color={'textPrimary'}>
        Next question in {secondsLeft} seconds
      </Typography>
      <div className="victory__rectangle"></div>

      <div>
        <Button variant="outlined" size="large" onClick={handler}>
          next question
        </Button>
      </div>
    </div>
  );
};

export default Correct;
