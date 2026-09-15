module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/favicon.png");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  
  // Custom collection for blog posts: only excludes drafts if explicitly marked as draft
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByTag("blog")
      .filter(item => {
        // Exclude drafts
        if (item.data.draft === true) return false;
        return true;
      })
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes"
    }
  };
};
