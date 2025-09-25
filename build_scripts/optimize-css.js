import uncss from "uncss";
import { glob } from "glob";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const distDir = ".vitepress/dist";

async function optimizeCSS() {
  try {
    // Find all HTML files in the dist directory
    const htmlFiles = await glob(join(distDir, "**/*.html"));
    console.log(`Found ${htmlFiles.length} HTML files`);

    // Find all CSS files in the assets directory
    const cssFiles = await glob(join(distDir, "assets/*.css"));
    console.log(`Found ${cssFiles.length} CSS files`);

    if (htmlFiles.length === 0) {
      console.log(
        "No HTML files found. Make sure VitePress build completed successfully."
      );
      return;
    }

    if (cssFiles.length === 0) {
      console.log("No CSS files found. Nothing to optimize.");
      return;
    }

    // Process each CSS file
    for (const cssFile of cssFiles) {
      console.log(`Optimizing: ${cssFile}`);

      uncss(
        htmlFiles,
        {
          stylesheets: [cssFile],
          ignore: [
            // VitePress specific classes
            /\.vp-/,
            /\.VP/,
            /\.theme/,
            /\.dark/,
            /\.light/,
            // Navigation and layout
            /\.nav/,
            /\.sidebar/,
            /\.hero/,
            /\.home/,
            /\.feature/,
            /\.outline/,
            /\.container/,
            /\.content/,
            // Interactive states
            /hover/,
            /focus/,
            /active/,
            /:not/,
            // Code highlighting
            /\.language-/,
            /\.token/,
            /\.hljs/,
            // Vue transition classes
            /\..*-enter/,
            /\..*-leave/,
            /\..*-enter-active/,
            /\..*-leave-active/,
            // Common utility classes
            /\.sr-only/,
            /\.visually-hidden/,
            // CSS custom properties
            /^:root/,
            /--vp-/,
          ],
          timeout: 10000,
          htmlroot: distDir,
        },
        (error, output) => {
          if (error) {
            console.error(`Error optimizing ${cssFile}:`, error);
          } else {
            const originalSize = readFileSync(cssFile, "utf8").length;
            const optimizedSize = output.length;
            const savings = (
              ((originalSize - optimizedSize) / originalSize) *
              100
            ).toFixed(1);

            writeFileSync(cssFile, output);
            console.log(`✓ Optimized: ${cssFile}`);
            console.log(`  Original: ${originalSize} bytes`);
            console.log(`  Optimized: ${optimizedSize} bytes`);
            console.log(`  Savings: ${savings}%`);
          }
        }
      );
    }
  } catch (error) {
    console.error("Error during CSS optimization:", error);
    process.exit(1);
  }
}

optimizeCSS();
