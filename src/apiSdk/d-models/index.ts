import axios from 'axios';
import queryString from 'query-string';
import { DModelInterface, DModelGetQueryInterface } from 'interfaces/d-model';
import { GetQueryInterface } from '../../interfaces';

export const getDModels = async (query?: DModelGetQueryInterface) => {
  const response = await axios.get(`/api/d-models${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDModel = async (dModel: DModelInterface) => {
  const response = await axios.post('/api/d-models', dModel);
  return response.data;
};

export const updateDModelById = async (id: string, dModel: DModelInterface) => {
  const response = await axios.put(`/api/d-models/${id}`, dModel);
  return response.data;
};

export const getDModelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/d-models/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDModelById = async (id: string) => {
  const response = await axios.delete(`/api/d-models/${id}`);
  return response.data;
};
