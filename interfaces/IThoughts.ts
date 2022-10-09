enum TagsEnum {
  Technology = "Technology",
  Random = "Random",
  Life = "Life",
  Truth = "Truth",
}

export default interface Thought {
  title: string;
  body: string;
  tag: TagsEnum;
}
