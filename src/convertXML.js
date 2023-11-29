import React, { useEffect, useState } from "react";

export const FileUpload = (props) => {
  const [xmlFile, setXmlFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setXmlFile(file);
  };

  useEffect(() => {
    if (!xmlFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const xmlData = event.target.result;
      const convertedData = convertXmlToText(xmlData);
      props.setArrayValues(convertedData);
    };
    reader.readAsText(xmlFile);
  }, [xmlFile]);

  const convertXmlToText = (xmlData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    let tagElements = xmlDoc.getElementsByTagName("loc");
    if (!tagElements.length) {
      return `No elements with the tag 'loc' found`;
    }
    let urlArray = [];
    for (const element of tagElements) {
      urlArray.push(element.textContent);
    }
    return urlArray;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        rowGap: ".5rem",
      }}
    >
      <div>{props.titleText} :</div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};
