import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover"
                  />
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={user && user.resume && user.resume.url}
                      alt="resume"
                      className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl object-cover object-top"
                    />
                  </Link>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input type="text" defaultValue={user.fullName} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={user.email} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="text" defaultValue={user.phone} disabled />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea defaultValue={user.aboutMe} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input type="text" defaultValue={user.githubUrl} disabled />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input type="text" defaultValue={user.linkedinUrl} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input type="text" defaultValue={user.instagramUrl} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input type="text" defaultValue={user.twitterUrl} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input type="text" defaultValue={user.facebookUrl} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
