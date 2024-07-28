import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  // Handle add tags
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  // Handle tag remove
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    formData.append("tags", JSON.stringify(tags));

    dispatch(addNewProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [loading, error, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddProject} className="w-[100%] md:w-[650px] px-5">
        <div className="space-y-12">
          <div className="pb-4">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              Add New Project
            </h2>

            <div className="mt-10 flex flex-col gap-5">
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
                <div className="grid gap-2">
                  <ReactQuill
                    theme="snow"
                    placeholder="Description of your project"
                    className="h-60 mb-12"
                    required
                    onChange={(value) => {
                      setDescription(value);
                    }}
                    value={description}
                  />
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Tags
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    className="block flex-1 border border-gray-500 rounded-md py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
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

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Banner
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {projectBannerPreview ? (
                      <img
                        src={
                          projectBannerPreview
                            ? `${projectBannerPreview}`
                            : "./vite.svg"
                        }
                        className="mx-auto h-[200px] w-full text-gray-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSvg}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Add Project
            </Button>
          ) : (
            <LoadingButton content={"Adding"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProject;
