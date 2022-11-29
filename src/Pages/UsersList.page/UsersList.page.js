import React, { useContext, useEffect, useState } from "react";
import { userListCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {
  Stack,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import UserCard from "../../Components/UserCard.component/UserCard.component";

const SearchBar = ({ setSearchQuery }) => (
  <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Start entering a name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form>
);

export default function UsersList() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filtered, setFiltered] = useState(allUsers);
  
  const { user } = useContext(AuthContext);

  const loadUsers = async () => {
    await setAllUsers(await userListCall(user.token));
  };

 
  const filterData = (query, allUsers) => {
    if (!query) {
      setFiltered(allUsers);
    } else {
      setFiltered(allUsers.filter((user) => (`${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()))));
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(()=>{
    setFiltered(allUsers);
  },[allUsers])

  useEffect(()=>{
    filterData(searchQuery,allUsers);
  },[searchQuery]);


  console.log(filtered);
  return (
    <Box>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Stack spacing={2} flexDirection="column" sx={{width: "70%" , mx: "auto"}}>
      {filtered.map((user) => (
        <UserCard key={user._id}
            uid={user._user_Id._id}
            displayName={`${user.firstName} ${user.lastName}`}
            displayImage={user.displayImage}
        />
    ))}
      </Stack>
    </Box>
  );
}
