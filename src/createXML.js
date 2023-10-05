import React from "react";
import { saveAs } from "file-saver";
import { DataForXML } from "./formattedArraysStructure";

const XMLDownloadButton = () => {
  const generateXMLContent = () => {
    // Create an example XML content
    let URlsMap = DataForXML();
    let date = new Date();
    date = [
      date.getFullYear(),
      ("0" + (date.getMonth() + 1)).slice(-2),
      ("0" + date.getDate()).slice(-2),
    ].join("-");

    for (const category in URlsMap) {
      let content = "";
      URlsMap[category].forEach((item) => {
        content =
          content +
          ` <url>
     <loc>https://zolostays.com/${item}</loc>
     <priority>1.0</priority>
     <changefreq>Daily</changefreq>		   
     <lastmod>${date}</lastmod>
  </url> \n`;
      });
      let xmlContent = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${content}
</urlset>`;
      let blob = new Blob([xmlContent], { type: "application/xml" });
      saveAs(blob, `${category}.xml`);
    }

    //const blob = new Blob([xmlContent], { type: "application/xml" });
    // saveAs(blob, 'data.xml');
  };

  return (
    <div
      style={{
        marginTop: "3rem",
      }}
    >
      <button onClick={generateXMLContent}>Download XML</button>
    </div>
  );
};

export default XMLDownloadButton;
