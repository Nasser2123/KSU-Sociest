import {Course} from "./course.model";

export interface Department {
  id: number;
  name: string;
  description: string;
  level: number;
  courses: Course[];  // This will store the names or IDs of the courses.
}
