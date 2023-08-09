import { Card } from "@/components/ui/card";
import type { ideaProps } from "@/src/utils/const";
import React from "react";
import IdeaCard from "./IdeaCard";

export default function CardLane(props: { title: string; ideas: ideaProps[] }) {
  const { title, ideas } = props;

  return (
    <Card className="flex h-full w-full flex-col space-y-4 overflow-y-auto  rounded-lg border bg-background p-4">
      <p className="leading-normal text-muted-foreground">
        {title}
      </p>

      {Boolean(ideas.length) &&
        ideas?.map((idea: ideaProps) => (
          <React.Fragment key={idea.id}>
            <IdeaCard {...idea} />
          </React.Fragment>
        ))}
      {!ideas.length && (
        <p className="text-sm font-light text-muted-foreground">
          {" "}
          No Ideas under {title}
        </p>
      )}
    </Card>
  );
}
