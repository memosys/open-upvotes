import { AlertDialog } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Idea, Label, Upvote } from "@prisma/client";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMemo } from "react";
import IdeaDetails from "./Modals/IdeaDetails";

const MAX_TITLE_LENGTH = 60;
const MAX_DESCRIPTION_LENGTH = 100;

type IdeaCardProps = Idea & { upvotes: Upvote[]; labels: Label[] };

function IdeaCard(props: IdeaCardProps) {
  const { title, description, labels, upvotes, id } = props;

  const truncatedTitle = useMemo(
    () => title.substring(0, MAX_TITLE_LENGTH) + "...",
    [title],
  );
  const truncatedDescription = useMemo(
    () => description.substring(0, MAX_DESCRIPTION_LENGTH) + "...",
    [description],
  );

  const handleButtonClick = () => {
    console.log("overflown");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="w-full pt-2 rounded-md bg-muted/10 hover:cursor-pointer shadow-none hover:bg-muted/20">
          <CardHeader className=" items-start justify-between p-3">
            <CardTitle className="text-md font-medium leading-none">
              {truncatedTitle}
            </CardTitle>
            <CardDescription className="text-sm font-light text-muted-foreground">
              {truncatedDescription}
            </CardDescription>
            {Boolean(labels.length) && (
              <div className="gap-1">
                {labels.map((label: Label) => (
                  <Badge key={label.id} className="px-2.5" variant={"outline"}>
                    {label.label}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="flex flex-row gap-1 p-3">
            <Button
              variant={"outline"}
              className="w-full bg-transparent hover:bg-muted/40"
              onClick={handleButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 16a1 1 0 0 1-.8-1.6l6-8a1 1 0 0 1 1.6 0l6 8A1 1 0 0 1 18 16H6Z"
                />
              </svg>
              {upvotes.length}
            </Button>
          </CardContent>
        </Card>
      </AlertDialogTrigger>

      <IdeaDetails key={props.id} {...props} />
    </AlertDialog>
  );
}

export default IdeaCard;
