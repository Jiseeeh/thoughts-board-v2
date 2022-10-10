import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ThoughtProps {
  title: string;
  body: string;
}

const Thought: React.FC<ThoughtProps> = ({ title, body }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See full</Button>
      </CardActions>
    </Card>
  );
};

export default Thought;
