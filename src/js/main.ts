import { renderCartCount } from "./utils.mjs";
import { checkAuth } from "./auth.svelte.ts";

checkAuth()
renderCartCount();
