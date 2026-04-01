import React, { useEffect, useState } from "react";
import { ProductFormValues } from "../../../types";

interface ProductFormProps {
  productToEdit?: {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => void;
}

const initialState: ProductFormValues = {
  title: "",
  price: "",
  category: "",
  description: "",
  image: "",
};

const ProductForm: React.FC<ProductFormProps> = ({
  productToEdit,
  onCancel,
  onSubmit,
}) => {
  const [values, setValues] = useState<ProductFormValues>(initialState);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (productToEdit) {
      setValues({
        title: productToEdit.title,
        price: String(productToEdit.price),
        category: productToEdit.category,
        description: productToEdit.description,
        image: productToEdit.image,
      });
      setImagePreview(productToEdit.image);
    } else {
      setValues(initialState);
      setImagePreview("");
    }
  }, [productToEdit]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setValues((prev) => ({ ...prev, image: result }));
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !values.title ||
      !values.price ||
      !values.category ||
      !values.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit(values);
    setValues(initialState);
    setImagePreview("");
  };

  return (
    <div className="form-panel">
      <h3>{productToEdit ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Name
          <input name="title" value={values.title} onChange={handleChange} />
        </label>
        <label>
          Price
          <input
            name="price"
            value={values.price}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={values.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={3}
          />
        </label>
        <label>
          Image Upload
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {imagePreview && (
          <img className="image-preview" src={imagePreview} alt="Preview" />
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {productToEdit ? "Update" : "Add"} Product
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
