import { Roles, UserSessionData } from "@/features/users/lib/types";


export class UserDTO {
  private id: number;
  private name: string;
  private email: string;
  private role: Roles;

  constructor(data: UserSessionData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
  }
  
  getId():number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email
  }
  isAdmin(): boolean {
    return this.role === "admin";
  }
  isStaff(): boolean {
    return this.role === "staff";
  }
  isStudent(): boolean {
    return this.role === "student";
  }
}
