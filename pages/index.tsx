import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import FilterListIcon from "@mui/icons-material/FilterList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Grid from "@mui/material/Unstable_Grid2";

import Container from "../components/Container";
import Button from "../components/Button";
import Thought from "../components/Thought";
import Thoughts from "../interfaces/IThought";
import { fetchThoughts } from "../lib/prismaQueries";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetchThoughts();

  return {
    props: { props: JSON.stringify(response.thoughts) },
    revalidate: 10,
  };
};

const Home: NextPage = ({
  props,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [data] = useState<Thoughts[]>(JSON.parse(props));
  const [thoughts, setThoughts] = useState<JSX.Element[]>();

  useEffect(() => {
    const Thoughts = Object.values(data).map((thought) => (
      <Grid xs={16} sm={8} md={4} key={thought.id}>
        <Thought key={thought.id} title={thought.title} body={thought.body} />
      </Grid>
    ));

    setThoughts(Thoughts);
  }, []);

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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container rowSpacing={2} columnSpacing={2} columns={16}>
            {thoughts}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
