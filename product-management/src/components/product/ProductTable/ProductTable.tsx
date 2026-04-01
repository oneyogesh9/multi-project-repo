import React from "react";
import { Product } from "../../../types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!products.length && (
            <tr>
              <td colSpan={6} className="no-data">
                No products found.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  className="table-image"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                {product.rating?.rate?.toFixed(1) ?? "0"} (
                {product.rating?.count ?? 0})
              </td>
              <td>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
