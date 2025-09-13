type Role = "admin" | "user" | "guest";

interface User {
  username: string;
  age: number;
  city?: string;
}

function createUserCard(user: User, role: Role): string {
  return `${user.username} (${user.age}) — ${role} from ${
    user.city ? user.city : "Unknown"
  }`;
}

console.log(
  createUserCard({ username: "Anna", age: 25, city: "Kyiv" }, "admin")
);

console.log(createUserCard({ username: "Max", age: 30 }, "guest"));
