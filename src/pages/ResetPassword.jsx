import LoadingButton from "@/components/sub-components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllForgotResetPassErrors,
  resetPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { token } = useParams();

  // HANDLE RESET PASSWORD
  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }

    if (isAuthenticated) {
      navigateTo("/");
    }

    if (message) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Set a new password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {!loading ? (
              <Button
                onClick={() => handleResetPassword(password, confirmPassword)}
                className="w-full"
              >
                Reset Password
              </Button>
            ) : (
              <LoadingButton content={"Resetting"} />
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-[694px]">
        <img
          src="https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGxvZ2luJTIwcGFnZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Image"
          className="h-[100%] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
