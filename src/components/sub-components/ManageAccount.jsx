import { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";

const ManageAccount = () => {
  const [activeComponent, setActiveComponent] = useState("Profile");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              className={
                activeComponent === "Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setActiveComponent("Profile")}
            >
              Profile
            </Link>

            <Link
              className={
                activeComponent === "Update Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setActiveComponent("Update Profile")}
            >
              Update Profile
            </Link>

            <Link
              className={
                activeComponent === "Update Password"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={() => setActiveComponent("Update Password")}
            >
              Update Password
            </Link>

            <Link onClick={handleLogout}>Logout</Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (activeComponent) {
                case "Profile":
                  return <Profile />;
                  break;

                case "Update Profile":
                  return <UpdateProfile />;
                  break;

                case "Update Password":
                  return <UpdatePassword />;
                  break;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageAccount;
