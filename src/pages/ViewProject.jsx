import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [tags, setTags] = useState([]);

  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        console.log(data);
        setTitle(data?.project.title);
        setDescription(data?.project.description);
        setStack(data?.project.stack);
        setDeployed(data?.project.deployed);
        setGitRepoLink(data?.project.gitRepoLink);
        setProjectLink(data?.project.projectLink);
        setProjectBanner(
          data?.project.projectBanner && data?.project.projectBanner.url
        );
        setTags(data?.project.tags || []); // Set tags from the fetched data
      } catch (error) {
        toast.error(error.message);
      }
    };
    getProject();
  }, [id]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <div className="w-[100%] px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-end">
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <img
                  src={projectBanner && `${projectBanner}`}
                  alt="projectBanner"
                  className="w-full h-auto"
                />
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Description:</p>
                <div
                  className="text-base p-2 text-black"
                  dangerouslySetInnerHTML={{
                    __html: description && description,
                  }}
                ></div>
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Stack:</p>
                <p>{stack}</p>
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Deployed:</p>
                <p>{deployed}</p>
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Github Repository Link:</p>
                <Link className="text-sky-700" target="_blank" to={gitRepoLink}>
                  {gitRepoLink}
                </Link>
              </div>

              <div className="w-full sm:col-span-4">
                <p className="text-2xl mb-2">Project Link:</p>
                <Link className="text-sky-700" target="_blank" to={projectLink}>
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
