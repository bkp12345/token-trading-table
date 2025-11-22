"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: "new-pairs" | "final-stretch" | "migrated";
  onCategoryChange: (category: "new-pairs" | "final-stretch" | "migrated") => void;
}

const categories = [
  { id: "new-pairs" as const, label: "New Pairs", description: "Recently launched tokens" },
  { id: "final-stretch" as const, label: "Final Stretch", description: "Tokens near bonding completion" },
  { id: "migrated" as const, label: "Migrated", description: "Successfully migrated tokens" },
];

/**
 * Category tabs component for switching between token lists
 */
export const CategoryTabs = memo(function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex gap-2 border-b">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "relative px-6 py-3 text-sm font-medium transition-colors",
              "hover:text-foreground",
              isActive
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {category.label}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
});
