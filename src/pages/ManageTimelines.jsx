import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimelines,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimelines = () => {
  const { timeline, error, message } = useSelector((state) => state.timeline);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  // RETURN TO DASHBOARD
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // DELETE TIMELINE
  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
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
  }, [dispatch, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline &&
                    timeline.length > 0 &&
                    timeline.map((element) => (
                      <TableRow key={element._id}>
                        <TableCell className="font-medium">
                          {element.title}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.description}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.timeline.from}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.timeline.to
                            ? `${element.timeline.to}`
                            : "Present"}
                        </TableCell>
                        <TableCell className="flex justify-end">
                          <button
                            onClick={() => handleDeleteTimeline(element._id)}
                            className="border-gray-600 border-2 rounded-full h-9 w-9 flex 
                              justify-center items-center text-gray-600  hover:text-slate-50 hover:bg-gray-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {timeline.length <= 0 && (
            <p className="text-center text-xl text-gray-400 mt-4">
              No Timeline Added!!
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageTimelines;
