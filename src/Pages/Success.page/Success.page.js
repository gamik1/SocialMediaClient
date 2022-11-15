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

const styles = {
  heroContainer: {
    height: "60vh",
    backgroundImage: `url("https://cdn-insights.statusbrew.com/images/2021/06/how_to_create_a_customer_journey_map_for_ecommerce.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "200",
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
                <Link href="/Register">CREATE A NEW ACCOUNT</Link>
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
                FOLLOW A FRIEND
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
                POST A BLOG
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>

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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
            suscipit, quam beatae rerum inventore consectetur, neque doloribus,
            cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi
            quidem quibusdam.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
