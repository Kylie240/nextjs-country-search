import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  population: number;
  region: string;
  flag: string;
  capital: string;
}

const CountryCard = ({ name, population, flag, region, capital }: Props) => {
  return (
    <Card sx={{ width: "25vw", marginBottom: "1rem" }}>
      <CardMedia sx={{ height: "15vh" }} image={flag} title={`${name} flag`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Population: </b>
          {population}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Region: </b>
          {region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Capital: </b>
          {capital}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CountryCard;
