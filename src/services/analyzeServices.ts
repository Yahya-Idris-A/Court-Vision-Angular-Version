import axiosIns from '../lib/axios';

export const setHeaders = () => {
  axiosIns.defaults.headers.common['Content-Type'] = 'application/json';
  axiosIns.defaults.headers.common['Authorization'] = `Bearer ${
    localStorage.getItem('token')?.replace(/['"]+/g, '') || ''
  }`;
};

// get all video
export async function getAllVideos() {
  try {
    const res = await axiosIns.get('/api/videos');
    return res.data.videos;
  } catch (err) {
    console.error('Error fetching video:', err);
    return null;
  }
}
