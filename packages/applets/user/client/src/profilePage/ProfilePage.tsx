import { UserData } from "./profileTypes";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import react from "react";
import { BadgeList } from "@prattle/ui";

export const ProfilePage = ({
  badges,
  username,
  imageUrl,
  joinedDate,
  extraMetaData
}: UserData) => {
  return (
    <Grid container spacing={2} component={Paper}>
      <Grid item xs={12} md={4}>
        <Avatar alt={username + "'s profile image"} src={imageUrl} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography>{username}</Typography>
        <Typography>{joinedDate.toString()}</Typography>
        {extraMetaData &&
          Object.entries(extraMetaData).map(([key, data]) => (
            <Typography key={key}>
              {key}: {data}
            </Typography>
          ))}
      </Grid>
      <Grid item xs={6}>
        <BadgeList badges={badges}/>
      </Grid>
      <Grid item xs={6}>
        <BadgeList badges={badges} />
      </Grid>
    </Grid>
  );
};
