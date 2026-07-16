import { sveltekit } from "@sveltejs/kit/vite";
import { createLogger, defineConfig } from "vite";
import browserslist from "browserslist";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { browserslistToTargets } from "lightningcss";
import pkg from "./package.json" with { type: "json" };

const logger = createLogger();
const browsers = browserslist(pkg.browserslist);

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		transformer: "lightningcss",
		lightningcss: {
			targets: browserslistToTargets(browsers),
		},
	},
	customLogger: {
		...logger,
		warn(msg, options)
		{
			if (msg.includes("'global' is not recognized as a valid pseudo-class"))
				return;
			logger.warn(msg, options);
		},
	},
	build: {
		target: "es2020",
		cssMinify: "lightningcss",
		cssTarget: browserslistToEsbuild(browsers),
	},
});
