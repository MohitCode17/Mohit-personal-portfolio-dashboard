import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewSoftware,
  clearAllSoftwareErrors,
  getAllSoftwares,
  resetSoftwareSlice,
} from "@/store/slices/softwareSlice";
import { toast } from "react-toastify";

const AddSoftware = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const { loading, error, message } = useSelector((state) => state.software);
  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  const handleAddSoftware = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);

    dispatch(addNewSoftware(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSoftwareErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetSoftwareSlice());
      dispatch(getAllSoftwares());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddSoftware} className="w-[100%] md:w-[650px] px-5">
        <div className="space-y-12">
          <div className="pb-4">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              Add New Software & Technology
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Software Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Next.js"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Software Icon/Svg
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {svgPreview ? (
                      <img
                        src={svgPreview ? `${svgPreview}` : "./vite.svg"}
                        className="mx-auto h-12 w-12 text-gray-300"
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
              Add Software
            </Button>
          ) : (
            <LoadingButton content={"Adding"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSoftware;
