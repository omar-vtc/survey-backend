const { Document, Packer, Paragraph, TextRun } = require("docx");
const fs = require("fs");

async function generateWordFile(userData, filePath) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Survey Report", bold: true, size: 32 }),
            ],
            spacing: { after: 300 },
          }),
          new Paragraph({ text: "" }),

          new Paragraph({
            children: [
              new TextRun({ text: "User Information:", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          ...Object.entries(userData).map(
            ([key, value]) =>
              new Paragraph({
                children: [new TextRun({ text: `${key}: ${value}`, size: 24 })],
                spacing: { after: 150 },
              })
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
}

module.exports = { generateWordFile };
