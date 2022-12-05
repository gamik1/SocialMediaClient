import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import nextId from "react-id-generator";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    axios
      .get(
        `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NY_NEWS_API_KEY}`
      )

      .then((response) => {
        console.log(response.data.results)
        setData(response.data.results);
      });
  }, []);
  
  return (
    <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
      {data.map((value) => {
        
        return (
          <Box sx={{ width: "100%", mt: 2 }} key={nextId()}>
            <Card>
              {
                value.media.length >= 1
                &&
                <CardMedia
                component="img"
                alt={`${value.media[0]["caption"]}`}
                height="140"
                image={value.media[0]["media-metadata"][2].url}
              />}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.abstract}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={value.url} target="_blank" rel="noreferrer">
                  <Button>Learn More...</Button>
                </a>
              </CardActions>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
}



