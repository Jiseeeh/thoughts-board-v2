export default interface Thought {
  body: string;
  createdAt: string;
  id: number;
  tag: string;
  title: string;
  userId?: number;
}
