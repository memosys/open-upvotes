import { Drawer } from "@medusajs/ui";
import CardLane from "@/src/features/idea-card-lane";
import { Filter } from "@/components/ui/Filter";
import SubmitIdea from "@/src/features/Modals/Ideas/create-idea";
import { UserNav } from "@/components/ui/user-nav";
import { api } from "@/src/utils/api";
import { STATUS, type ideaProps } from "@/src/utils/const";
import { Button, Input } from "@medusajs/ui";
import { signInKeyp } from "@usekeyp/js-sdk";
import { filter, map, set } from "lodash";
import { useSession } from "next-auth/react";
import { useState } from "react";
import BoardSwitcher from "../../components/ui/board-switcher";
import { ThemeToggle } from "./theme-toggle";
import IdeaDetails from "./Modals/Ideas/idea-details";
import React from "react";
import { atom, useAtom } from "jotai";

export const openIdea = atom("");

export default function Board(props: { path: string }) {
  const session = useSession();

  const { data: ideas } = api.idea.getAllByBoard.useQuery({
    boardPath: props.path,
  });
  const [search, setSearch] = useState("");
  const [Filterd, setFilterd] = useState(STATUS);

  const [openidea_id] = useAtom(openIdea);

  const filteredIdeas = map(Filterd, (status) =>
    filter(ideas as ideaProps[], (idea) => {
      return (
        idea.status === status &&
        (idea.title?.toLowerCase().includes(search.toLowerCase()) ||
          idea.description?.toLowerCase().includes(search.toLowerCase()))
      );
    }),
  );

  const userSync = api.user.sync.useMutation();

  // useEffect(() => {
  //   () => userSync.mutate();
  // });

  return (
    <div className="">
      <div className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
        <BoardSwitcher />
        <div className="flex flex-row gap-2 align-middle">
          {session.data ? (
            <UserNav />
          ) : (
            <Button onClick={() => signInKeyp("DISCORD")}>Login</Button>
          )}
          <ThemeToggle />
        </div>
      </div>
      <div
        className="bg-custom h-full min-h-screen flex-1  flex-col space-y-8 
       p-8 pt-16  md:flex"
      >
        <div className="flex w-full flex-row  justify-between">
          <div className="mr-8 max-w-['50%']">
            <h3 className="text-2xl font-bold tracking-tight ">
              Here are the ideas we are working on
            </h3>
            <p className="max-w-['50%'] text-muted-foreground">
              Upvote or give new ideas to work on
            </p>
          </div>

          <SubmitIdea />

          {openidea_id && <IdeaDetails id={openidea_id} />}
        </div>
        <div className="justify-right flex flex-row gap-2">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
          <Filter
            options={Array.from(STATUS)}
            title="Filter"
            // handle={setFilterd}
          />
        </div>
        <div className="flex gap-2 max-xl:flex-wrap">
          {filteredIdeas?.map(
            (ideas, index) =>
              STATUS[index] != "ARCHIVED" && (
                <CardLane
                  key={STATUS[index]}
                  title={STATUS[index] as string}
                  ideas={ideas}
                />
              ),
          )}
        </div>
      </div>

      <div className="items-center p-8">Footer</div>
    </div>
  );
}
