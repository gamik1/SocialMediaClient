import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import AddTaskIcon from "@mui/icons-material/AddTask";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Link from "@mui/material/Link";
import Avatar from '@mui/material/Avatar';
import Copyright from "../../Components/Copyright.component/Copyright.component";
import { pink, deepPurple,green } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const styles = {
  heroContainer: {
    height: "85vh",
    backgroundImage: `url("https://www.travelpayouts.com/blog/wp-content/uploads/2019/12/socialmediatools.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "auto",
    padding: 50,
    position: "relative",
  },
  info: {
    height: "50vh",
    backgroundImage: `url('https://www.publicdomainpictures.net/pictures/370000/nahled/people-network.jpg')`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "200",
    margin: 30,
    position: "relative",
    borderRadius: "30",
  },
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={3} sx={{ border: 0 }}>
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="right"
          style={styles.heroContainer}
        ></Grid>
      </Stack>
      
      <Grid container spacing={1} mt={10}>
        <Grid
          item
          xs={12}
          md={4}
          mt={4}
          container
          direction="column"
          justify="flex-end"
          alignItems="right"
          style={styles.info}
        ></Grid>
        <Grid item xs={12} md={6} mt={4}>
          <Item>
            {" "}
            <Typography variant="h3">Ping</Typography>
          </Item>
          <Typography variant="body" display="block" mt={3}>
          PING serves as a virtual platform for connectivity. Through this, we can connect with people around the world. In addition to viewing a person's profile, we can also send them a request. Social media platforms are one of the best ways to keep up to date with what is going on in the world. Furthermore, we can make a difference by donating a small amount and making a difference elsewhere through this platform. The blogging process enables people to express themselves by keeping proper language or word choice in mind.
          </Typography>
        </Grid>
      </Grid>
      
      <Grid mt={10}>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <PersonAddIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "24px", px: 2 }}>
              <Typography variant="h6" component="span">
                <Link href="/register">CREATE A NEW ACCOUNT</Link>
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <LoginIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "24px", px: 2 }}>
              <Typography variant="h6" component="span">
                <Link href="/login">LOGIN TO YOUR ACCOUNT</Link>
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary">
                <AddTaskIcon />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "21px", px: 2 }}>
              <Typography variant="h6" component="span">
                YOU CAN ADD A FRIEND AFTER LOGIN
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
              <TimelineDot color="secondary">
                <BorderColorIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "21px", px: 2 }}>
              <Typography variant="h6" component="span">
                YOU CAN POST A BLOG AFTER LOGIN
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
            <Typography variant="h2" mt={10}>Our Team</Typography>
          
      <Grid container spacing={1} mt={10}>
        
        <Grid
          item
          xs={12}
          lg={4}
          md={6}
          mt={4}
         sx={{alignItems: 'center',
         justifyContent: 'center'}}
          container
          direction="column"
        >
           
          <Avatar alt="Gamik " sx={{ width:240, height: 240 }} src="https://i.postimg.cc/MH9QKBYX/Gamik.jpg"/> 
          <Typography variant="h5" gutterBottom>
          <br></br>
          Gamik Budhathoki<br>
          </br>
          <Link sx={{textDecoration:"none" , fontSize:"1rem"}} href="mailto:gamiksingz@gmail.com">gamiksingz@gmail.com</Link><br/>
          Developer
      </Typography>  <Link href="https://github.com/gamik1" underline="none">Github
</Link>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          md={6}
          mt={4}
         sx={{alignItems: 'center',
         justifyContent: 'center'}}
          container
          direction="column"
         
        >
          <Avatar alt="Isha " sx={{ width:300, height: 300 ,bgcolor: pink[500]}} src="https://i.postimg.cc/YqYC2Yq9/Isha-Photo-Room.png"/>
          <Typography variant="h5" gutterBottom>
          <br></br>
          Isha Negi <br>
          </br>Developer
      </Typography>
      
        <Link href="https://github.com/ishanegi18" underline="none"> Github
</Link>
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          md={6}
          mt={4}
         sx={{alignItems: 'center',
         justifyContent: 'center'}}
          container
          direction="column"
         
        >
        
          <Avatar alt="Yang" sx={{ width:240, height: 240 }} src="https://i.postimg.cc/qBwnLfd0/Yang.jpg"/> 
          <Typography variant="h5" gutterBottom>
            <br></br>
            Yang Cheng<br>
          </br>Developer
      </Typography>   <Link href="https://github.com/YangCConestoga" underline="none"> Github 
</Link>
        </Grid>
      </Grid>

      

      <Copyright sx={{ mt: 12, mb: 4 }} />
    </Box>
  );
}