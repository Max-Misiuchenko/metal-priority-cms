interface User {
  id: number;
  email: string;
  createdAt: string;
}

export const useAuth = () => {
  const user = useState<User | null>("auth:user", () => null);

  const refresh = async () => {
    const fetch = useRequestFetch();
    user.value = await fetch<User>("/api/auth/me").catch(() => null);
  };

  return { user, refresh };
};
