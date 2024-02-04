export default async function DownloadChatFiles(files) {
  try {

    files.forEach(async file => {
      
      console.log(`fgiles`,file)
      const response = await fetch(file);
      const blob = await response.blob();
  
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
  }
};
  
  