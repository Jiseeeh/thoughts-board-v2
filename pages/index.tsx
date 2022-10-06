import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import Container from "../components/Container";
import Button from "../components/Button";
const Home: NextPage = () => {
  return (
    <>
      <Container>
        <Box
          sx={{
            width: 1,
            height: 50,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Button submit={false} content="Submit a Thought" />
          <FilterListIcon
            sx={{
              ml: 1,
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;
