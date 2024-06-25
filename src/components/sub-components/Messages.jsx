import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import LoadingButton from "./LoadingButton";
import {
  clearAllMessagesErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const [messageId, setMessageId] = useState("");
  const { messages, loading, message, error } = useSelector(
    (state) => state.messages
  );

  const dispatch = useDispatch();

  const handleDeleteMessage = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessagesErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {messages && messages.length > 0 ? (
                messages.map((element) => {
                  return (
                    <Card key={element._id} className="grid gap-2 p-4">
                      <CardDescription className="text-slate-900 border-b text-lg pb-1">
                        <span className="font-bold mr-2">
                          Name: {element.senderName}
                        </span>
                      </CardDescription>

                      <CardDescription className="text-slate-900 border-b text-lg pb-1">
                        <span className="font-bold mr-2">
                          Email: {element.senderEmail}
                        </span>
                      </CardDescription>

                      <CardDescription className="text-slate-800 border-b text-md pb-1 uppercase">
                        <span className="font-bold mr-2">
                          Subject: {element.subject}
                        </span>
                      </CardDescription>

                      <CardDescription className="text-black/75 text-[15px]">
                        <span className="font-bold mr-2">
                          {element.message}
                        </span>
                      </CardDescription>

                      <CardFooter className="justify-end">
                        {loading && messageId === element._id ? (
                          <LoadingButton content={"Deleting"} width={"w-32"} />
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteMessage(element._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardHeader className="text-2xl">No Messages Found!</CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Messages;
