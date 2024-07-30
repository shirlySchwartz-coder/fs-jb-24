export class User {
  public userName: string;
  public userPass?: string; //if forgat password
  public userRole?: string;
  public userEmail?: string;

  constructor(
    userName: string,
    userPass?: string,
    userRole?: string,
    userEmail?: string
  ) {
    this.userName = userName;
    this.userPass = userPass;
    this.userRole = userRole;
    this.userEmail = userEmail;
  }
}
