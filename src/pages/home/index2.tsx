import { S3Client } from "@aws-sdk/client-s3";
import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { useState } from "react";
import Image from "next/image";

const credentials = {
  accessKeyId: "LfTlPaILdwOGcyyH",
  secretAccessKey: "H8vEZ8zEA633ZjtkjO1jg7YG9dS3SrjJUHmId46J",
};

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global",
});

export default function Chuj(){

  const [file, setFile] = useState<File>()
  const src = "https://compostovnik.s3.tebi.io/tapetaujkofdik.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=LfTlPaILdwOGcyyH%2F20221120%2Fglobal%2Fs3%2Faws4_request&X-Amz-Date=20221120T060806Z&X-Amz-Expires=3600&X-Amz-Signature=e026507d49f798ae4ee9fed2acf81e9eeca3a14dc1458a98aa12b7f957ea6a50&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22DICK_DOWNLOAD.png%22&x-id=GetObject"
  return (
    <>
    <Image alt="szkieletor" loader={() => src} width={1000} height={1000} src={src} />
    <button onClick={async () => {
      const get_command = new GetObjectCommand({
        Bucket: "compostovnik",
        Key: "tapetaujkofdik.png",
        ResponseContentDisposition: 'attachment; filename="DICK_DOWNLOAD.png"'
      });
      const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });
        console.log(url);
        }}>Download</button>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        // Upload a file
        const upload_data = await s3Client.send(
          new PutObjectCommand({
            Bucket: "compostovnik",
            Key: file ? file.name : "",
            Body: file,
          })
        );
        console.log(upload_data);
      }}
    >
      <input
        type="file"
        onChange={(e) => {
          if (!e.target.files) return;
          setFile(e.target.files[0]);
        }}
      />
      <button type="submit"> aaaa</button>
    </form>
    </>
    

  )
}

