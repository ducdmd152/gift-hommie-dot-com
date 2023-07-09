export default interface UserDTO {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  yob: number | null;
  avatar: string;
  address: string;
  wardId: number;
  roleId: number;
  authority: string;
  enabled: boolean;
}
