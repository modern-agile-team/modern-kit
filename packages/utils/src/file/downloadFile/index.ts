import { getBlobFromUrl } from '../getBlobFromUrl';

interface DownloadFileProps {
  url: string;
  fileType: string;
  fileName?: string;
}

const createAnchorAndDownload = ({
  url,
  fileType,
  fileName,
}: Required<DownloadFileProps>) => {
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${fileName}.${fileType}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadFile = async ({
  url,
  fileType,
  fileName = 'downloadFile',
}: DownloadFileProps) => {
  try {
    const blob = await getBlobFromUrl(url);
    const downloadUrl = window.URL.createObjectURL(blob);

    createAnchorAndDownload({ url, fileType, fileName });
    window.URL.revokeObjectURL(downloadUrl);
  } catch (err: any) {
    throw new Error('Downloading the file failed.');
  }
};
