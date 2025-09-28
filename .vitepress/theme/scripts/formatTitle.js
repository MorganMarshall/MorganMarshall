// A comprehensive list of common file extensions
const commonExtensions = [
  "pdf",
  "jpeg",
  "jpg",
  "png",
  "gif",
  "bmp",
  "svg",
  "tif",
  "tiff",
  "psd",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "rtf",
  "csv",
  "zip",
  "rar",
  "tar",
  "7z",
  "html",
  "htm",
  "css",
  "js",
  "json",
  "php",
  "xml",
  "mp3",
  "wav",
  "aac",
  "flac",
  "wma",
  "ogg",
  "mp4",
  "mov",
  "avi",
  "wmv",
  "flv",
  "mpg",
  "mpeg",
  "webm",
  "exe",
  "dll",
  "bat",
  "com",
  "msi",
  "log",
  "ini",
  "cfg",
  "tmp",
  "eml",
  "msg",
  "ost",
  "pst",
  "llm"
];

/**
 * Formats a word or phrase. Known file extensions are converted to uppercase,
 * while other words are capitalized (first letter uppercase).
 * @param {string} phrase The input string, which may contain multiple words.
 * @returns {string} The formatted string.
 */
function formatWordOrFile(phrase) {
  // Handle non-string or empty input
  if (typeof phrase !== "string" || phrase.length === 0) {
    return "";
  }

  // Split the input string into an array of words
  const words = phrase.split(" ");

  // Process each word and format it
  const formattedWords = words.map((word) => {
    // Check if the lowercase version of the word is a known extension
    if (commonExtensions.includes(word.toLowerCase())) {
      return word.toUpperCase();
    }
    // If not a recognized extension, capitalize the first letter
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Rejoin the formatted words into a single string
  return formattedWords.join(" ");
}

export { formatWordOrFile };
