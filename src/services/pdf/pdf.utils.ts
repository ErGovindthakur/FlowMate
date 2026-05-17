export function addSectionTitle(
  doc: PDFKit.PDFDocument,
  title: string,
) {
  doc
    .moveDown()
    .fontSize(18)
    .fillColor("#111827")
    .text(title, {
      underline: true,
    })
    .moveDown(0.5);
}

export function addBulletList(
  doc: PDFKit.PDFDocument,
  items: string[],
) {
  items.forEach((item) => {
    doc
      .fontSize(12)
      .fillColor("#374151")
      .text(`• ${item}`, {
        indent: 20,
      });

    doc.moveDown(0.3);
  });
}