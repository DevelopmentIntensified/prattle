import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Link2 from "@mui/material/Link";
import { Badge, BadgeListProps } from "./badgeTypes";
import { Link } from "react-router-dom";

const BadgeListWrapper = styled(Paper)(({ theme }) => ({
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  //maxWidth: 700,
  ".badge-list-container": {
    margin: "-4px",
    display: "flex",
    flexWrap: "wrap"
  },
  ".badge-list-container > *": {
    padding: "4px"
  }
}));

const CustomGrid = styled(Grid)(({ theme }) => ({
  // padding: theme.spacing(2),
  margin: "auto",
  textAlign: "left"
}));

const BadgeItem = (badge: Badge) => {
  return (
    <React.Fragment>
      <CustomGrid xs={4}>
        <Tooltip title={"date earned: " + badge.date}>
          <Avatar
            src={badge.image}
            alt={badge.name}
            sx={{ width: 45, height: 45 }}
          />
        </Tooltip>
      </CustomGrid>
      <CustomGrid xs={8}>
        <Typography align="center" variant="subtitle2">
          {badge.link ? (
            <Link2
              sx={{ textDecoration: "none" }}
              component={Link}
              to={badge.link}
            >
              {badge.name}
            </Link2>
          ) : (
            badge.name
          )}
        </Typography>
      </CustomGrid>
    </React.Fragment>
  );
};

export const BadgeList = ({ badges }: BadgeListProps) => {
  return (
    <BadgeListWrapper>
      <CustomGrid container spacing={1}>
        {badges.map((badge, index) => (
          <BadgeItem key={index} {...badge} />
        ))}
      </CustomGrid>
    </BadgeListWrapper>
  );
};
