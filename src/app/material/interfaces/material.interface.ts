
export interface Task {
    name: string;
    completed: boolean;
    color?: string;
    subtasks?: Task[];
  }