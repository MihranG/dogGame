import React, { FC, useState, useEffect } from 'react';
import { Button, Typography, Grid, CircularProgress } from '@material-ui/core';

interface IProps {
  breedsList: string[];
  chooseBreedHandler: (
    isRight: boolean,
    imgUrl: string,
    breedName: string,
  ) => void;
  progress: number;
}

const GamePage: FC<IProps> = ({ chooseBreedHandler, breedsList, progress }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [buttonsData, setButtonsData] = useState<string[]>([]);
  const [rightAnswerIndex, setRightAnsweIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const breedsQty = breedsList.length;
    const randomIndexesArray: number[] = [];
    const randomArray = Array(4)
      .fill(0)
      .map(el => {
        let newIndex = Math.round(Math.random() * (breedsQty - 1));
        while (randomIndexesArray.indexOf(newIndex) !== -1) {
          newIndex = Math.round(Math.random() * (breedsQty - 1));
        }
        randomIndexesArray.push(newIndex);
        return breedsList[newIndex];
      });

    const randomRightAnswerIndex = Math.round(Math.random() * 3);
    setRightAnsweIndex(randomRightAnswerIndex);
    imgUrlGenerator(randomArray[randomRightAnswerIndex]);
    setButtonsData(randomArray);
  }, [breedsList, progress]);

  const clickHandler = (value: string): void => {
    chooseBreedHandler(
      value === buttonsData[rightAnswerIndex!],
      imgUrl,
      buttonsData[rightAnswerIndex!],
    );
  };

  const imgUrlGenerator = (breedName: string): void => {
    let imgNameForRequest = breedName;
    if (breedName.indexOf('-') !== -1) {
      imgNameForRequest = `${breedName.split('-')[0]}/${
        breedName.split('-')[1]
      }`;
    }
    fetch(`https://dog.ceo/api/breed/${imgNameForRequest}/images/random`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setImgUrl(data.message);
        }
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="game_page">
      <Typography gutterBottom variant="h4" color={'textPrimary'}>
        {progress}/16
      </Typography>
      <Typography gutterBottom variant="h4" color={'textPrimary'}>
        Which breed is this dog
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <img
            className="dog_img"
            src={imgUrl}
            alt="Seems, something went wrong, please reload the page"
          />
          <div className="game_page__button_container">
            <Grid container justify="center" alignItems="center">
              {buttonsData.map((buttonData: string, index: number) => (
                <Grid item xs={6} key={`${buttonData}_${index}`}>
                  <Button
                    variant="outlined"
                    size="large"
                    className="game_page__button breed_name_show"
                    onClick={() => clickHandler(buttonData)}
                  >
                    {buttonData}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
