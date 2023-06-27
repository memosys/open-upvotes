import { Check, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/src/lib/utils"
import { useEffect, useState } from "react"


export function Filter(props:{title: string, options: string[], allowNew?: Boolean, handle: any}) {
  
    const {options, title, allowNew = false, handle} = props;

    
    const [selectedValues, setSelectedValues] = useState(new Set(options));

    useEffect(()=> handle(Array.from(selectedValues)), [selectedValues])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title}/>
          <CommandList>
            <CommandEmpty>
                { !allowNew ? "No results found." : "Add New"}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option)
                return (
                    <CommandItem
                        key={option}
                        onSelect={() => {
                            setSelectedValues(() => {
                            const newSelectedValues = new Set(selectedValues);
                            return selectedValues.has(option)
                                ? (newSelectedValues.delete(option), newSelectedValues)
                                : (newSelectedValues.add(option), newSelectedValues);
                            });
                        }}
                        >

                  
                <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                    
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {(
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                        selectedValues.size == 0 ?
                            setSelectedValues(new Set(options))
                            : setSelectedValues(new Set())
                    }}
                    className="justify-center text-center"
                  >
                  {selectedValues.size == 0 ? "Select All" : "Clear All"}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}