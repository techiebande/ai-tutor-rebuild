import { useUser } from "@/hooks/useUser";

export default function Header() {
  const { data, isLoading } = useUser();

  const user = data?.data;
  return (
    <header className="w-full p-4 px-5 lg:px-20  bg-[#004e89] flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold capitalize">
        {isLoading
          ? "Loading user..."
          : user
          ? `Welcome ${user.data.username}`
          : "User not found"}
      </h1>
    </header>
  );
}
