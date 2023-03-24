const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");

	eleventyConfig.addDataExtension("csv", (contents) => {
		const records = parse(contents, {
			columns: true,
			skip_empty_lines: true
		});
		return records;
	});

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
		filters: {
			url: "locale_url",
			links: "locale_links"
		},
		errorMode: "strict"
	});

	return {
		dir: {
			input: "src",
			output: "docs"
		}
	};
};
