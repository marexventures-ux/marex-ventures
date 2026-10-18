module.exports = function(eleventyConfig) {
  // Allow missing extensions globally in Eleventy v3
  eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
  eleventyConfig.addGlobalData("eleventyAllowMissingExtension", true);

  // Auto-normalize permalinks: ensures paths without extensions end with a trailing slash
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (!data.permalink) {
        return undefined;
      }
      let p = String(data.permalink).trim();
      if (!p) return undefined;
      if (p.endsWith('/') || /\.[a-zA-Z0-9]+$/.test(p)) {
        return p;
      }
      return `${p}/`;
    }
  });

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

  // Custom filter for related blog posts:
  // Excludes current post, prioritizes posts in the same category, and returns up to limit (default 2)
  eleventyConfig.addFilter("getRelatedPosts", function(posts, currentUrl, currentCategory, limit = 2) {
    if (!posts || !Array.isArray(posts)) return [];
    const others = posts.filter(item => item.url && item.url !== currentUrl);
    const sameCat = others.filter(item => item.data && item.data.category && item.data.category === currentCategory);
    const diffCat = others.filter(item => !item.data || !item.data.category || item.data.category !== currentCategory);
    return [...sameCat, ...diffCat].slice(0, limit || 2);
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes"
    }
  };
};
