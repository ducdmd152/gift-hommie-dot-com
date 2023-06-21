import UserDTO from "./UserDTO";

export default interface FeedbackDTO {
  rating: number;
  feedback: string;
  user: UserDTO;
}
