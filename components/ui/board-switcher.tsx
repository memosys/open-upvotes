import { useBoards } from "@/src/features/Modals/Boards/hooks";
import { Input } from "@medusajs/ui";
import { CheckIcon, Dot, ChevronDown } from "lucide-react";

import { PlusIcon } from "lucide-react";

import { Avatar, Button, DropdownMenu } from "@medusajs/ui";

import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";

import * as z from "zod";
import CreateBoard from "../../src/features/Modals/Boards/create-board";

export default function BoardSwitcher({ className }: any) {
  const router = useRouter();
  const { boards } = useBoards();
  const [createBoard, setCreateBoard] = useState(false);

  const [boardsInUse, setBoardsInUse] = useState(boards);

  const [open, setOpen] = React.useState(false);
  const [selectedBoard, setSelectedBoard] = React.useState({
    title: "Default",
    path: "/",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    const filteredBoards = boards?.filter((board) =>
      board.title.toLowerCase().includes(value.toLowerCase()),
    );

    setBoardsInUse(filteredBoards);
  }

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button role="combobox" aria-expanded={open}>
          <Avatar
            src={`https://avatar.vercel.sh/${selectedBoard.path}.png`}
            fallback={selectedBoard.title}
          />
          {selectedBoard.title}
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="z-10">
        <Input
          placeholder={"Find Board"}
          type="search"
          onChange={handleChange}
          autoFocus
        />
        {boardsInUse?.map((Board) => (
          <DropdownMenu.Item
            key={Board.path}
            onClick={() => {
              setSelectedBoard(Board);
              setOpen(false);
              void router.push(Board.path);
            }}
          >
            {Board.path === selectedBoard.path ? (
              <CheckIcon size={16} className="mr-2" />
            ) : (
              <Dot size={16} className="mr-2" />
            )}

            {Board.title}
          </DropdownMenu.Item>
        ))}
        <DropdownMenu.Separator />
        <DropdownMenu.Item onSelect={() => setCreateBoard(true)}>
          <PlusIcon size={16} className="mr-2" />
          Create New Board
        </DropdownMenu.Item>
      </DropdownMenu.Content>

      <CreateBoard
        createNewBoard={createBoard}
        setCreateNewBoard={() => setCreateBoard(!createBoard)}
      />
    </DropdownMenu>
  );
}
