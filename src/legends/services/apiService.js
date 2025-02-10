import Axios from "axios";

const BASE_URL = 'http://127.0.0.1:8080';

// crear
export const postLegend = async (data) => {
  try {
    const response = await Axios.post(`${BASE_URL}/legends/create`, data);
    return response;
  } catch (error) {
    console.log('Error al crear leyenda', error);
    throw error;
  }
}

// actualizar
export const putLegend = async (id, data) => {
  try {
    const response = await Axios.put(`${BASE_URL}/legends/update/${id}`, data);
    return response;
  } catch (error) {
    console.log('Error al actualizar leyenda', error);
    throw error;
  }
}

// eliminar por id
export const deleteLegend = async (id) => {
  try {
      const response = await Axios.delete(`${BASE_URL}/legends/delete/${id}`);
      return response;
  } catch (error) {
      console.error('Error getLeyendById:', error);
      throw error;
  }
};

// obtener por leyenda por id
export const getLegendById = async (id) => {
  try {
      const response = await Axios.get(`${BASE_URL}/legends/get/${id}`);
      console.log('Recibido de api', response);
      return response.data || {};
  } catch (error) {
      console.error('Error getLeyendById:', error);
      throw error;
  }
};

// Obtener lista de leyendas
export const getLegends = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/legends`);
      console.log('Recibido de api', response);
      return response.data || [];
    } catch (error) {
        console.error('Error getLegends:', error);
        throw error;
    }
  };

  // obtene lista filtrada
  export const getLegendByName = async (text = '') => {
    text = text.toLocaleLowerCase().trim();

    const legends = await getLegends();
    if (!legends.data) return [];

    let filteredLegends = legends.data.filter(legend => 
        legend.name.toLocaleLowerCase().includes(text)
    );

    if (filteredLegends.length === 0) {
        filteredLegends = legends.data.filter(legend => 
            legend.category.toLocaleLowerCase().includes(text) ||
            legend.province.toLocaleLowerCase().includes(text) ||
            legend.canton.toLocaleLowerCase().includes(text) ||
            legend.district.toLocaleLowerCase().includes(text)
        );
    }
    return filteredLegends;
};