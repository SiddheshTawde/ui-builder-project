import * as UI from "@repo/ui";
import { ElementType } from "../../src/types";

export const data: ElementType[] = Object.keys(UI).map((ui) => ({ title: ui }));
