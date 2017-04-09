import pdfMake from "../../vendor/pdfmake";
import fonts from "../../vendor/vfs_fonts";
import { itlogo } from "./itlogo.base64";

const sumLines = lines => {
  if (lines && lines.reduce) {
    return lines.reduce((acc, el) => acc + el[1], 0);
  } else {
    return 0;
  }
};

const makePdfFromArgs = args => {
  const sum = sumLines(args.lines);

  return pdfMake.createPdf({
    pageSize: "A4",
    pageMargins: [ 40, 150, 40, 60 ],
    header: {
      columns: [
        {
          image: "data:image/png;base64," + itlogo,
          fit: [ 50, 50 ],
          width: 50,
          height: 50,
          margin: [ 40, 70, 40, 0 ]
        },
        {
          stack: [
            {
              text: "Teknologsektionen Informationsteknik",
              margin: [ 50, 73, 40, 0 ],
              style: "bold"
            },
            { text: "Chalmers Studentkår", margin: [ 50, 0 ] },
            { text: "Äskningsansökan", margin: [ 50, 0 ] }
          ]
        }
      ]
    },
    content: [
      { text: "Sökande", style: "header" },
      "\nFör- och efternamn på den sökande eller kommitté-/föreningsnamn om äskningen kommer från ett organ inom sektionen.",
      "\n\nNamn: " + args.committee + "\n\n",
      { text: "Ansvarig för äskningen", style: "header" },
      "\nNamn: " + args.author,
      "\nTelefon: " + args.phone,
      "\nEmail: " + args.email + "\n\n",
      { text: "Motivering", style: "header" },
      { table: {
        widths: [ "*" ],
        body: [[args.description]]
      }},
      {
        text: "Budget\n\n",
        style: "header",
        pageOrientation: "portrait",
        pageBreak: "before"
      },
      {
        table: {
          headerRows: 1,
          widths: [ "*", 100 ],
          body: [
            [
              { text: "Artikel", style: "bold" },
              { text: "Utgift", style: "bold" }
            ],
            ...args.lines
          ]
        }
      },
      { table: { widths: [ "*", 100, 100 ], body: [ [ "", "Total", sum ] ] } },
      "\n\n\n\n\nOrt och datum: ........................_______________________________________________",
      "\n\n\nSignatur firmatecknare: ........._______________________________________________",
      "\n\n\nNamnförtydligande: ..............._______________________________________________"
    ],
    styles: { header: { bold: true, fontSize: 15 }, bold: { bold: true } },
    defaultStyle: { fontSize: 12 }
  });
};

export default makePdfFromArgs
