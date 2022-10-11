import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import FilterListIcon from "@mui/icons-material/FilterList";
import Grid from "@mui/material/Unstable_Grid2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
  const [filterState, setFilterState] = useState("All");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // open menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * FilterBy() is a function that takes a string as an argument, sets the filterState to the string, and
   * then filters the data object by the string and maps the filtered data to a new array of Thoughts.
   * @param {string} tag - string - the tag that is being filtered by
   */
  const filterBy = (tag: string) => {
    setFilterState(tag);

    const filteredThoughts = Object.values(data)
      .filter((thought) => thought.tag === tag)
      .map((thought) => (
        <Grid xs={16} sm={8} md={4} key={thought.id}>
          <Thought
            key={thought.id}
            title={thought.title}
            body={thought.body}
            tag={thought.tag}
            id={thought.id}
            userId={thought.userId}
          />
        </Grid>
      ));

    setThoughts(filteredThoughts);
  };

  /**
   * MapThoughts() is a function that takes the data object and maps it to the Thought component, which
   * is then set to the thoughts state.
   */
  const mapThoughts = () => {
    setFilterState("All");

    const Thoughts = Object.values(data).map((thought) => (
      <Grid xs={16} sm={8} md={4} key={thought.id}>
        <Thought
          key={thought.id}
          title={thought.title}
          body={thought.body}
          tag={thought.tag}
          id={thought.id}
          userId={thought.userId}
        />
      </Grid>
    ));

    setThoughts(Thoughts);
  };

  useEffect(() => {
    mapThoughts(); // to render all initial thoughts on mount
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
          <IconButton onClick={handleClick}>
            <FilterListIcon sx={{}} />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                if (filterState === "All") return;
                mapThoughts();
                handleClose();
              }}
            >
              All
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (filterState === "Random") return;
                filterBy("Random");
                handleClose();
              }}
            >
              Random
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (filterState === "Life") return;
                filterBy("Life");
                handleClose();
              }}
            >
              Life
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (filterState === "Technology") return;
                filterBy("Technology");
                handleClose();
              }}
            >
              Technology
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (filterState === "Truth") return;
                filterBy("Truth");
                handleClose();
              }}
            >
              Truth
            </MenuItem>
          </Menu>
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
