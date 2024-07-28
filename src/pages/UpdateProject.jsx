import LoadingButton from "@/components/sub-components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const { error, loading, projects, message } = useSelector(
    (state) => state.project
  );

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // GET PROJECT WITH ID
  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setTitle(data.project.title);
        setDescription(data.project.description);
        setStack(data.project.stack);
        setDeployed(data.project.deployed);
        setGitRepoLink(data.project.gitRepoLink);
        setProjectLink(data.project.projectLink);
        setProjectBanner(
          data.project.projectBanner && data.project.projectBanner.url
        );
        setProjectBannerPreview(
          data.project.projectBanner && data.project.projectBanner.url
        );
        setTags(data.project.tags || []);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error, loading]);

  // HANDLE PROJECT BANNER
  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  // HANDLE ADD TAG
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  // HANDLE REMOVE TAG
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // HANDLE UPDATE PROJECT
  const handleUpdateProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    formData.append("tags", JSON.stringify(tags)); // Include tags in the form data

    dispatch(updateProject(id, formData));
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        onSubmit={handleUpdateProject}
        className="w-[100%] md:w-[650px] px-5"
      >
        <div className="space-y-12">
          <div className="pb-4 pt-4">
            <div className="flex flex-col-reverse gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl mb-2">
                Update Project
              </h2>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <img
                  src={projectBannerPreview && `${projectBannerPreview}`}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleProjectBanner}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Mern Stack Hotel Booking System"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <Textarea
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="feature 1. feature 2. feature 3."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Tags
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500 flex-wrap">
                    {tags.map((tag, index) => (
                      <div key={index} className="tag-item">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                    />
                    <Button onClick={handleAddTag} className="ml-2">
                      Add Tag
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Stack
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full stack">Full stack</SelectItem>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="MEAN">MEAN</SelectItem>
                        <SelectItem value="Next.js">Next.js</SelectItem>
                        <SelectItem value="Full Stack Java">
                          Full Stack Java
                        </SelectItem>
                        <SelectItem value="React.js">React.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is this project deployed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  GitHub Repository Link
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="GitHub Repository Link"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Link
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Project Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button
              onClick={handleUpdateProject}
              type="submit"
              className="w-full"
            >
              Update Project
            </Button>
          ) : (
            <LoadingButton content={"Updating"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
