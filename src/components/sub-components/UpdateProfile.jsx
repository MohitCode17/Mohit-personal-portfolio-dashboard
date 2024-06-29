import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import LoadingButton from "./LoadingButton";
import { Button } from "../ui/button";
import { getUser, resetProfile, updateProfile } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProfile = () => {
  const { user, loading, isUpdated, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [githubUrl, setGithubUrl] = useState(
    user && (user.githubUrl === "undefined" ? "" : user.githubUrl)
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    user && (user.linkedinUrl === "undefined" ? "" : user.linkedinUrl)
  );
  const [instagramUrl, setInstagramUrl] = useState(
    user && (user.instagramUrl === "undefined" ? "" : user.instagramUrl)
  );
  const [twitterUrl, setTwitterUrl] = useState(
    user && (user.twitterUrl === "undefined" ? "" : user.twitterUrl)
  );
  const [facebookUrl, setFacebookUrl] = useState(
    user && (user.facebookUrl === "undefined" ? "" : user.facebookUrl)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  // HANDLE AVATAR
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  // HANDLE RESUME
  const handleResume = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  // HANDLE UPDATE PROFILE
  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("githubUrl", githubUrl);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("instagramUrl", instagramUrl);
    formData.append("twitterUrl", twitterUrl);
    formData.append("facebookUrl", facebookUrl);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [isUpdated, error, loading, dispatch]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={
                      avatarPreview
                        ? avatarPreview
                        : "https://i.pinimg.com/564x/29/55/59/295559e87b67fde4bbd5d5049d67e678.jpg"
                    }
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleAvatar}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={
                        resumePreview
                          ? resumePreview
                          : "https://i.pinimg.com/564x/29/55/59/295559e87b67fde4bbd5d5049d67e678.jpg"
                      }
                      alt="resume"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover object-top"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleResume}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={fullName}
                  placeholder="Your Fullname"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  placeholder="Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  value={phone}
                  placeholder="Your Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                {/* <Textarea
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                /> */}

                <ReactQuill
                  theme="snow"
                  placeholder="Write about you something..."
                  className="h-72 mb-12"
                  required
                  onChange={(value) => {
                    setAboutMe(value);
                  }}
                  value={aboutMe}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                {!loading ? (
                  <Button onClick={handleUpdateProfile} className="w-full">
                    Update Profile
                  </Button>
                ) : (
                  <LoadingButton content={"Updating"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
