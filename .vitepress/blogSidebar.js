import fs from "fs";
import path from "path";

/**
 * Generates a blog sidebar from a folder
 * Supports both:
 *  - single markdown files: first-post.md
 *  - folder posts: post-name/index.md
 * Handles prev/next properly by matching VitePress routes.
 */
export function getBlogSidebar(blogFolder = "blog") {
  const blogDir = path.resolve(process.cwd(), blogFolder);

  const items = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => {
      if (
        dirent.isFile() &&
        dirent.name.endsWith(".md") &&
        dirent.name !== "index.md"
      )
        return true;
      if (
        dirent.isDirectory() &&
        fs.existsSync(path.join(blogDir, dirent.name, "index.md"))
      )
        return true;
      return false;
    })
    .map((dirent) => {
      let name,
        link,
        date = null;

      if (dirent.isFile()) {
        name = dirent.name.replace(".md", "");
        link = `/blog/${name}`; // file → no trailing slash
      } else if (dirent.isDirectory()) {
        name = dirent.name;
        link = `/blog/${name}/`; // folder → trailing slash
      }

      // Extract date prefix if present: YYYY-MM-DD-post-title
      const match = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
      let displayName;
      if (match) {
        date = new Date(match[1]);
        displayName = match[2].replace(/-/g, " ");
      } else {
        displayName = name.replace(/-/g, " ");
      }

      return {
        text: displayName,
        link,
        date,
      };
    })
    // Sort: newest date first, then alphabetical
    .sort((a, b) => {
      if (a.date && b.date) return b.date - a.date;
      if (a.date) return -1;
      if (b.date) return 1;
      return a.text.localeCompare(b.text);
    });

  return [
    {
      text: "📃 Blog",
      items,
    },
  ];
}
