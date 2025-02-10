import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { convertToBase64 } from "../legends/helpers/convertToBase64";
import { postLegend, putLegend, getLegendById } from "../legends/services/apiService";

export const FormCreateUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    date: "",
    province: "",
    canton: "",
    district: "",
    imageUrl: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imageChanged, setImageChanged] = useState(false);

  // cargar data de la leyenda cuando es actualizar
  useEffect(() => {
    if (id) {
      const getLegendFromApi = async () => {
        try {
          const response = await getLegendById(id);
          if (response?.data) {
            setFormData({ ...response.data, id });
          } else {
            showErrorAlert("No se pudo cargar la leyenda");
          }
        } catch {
          showErrorAlert("No se pudo cargar la leyenda");
        }
      };

      getLegendFromApi();
    }
  }, [id]);

  // cargar imagen en el input
  useEffect(() => {
    if (id && fileInputRef.current && formData.imageUrl) {
      const mimeType = formData.imageUrl.includes("data:image/png;") ? "image/png" : "image/jpeg";
      const dataTransfer = new DataTransfer();
      const file = new File([formData.imageUrl], "image", {
        type: mimeType,
      });
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [id, formData.imageUrl]);

  // setear el formData cuando hay cambios
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl" && files[0]) {
      const base64Image = await convertToBase64(files[0]);
      setFormData({
        ...formData,
        [name]: base64Image,
      });
      setImageChanged(true);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      valid = false;
      newErrors.name = "El nombre es requerido";
    }
    if (!formData.category) {
      valid = false;
      newErrors.category = "La categoría es requerida";
    }
    if (!formData.description) {
      valid = false;
      newErrors.description = "La descripción es requerida";
    }
    if (!formData.date) {
      valid = false;
      newErrors.date = "La fecha es requerida";
    }
    if (!formData.province) {
      valid = false;
      newErrors.province = "La provincia es requerida";
    }
    if (!formData.canton) {
      valid = false;
      newErrors.canton = "El cantón es requerido";
    }
    if (!formData.district) {
      valid = false;
      newErrors.district = "El distrito es requerido";
    }
    if (!formData.imageUrl) {
      valid = false;
      newErrors.imageUrl = "La imagen es requerida";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let response;
        if (id) {
          if (imageChanged) {
            const file = fileInputRef.current.files[0];
            const base64Image = await convertToBase64(file);
            setFormData({
              ...formData,
              imageUrl: base64Image,
            });
          }
          console.log("Enviar para update", formData)
          response = await putLegend(id, formData);
        } else {
          response = await postLegend(formData);
        }
        if (response?.data?.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: id ? "La leyenda se ha actualizado correctamente." : "La leyenda se ha creado correctamente.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/");
          });
        } else {
          showErrorAlert(id ? "No se pudo actualizar la leyenda" : "No se pudo crear la leyenda");
        }
      } catch {
        showErrorAlert(id ? "No se pudo actualizar la leyenda" : "No se pudo crear la leyenda");
      }
    }
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: "warning",
      text: message,
      showConfirmButton: true,
      confirmButtonText: "Cerrar",
    });
  };

  const onCancel = () => {
    navigate('/');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="Escriba el nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Categoría</span>
          </label>
          <input
            type="text"
            placeholder="Escriba la categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.category && (
            <span className="text-red-500">{errors.category}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Descripción</span>
          </label>
          <textarea
            placeholder="Escriba la descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Fecha</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.date && <span className="text-red-500">{errors.date}</span>}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Provincia</span>
          </label>
          <input
            type="text"
            placeholder="Escriba la provincia"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.province && (
            <span className="text-red-500">{errors.province}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Cantón</span>
          </label>
          <input
            type="text"
            placeholder="Escriba el cantón"
            name="canton"
            value={formData.canton}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.canton && (
            <span className="text-red-500">{errors.canton}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Distrito</span>
          </label>
          <input
            type="text"
            placeholder="Escriba el distrito"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.district && (
            <span className="text-red-500">{errors.district}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Imagen</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            name="imageUrl"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <span className="text-red-500">{errors.imageUrl}</span>
          )}
        </div>
        <div className="md:col-span-1">
          <button type="submit" className="btn btn-outline btn-primary w-full">
            {id ? "Actualizar" : "Crear"}
          </button>
        </div>
        <div className="md:col-span-1">
          <button type="button" className="btn btn-outline btn-secondary w-full" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};