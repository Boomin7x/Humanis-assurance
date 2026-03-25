import { User, AuthUser } from "../types";

// Mock user profiles for demo purposes
export const mockUsers: User[] = [
  {
    id: "agent-001",
    email: "agent@demo.com",
    name: "Sarah Johnson",
    role: "agent",
    phone: "+237 690 123 456",
    company: "Humanis Insurance",
    avatar: "/avatars/agent-001.jpg",
    createdAt: new Date("2023-01-15T08:00:00Z"),
    lastLoginAt: new Date("2024-01-20T14:30:00Z"),
  },
  {
    id: "customer-1",
    email: "customer@demo.com",
    name: "Michel Kwame",
    role: "customer",
    phone: "+237 677 987 654",
    avatar: "/avatars/customer-1.jpg",
    createdAt: new Date("2023-03-22T10:15:00Z"),
    lastLoginAt: new Date("2024-01-19T16:45:00Z"),
  },
];

// Auth users for login validation
export const mockAuthUsers: AuthUser[] = mockUsers.map((user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  phone: user.phone,
  company: user.company,
  avatar: user.avatar,
}));

// Demo credentials mapping
export const demoCredentials = {
  "agent@demo.com": {
    password: "demo1234",
    user: mockAuthUsers.find((u) => u.email === "agent@demo.com")!,
  },
  "customer@demo.com": {
    password: "demo1234",
    user: mockAuthUsers.find((u) => u.email === "customer@demo.com")!,
  },
};

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

export const getAuthUserByEmail = (email: string): AuthUser | undefined => {
  return mockAuthUsers.find((user) => user.email === email);
};
