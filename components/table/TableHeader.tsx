"use client";

import { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SortConfig } from "@/types/token";

interface TableHeaderProps {
  label: string;
  sortKey?: string;
  currentSort?: SortConfig | null;
  onSort?: (key: string) => void;
  className?: string;
  tooltip?: string;
  align?: "left" | "center" | "right";
}

/**
 * Memoized table header component with sorting capability
 */
export const TableHeader = memo(function TableHeader({
  label,
  sortKey,
  currentSort,
  onSort,
  className,
  tooltip,
  align = "left",
}: TableHeaderProps) {
  const isSortable = sortKey && onSort;
  const isActive = currentSort?.key === sortKey;
  const direction = currentSort?.direction;

  const handleSort = () => {
    if (isSortable) {
      onSort(sortKey);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        className
      )}
    >
      {isSortable ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSort}
          className="h-8 px-2 hover:bg-accent"
        >
          {label}
          {isActive ? (
            direction === "asc" ? (
              <ArrowUp className="ml-1 h-3 w-3" />
            ) : (
              <ArrowDown className="ml-1 h-3 w-3" />
            )
          ) : (
            <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
          )}
        </Button>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
});
