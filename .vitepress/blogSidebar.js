import fs from "fs";
import path from "path";

/**
 * Generates a blog sidebar from a folder
 * Supports both:
 *  - single markdown files: first-post.md
 *  - folder posts: post-name/index.md
 */
export function getBlogSidebar(blogFolder = "blog") {
  const blogDir = path.resolve(process.cwd(), blogFolder);

  const items = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => {
      // Keep files ending in .md (excluding index.md) and folders containing index.md
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
      let name, link;

      if (dirent.isFile()) {
        name = dirent.name.replace(".md", "");
        link = `/blog/${name}/`; // pretty URL
      } else if (dirent.isDirectory()) {
        name = dirent.name;
        link = `/blog/${name}/`; // pretty URL
      }

      // Remove date prefix if present: YYYY-MM-DD-post-title
      const displayName = name
        .replace(/^\d{4}-\d{2}-\d{2}-/, "")
        .replace(/-/g, " ");

      return {
        text: displayName,
        link,
      };
    });

  return [
    {
      text: "Blog",
      items,
    },
  ];
}
