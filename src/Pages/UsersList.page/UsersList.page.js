import React, { useContext, useEffect, useState } from "react";
import { userListCall } from "../../API/apiCalls";
import { AuthContext } from "../../context/AuthContext";
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
      fullWidth
    />
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
    <Box sx={{ width: '100%', mt: 2 }}>
      <SearchBar sx={{width:"100%" ,mb:2}} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Stack spacing={2} sx={{ mb: 4, mt:2}}>
      {filtered.map((user) => (
        <UserCard key={user._id}
            uid={user._user_Id._id}
            displayName={`${user.firstName} ${user.lastName}`}
            displayImage={user.displayImage}
            works={user.profession}
        />
    ))}
      </Stack>
    </Box>
  );
}
