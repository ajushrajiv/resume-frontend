// fileHandlers.ts
import { useState } from 'react';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

export const handleFileChange = (setEditValues: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (file.type === 'application/pdf') {
        try {
          const pdfData = new Uint8Array(event.target?.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          let textContent = '';
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContentPage = await page.getTextContent();
            const pageText = textContentPage.items
              .filter((item: any) => typeof item.str === 'string')
              .map((item: any) => item.str)
              .join(' ');
            textContent += pageText + '\n';
          }
          setEditValues((prevData: any) => ({ ...prevData, resume: textContent }));
        } catch (error) {
          console.error('Error extracting text from PDF:', error);
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;
          const { value: textContent } = await mammoth.extractRawText({ arrayBuffer });
          setEditValues((prevData: any) => ({ ...prevData, resume: textContent }));
        } catch (error) {
          console.error('Error extracting text from DOCX:', error);
        }
      } else {
        const textData = event.target?.result as string;
        setEditValues((prevData: any) => ({ ...prevData, resume: textData }));
      }
    };

    if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  }
};
