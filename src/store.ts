import { writable } from "svelte/store";
import MozCanvas from "./core/MozCanvas";

export const moz = writable<MozCanvas>();
export const members = writable<Map<string, MozMember>>(new Map());
