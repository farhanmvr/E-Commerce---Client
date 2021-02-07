import axios from 'axios';

export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: { authtoken },
  });

export const updateSubCategory = async (slug, authtoken, name, parent) =>
  await axios.put(
    `${process.env.REACT_APP_API}/sub/${slug}`,
    { name, parent },
    {
      headers: { authtoken },
    }
  );

export const createSubCategory = async (authtoken, name, parent) =>
  await axios.post(
    `${process.env.REACT_APP_API}/sub`,
    { name, parent },
    {
      headers: { authtoken },
    }
  );
