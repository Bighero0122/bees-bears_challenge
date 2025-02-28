import axios from 'axios';
import { WizardData } from '../types/wizard';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createEntity = async (data: Partial<WizardData>) => {
  const response = await api.post('/entities', data);
  return response.data;
};

export const getEntity = async (uuid: string) => {
  const response = await api.get(`/entities/${uuid}`);
  return response.data;
};

export const updateEntity = async (uuid: string, data: Partial<WizardData>) => {
  const response = await api.patch(`/entities/${uuid}`, data);
  return response.data;
}; 