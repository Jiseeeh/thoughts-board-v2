export enum TagsEnum {
  Technology = "Technology",
  Random = "Random",
  Life = "Life",
  Truth = "Truth",
}

export interface ThoughtForm {
  title: string;
  body: string;
  tag: TagsEnum;
}
