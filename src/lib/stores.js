import GotTrue from "gotrue-js";
import { readable } from "svelte/store";
import { browser } from '$app/env';

export const auth = browser ? readable(new GotTrue({ setCookie: true })) : readable();
