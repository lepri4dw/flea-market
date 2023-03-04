import React from 'react';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import {apiURL} from "../../../constants";
import {Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  _id: string;
  title: string;
  price: number;
  image: string | null;
}

const OneItem: React.FC<Props> = ({_id, title, image, price}) => {
  let cardImage = noImageAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea component={Link} to={'/items/' + _id} style={{textDecoration: "none"}}>
          <ImageCardMedia image={cardImage} title={title}/>
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h6">{price} USD</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default OneItem;