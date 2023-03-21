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

	return {
		dir: {
			input: "src",
			output: "docs"
		}
	};
};
