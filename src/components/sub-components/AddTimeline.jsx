import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";
import {
  addTimeline,
  clearAllTimelineErrors,
  getAllTimelines,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { toast } from "react-toastify";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleAddTimeline = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);

    dispatch(addTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddTimeline} className="w-[100%] md:w-[650px] px-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
              Add New Timeline
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Timeline title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <Textarea
                      type="text"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Timeline description..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Starting Year (From)
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="number"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="E.g. 1965"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Ending Year (To)
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm border border-gray-500">
                    <input
                      type="number"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="E.g. 1970"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <Button type="submit" className="w-full">
              Add Timeline
            </Button>
          ) : (
            <LoadingButton content={"Adding"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
