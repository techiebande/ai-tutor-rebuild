import React from "react";
import NavLink from "./NavLink";
import ButtonWithIcon from "./ButtonWithIcon";
import { Loader, LogIn, LogOut, UserCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const { user, loading } = useUser();

  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "GET" });

    router.push("/signin");
  };
  return (
    <ul className="font-bold flex flex-col mt-5 lg:mt-[unset] lg:flex-row items-center gap-2">
      <NavLink className="font-bold text-white" href="/">
        Home
      </NavLink>

      <>
        {loading ? (
          <Loader className="animate-spin" />
        ) : user ? (
          <>
            <ButtonWithIcon
              onClick={handleLogout}
              className="bg-wisdom-blue-1 hover:bg-wisdom-blue-1 border border-wisdom-blue-2 text-white font-bold"
              icon={<LogOut />}
              text="Logout"
            />
          </>
        ) : (
          <>
            <NavLink href="/signup">
              <ButtonWithIcon
                className="bg-wisdom-blue-1 hover:bg-wisdom-blue-1 border border-wisdom-blue-2 text-white font-bold"
                icon={<LogIn />}
                text="Sign up"
              />
            </NavLink>
            <NavLink href="/signin">
              <ButtonWithIcon
                className="bg-wisdom-green-1 hover:bg-wisdom-green-1 border border-wisdom-green-2 text-white font-bold"
                icon={<UserCircle />}
                text="Sign in"
              />
            </NavLink>
          </>
        )}
      </>
    </ul>
  );
};

export default Navigation;