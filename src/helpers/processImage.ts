import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Express } from "express";

export async function processImage(file: Express.Multer.File) {
  const originalPath = file.path;
  const filenameWebp = path.parse(file.filename).name + ".webp";
  const webpPath = path.join(path.dirname(originalPath), filenameWebp);

  await sharp(originalPath).webp({ quality: 80 }).toFile(webpPath);

  fs.unlinkSync(originalPath);

  return {
    originalName: file.originalname,
    filename: filenameWebp,
    url: `/uploads/${filenameWebp}`,
    size: fs.statSync(webpPath).size,
    mimetype: "image/webp",
  };
}
