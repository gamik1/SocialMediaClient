import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function BasicGrid() {
  const [data, setData] = useState([]);
  // const API_KEY = process.env.NEWS_API_KEY;
  // console.log("newsapi", process.env.REACT_APP_NEWS_API_KEY);
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=fd4dda2d2051451b8424a24ad7395085`
    )

    .then((response) => {
      console.log(response);
      setData(response.data.articles);
    });

  return data.map((value) => {
    return (
      <Box sx={{ margin:'auto',transform: 'translate(20%, 10%)'}}
     > 
        <Grid container spacing={2} >
          <Grid item xs={6} >
            <Item>
              <Card sx={{ width:"100vh" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={value.urlToImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <a href={value.url} target="_blank" rel="noreferrer">
                    <Button>Learn More</Button>
                  </a>
                </CardActions>
              </Card>
            </Item>
          </Grid>

         
        </Grid>
      </Box>
    );
  });
}
