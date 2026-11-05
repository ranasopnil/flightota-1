import type { TravelSolution } from "@/types/solutions";
import { developmentSolutions } from "./solutions-development";
import { platformSolutions } from "./solutions-platform";

/** All twelve solutions: portal development first, then platform licences. */
export const solutions: TravelSolution[] = [...developmentSolutions, ...platformSolutions];
