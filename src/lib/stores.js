import GotTrue from "gotrue-js";
import { readable } from "svelte/store";

export const auth = readable(new GotTrue({ setCookie: true }));
