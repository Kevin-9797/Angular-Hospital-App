import { ThemePalette } from "@angular/material";

export interface Task {
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
  }