import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  clearAllSoftwareErrors,
  deleteSoftware,
  getAllSoftwares,
  resetSoftwareSlice,
} from "@/store/slices/softwareSlice";
import LoadingButton from "./LoadingButton";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);
  const {
    softwares,
    loading: softwareLoading,
    error: softwareError,
    message: softwareMessage,
  } = useSelector((state) => state.software);
  const { timeline } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [softwareId, setSoftwareId] = useState(null);

  // HANDLE DELETE SOFTWARE
  const handleDeleteSoftware = (id) => {
    setSoftwareId(id);
    dispatch(deleteSoftware(id));
  };

  // REDIRECT TO MANAGE TIMELINE
  const gotoManageTimeline = () => {
    navigateTo("/manage/timelines");
  };

  // REDIRECT TO MANAGE SKILL
  const gotoManageSkill = () => {
    navigateTo("/manage/skills");
  };

  useEffect(() => {
    if (softwareError) {
      toast.error(softwareError);
      dispatch(clearAllSoftwareErrors());
    }

    if (softwareMessage) {
      toast.success(softwareMessage);
      setSoftwareId(null);
      dispatch(resetSoftwareSlice());
      dispatch(getAllSoftwares());
    }
  }, [dispatch, softwareLoading, softwareError, softwareMessage]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {user.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Visit Portfolio</Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Projects Completed</CardTitle>
                <CardTitle className="text-6xl pb-2">
                  {projects && projects.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button>Manage Projects</Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">Skills</CardTitle>
                <CardTitle className="text-6xl pb-2">
                  {skills && skills.length}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button onClick={gotoManageSkill}>Manage Skills</Button>
              </CardFooter>
            </Card>
          </div>
          {/* DISPLAY TABLE */}
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Stack
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Deployed
                        </TableHead>
                        <TableHead className="md:table-cell">Update</TableHead>
                        <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => (
                          <TableRow key={element._id}>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.stack}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {element.deployed}
                            </TableCell>
                            <TableCell>
                              <Link to={`/update/project/${element._id}`}>
                                <Button>Update</Button>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link
                                to={
                                  element.projectLink
                                    ? `${element.projectLink}`
                                    : ""
                                }
                              >
                                <Button>Visit</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            You have not added any project.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7 gap-3">
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {skills && skills.length > 0 ? (
                    skills.map((element) => (
                      <Card key={element._id}>
                        <CardHeader>{element.title}</CardHeader>
                        <CardFooter>
                          <Progress value={element.proficiency} />
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <p className="text-3xl">You have not added any skill.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Tabs>
            <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="md:table-cell">Icon</TableHead>
                        <TableHead className="md:table-cell text-right">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {softwares && softwares.length > 0 ? (
                        softwares.map((element) => (
                          <TableRow key={element._id}>
                            <TableCell className="font-medium">
                              {element.name}
                            </TableCell>

                            <TableCell className="md:table-cell">
                              <img
                                className="w-7 h-7"
                                src={element.svg && element.svg.url}
                                alt={element.name}
                              />
                            </TableCell>

                            <TableCell className="md:table-cell text-right">
                              {softwareLoading && softwareId === element._id ? (
                                <LoadingButton
                                  width={"w-fit"}
                                  content={"Deleting"}
                                />
                              ) : (
                                <Button
                                  onClick={() =>
                                    handleDeleteSoftware(element._id)
                                  }
                                >
                                  Delete
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            You have not added any software.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="px-7 flex items-center justify-between flex-row">
                  <CardTitle>Timeline</CardTitle>
                  <Button onClick={gotoManageTimeline} className="w-fit">
                    Manage Timeline
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="md:table-cell">From</TableHead>
                        <TableHead className="md:table-cell text-right">
                          To
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {timeline && timeline.length > 0 ? (
                        timeline.map((element) => (
                          <TableRow key={element._id}>
                            <TableCell className="font-medium">
                              {element.title}
                            </TableCell>

                            <TableCell className="md:table-cell">
                              {element.timeline.from}
                            </TableCell>

                            <TableCell className="md:table-cell text-right">
                              {element.timeline.to
                                ? `${element.timeline.to}`
                                : "Present"}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-lg overflow-y-hidden text-gray-400">
                            No Timeline Added!!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
