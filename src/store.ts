import { writable } from "svelte/store";
import MozCanvas from "./core/MozCanvas";

export const moz = writable<MozCanvas>();