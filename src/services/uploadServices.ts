import axiosIns from '../lib/axios';

export const setHeaders = () => {
  axiosIns.defaults.headers.common['Content-Type'] = 'application/json';
  axiosIns.defaults.headers.common['Authorization'] = `Bearer ${
    localStorage.getItem('token')?.replace(/['"]+/g, '') || ''
  }`;
};

export async function getSignedUrl(
  filename: string,
  contentType: string,
  signal?: AbortSignal
) {
  const res = await axiosIns.post(
    '/api/s3/upload/presign',
    { filename, contentType },
    { signal }
  );
  return res;
}

export async function createMultipartUpload(
  filename: string,
  contentType: string,
  metadata: any
) {
  const res = await axiosIns.post('/api/s3/upload/multipart', {
    filename,
    contentType,
    metadata,
  });
  return res.data;
}

export async function signPart(
  uploadId: string,
  key: string,
  partNumber: number,
  signal?: AbortSignal
) {
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3/upload/multipart/${uploadId}/${partNumber}?key=${filename}`,
    {
      signal,
    }
  );
  return res.data;
}

export async function listParts(
  uploadId: string,
  key: string,
  signal?: AbortSignal
) {
  const filename = encodeURIComponent(key);
  const res = await axiosIns.get(
    `/api/s3//upload/multipart/${uploadId}?key=${filename}`,
    {
      signal,
    }
  );
  return res.data;
}

export async function completeMultipartUpload(
  uploadId: string,
  key: string,
  parts: any[],
  signal?: AbortSignal
) {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  const res = await axiosIns.post(
    `/api/s3/upload/multipart/${uploadIdEnc}/complete?key=${filename}`,
    { parts },
    { signal }
  );
  return res.data;
}

export async function abortMultipartUpload(
  uploadId: string,
  key: string,
  signal?: AbortSignal
) {
  const filename = encodeURIComponent(key);
  const uploadIdEnc = encodeURIComponent(uploadId);
  const res = await axiosIns.delete(
    `/api/s3/upload/multipart/${uploadIdEnc}?key=${filename}`,
    {
      signal,
    }
  );
  return res.data;
}

export async function uploadAllData(
  title: string,
  date: string,
  venue: string,
  video_url: string
) {
  const res = await axiosIns.post('/api/videos', {
    title,
    date,
    venue,
    video_url,
  });
  return res;
}
