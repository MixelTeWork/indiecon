import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import pkg from "./package.json" with { type: "json" };

const browsers = browserslist(pkg.browserslist);

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		transformer: "lightningcss",
		lightningcss: {
			targets: browserslistToTargets(browsers),
		},
	},
	build: {
		target: "es2020",
		cssMinify: "lightningcss",
		cssTarget: browserslistToEsbuild(browsers),
	},
});
