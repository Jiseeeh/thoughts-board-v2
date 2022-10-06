import type { NextPage } from "next";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import FilterListIcon from "@mui/icons-material/FilterList";

import Container from "../components/Container";
import Button from "../components/Button";
const Home: NextPage = () => {
  const router = useRouter();

  const onSubmitAThoughtClick = () => {
    router.push("/thoughts/create");
  };

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
          <Button
            submit={false}
            content="Submit a Thought"
            onClick={onSubmitAThoughtClick}
          />
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
