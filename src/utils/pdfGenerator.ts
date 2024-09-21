export const generatePDF = (data: any[], title: string) => {
    // Create a new window
    const win = window.open('', '_blank');
    if (!win) {
      alert('Please allow popups for this website');
      return;
    }
  
    // Write the HTML content
    win.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <table>
            <thead>
              <tr>${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
  
    // Wait for content to be written
    win.document.close();
  
    // Trigger print when loaded
    win.onload = function() {
      win.print();
      win.onafterprint = function() {
        win.close();
      }
    }
  };