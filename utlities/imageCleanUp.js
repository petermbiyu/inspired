import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const deleteFile = async (filename) => {
  try {
    if (!filename) return;
    const filePath = path.join(_dirname, "../public/images", filename);
    await fs.unlink(filePath);
    console.log("successfuly delete: ", filename);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("file not found: ", filename);
    } else {
      console.log(`error deleting file ${filename}`, error.message);
    }
    return false;
  }
};
