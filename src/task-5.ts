// { name, age }

// {
//     name,
//     age,
//     isAdmin: false
//   };

interface NewUser {
  name: string;
  age: number;
}

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

function createUser({ name, age }: NewUser): User {
  const createdUser: User = {
    name,
    age,
    isAdmin: false,
  };

  return createdUser;
}

createUser({ name: "Alice", age: 30 });

interface User1 {
  name: string;
  address?: { country?: string; city?: string; local_address?: string };
}
