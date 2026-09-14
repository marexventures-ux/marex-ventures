module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  
  // Custom collection for blog posts: excludes drafts & future scheduled posts
  eleventyConfig.addCollection("blog", function(collectionApi) {
    const now = new Date();
    return collectionApi.getFilteredByTag("blog")
      .filter(item => {
        // Exclude drafts
        if (item.data.draft === true) return false;
        // Exclude future scheduled posts
        if (item.date && item.date > now) return false;
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
