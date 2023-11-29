import React from "react";
import { saveAs } from "file-saver";
import { DataForXML } from "./formattedArraysStructure";
import { FileUpload } from "./convertXML";

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

  const [oldUrls, setOldUrls] = React.useState([]);
  const [newUrls, setNewUrls] = React.useState([]);

  const setArrayOld = (arr) => {
     console.log(arr);
     setOldUrls(arr);
  }
  const setArrayNew = (arr) => {  
    console.log(arr);
    setNewUrls(arr);
  }
  const getRemovedUrls = (oldUrls, newUrls)=>{
    let removedUrls = [];
    oldUrls.forEach((url)=>{
      if(!newUrls.includes(url)){
        removedUrls.push(url);
      }
    });
    console.log("removedUrls", removedUrls);
  };
  const getAddedUrls = (oldUrls, newUrls)=>{
    let addedUrls = [];
    newUrls.forEach((url)=>{
      if(!oldUrls.includes(url)){
        addedUrls.push(url);
      }
    });
    console.log("addedUrls", addedUrls);
  };

  return (
    <div
      style={{
        marginTop: "3rem",
      }}
    >
      <button onClick={generateXMLContent}>Download XML</button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: "1rem",
          padding: "3px",
          marginTop: "2rem",
        }}
      >

        <FileUpload setArrayValues={setArrayOld} titleText="Upload Old Sitemap"/>

        <FileUpload setArrayValues={setArrayNew} titleText="Upload New Sitemap"/>

        <button style={{ alignSelf : "center"}} onClick={() => {
          console.log("comparing" , oldUrls.length && newUrls.length );
          getRemovedUrls(oldUrls, newUrls);
          getAddedUrls(oldUrls, newUrls);
        }} disabled ={ ! (oldUrls.length && newUrls.length) }>Create diff</button>
      </div>
    </div>
  );
};

export default XMLDownloadButton;
