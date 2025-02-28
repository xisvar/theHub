/**
 * @fileoverview Documentation Generator Utility
 *
 * This module provides functionality to generate comprehensive documentation for theHub project.
 * It first creates HTML documentation using JSDoc and then converts it to PDF format using
 * Puppeteer for easier distribution and offline reading.
 *
 * @module jsdocGenerator
 * @requires child_process
 * @requires puppeteer
 * @requires path
 * @requires fs
 * @requires url
 */

import { execSync } from "child_process";
import puppeteer from "puppeteer";
import path from "path";
import { existsSync, readdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { PDFDocument } from "pdf-lib";

// Get current file and directory name using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates JSDoc HTML documentation from project source code
 * Executes the JSDoc command using the configuration in jsdoc.json
 *
 * @function generateJSDoc
 * @returns {void}
 */
function generateJSDoc() {
  console.log("Generating JSDoc...");
  execSync("npx jsdoc -c jsdoc.json", { stdio: "inherit" });
}

/**
 * Gets a list of all HTML documentation files in the output directory
 *
 * @function getDocumentationFiles
 * @returns {string[]} Array of HTML file paths
 */
function getDocumentationFiles() {
  const outDir = path.join(__dirname, "out");

  if (!existsSync(outDir)) {
    console.error("Documentation output directory not found");
    return [];
  }

  // Get all HTML files in the output directory
  const htmlFiles = readdirSync(outDir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join(outDir, file));

  console.log(`Found ${htmlFiles.length} documentation files to process`);
  return htmlFiles;
}

/**
 * Converts all generated HTML documentation to a single comprehensive PDF file
 *
 * @function convertHtmlToPdf
 * @async
 * @returns {Promise<void>}
 * @throws {Error} If the HTML documentation files don't exist
 */
async function convertHtmlToPdf() {
  const docFiles = getDocumentationFiles();
  const pdfPath = path.join(__dirname, "theHub-documentation.pdf");

  if (docFiles.length === 0) {
    console.error(
      "Error: No JSDoc HTML files found. Make sure JSDoc was generated correctly."
    );
    return;
  }

  console.log("Converting HTML documentation to PDF...");

  // Launch browser once for all operations
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create array to store individual page PDFs
  const pdfBuffers = [];

  // Process each HTML file
  for (const file of docFiles) {
    const fileName = path.basename(file);
    console.log(`Processing ${fileName}...`);

    // Navigate to the HTML file
    await page.goto(`file://${file}`, { waitUntil: "networkidle0" });

    // Add a header with the file name for better organization in the PDF
    await page.evaluate((name) => {
      const header = document.createElement("div");
      header.style.textAlign = "center";
      header.style.padding = "10px";
      header.style.backgroundColor = "#f0f0f0";
      header.style.borderBottom = "1px solid #ccc";
      header.style.marginBottom = "20px";
      header.style.fontSize = "18px";
      header.innerText = `Documentation: ${name.replace(".html", "")}`;

      document.body.insertBefore(header, document.body.firstChild);
    }, fileName);

    // Generate PDF for this page
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    pdfBuffers.push(pdfBuffer);
  }

  // Merge all PDFs into a single file
    // For simplicity, we'll use a basic approach where we just append pages
    const mergedPdf = await PDFDocument.create();
  
    for (const pdfBuffer of pdfBuffers) {
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
  
    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    writeFileSync(pdfPath, mergedPdfBytes);

  await browser.close();

  console.log(`PDF documentation generated successfully: ${pdfPath}`);
}

/**
 * Main execution function that runs the document generation process
 * Generates JSDoc HTML documentation and then converts it to PDF
 *
 * @function
 * @async
 * @returns {Promise<void>}
 */
(async () => {
  try {
    generateJSDoc();
    await convertHtmlToPdf();
  } catch (error) {
    console.error("Documentation generation failed:", error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
})();
