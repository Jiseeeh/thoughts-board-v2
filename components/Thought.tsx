import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ComputerIcon from "@mui/icons-material/Computer";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useRouter } from "next/router";

interface ThoughtProps {
  title: string;
  body: string;
  tag: string;
  id: number;
  userId?: number;
}

const Thought: React.FC<ThoughtProps> = ({ title, body, tag, userId, id }) => {
  const router = useRouter();

  const chipIcon = (tag: string) => {
    switch (tag) {
      case "Random":
        return <EmojiPeopleIcon />;
      case "Truth":
        return <QuestionMarkIcon />;
      case "Life":
        return <InsertEmoticonIcon />;
      case "Technology":
        return <ComputerIcon />;
    }
  };

  const chipColor = (tag: string) => {
    switch (tag) {
      case "Random":
        return "#d9d4e7";
      case "Truth":
        return "#a786df";
      case "Life":
        return "#fec7d7";
      case "Technology":
        return "##f9f8fc";
    }
  };

  const seeFullOnClick = () => {
    router.push(`/thoughts/${userId}/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap mb={2}>
          {body}
        </Typography>
        <Chip
          label={tag}
          size="small"
          icon={chipIcon(tag)}
          sx={{ backgroundColor: chipColor(tag) }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={seeFullOnClick}>
          See full
        </Button>
      </CardActions>
    </Card>
  );
};

export default Thought;
