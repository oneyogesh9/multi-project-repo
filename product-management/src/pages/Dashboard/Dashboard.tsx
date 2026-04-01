import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, ProductFormValues } from "../../types";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";
import {
  ProductForm,
  ProductTable,
  SearchFilter,
  Pagination,
  DashboardCharts,
  Modal,
} from "../../components";

const PAGE_SIZE = 6;

const Dashboard: React.FC = () => {
  // URL Search Params - Store search, filter, and page in URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Get values from URL or use defaults
  const searchTerm = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Update URL when search, category, or page changes - memoized to prevent unnecessary re-renders
  const updateURLParams = useCallback(
    (newSearch?: string, newCategory?: string, newPage?: number) => {
      const params = new URLSearchParams();
      if (newSearch !== undefined && newSearch) params.set("search", newSearch);
      if (newCategory !== undefined && newCategory)
        params.set("category", newCategory);
      if (newPage !== undefined && newPage > 1)
        params.set("page", String(newPage));
      setSearchParams(params);
    },
    [setSearchParams],
  );

  // Fetch products on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchProducts();
        console.log("API response:", result);
        setProducts(result);
      } catch (err) {
        setError("Unable to fetch products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !lowerSearch ||
        product.title.toLowerCase().includes(lowerSearch) ||
        product.description.toLowerCase().includes(lowerSearch);
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    if (currentPage !== 1 && (searchTerm || categoryFilter)) {
      updateURLParams(searchTerm, categoryFilter, 1);
    }
  }, [searchTerm, categoryFilter, currentPage, updateURLParams]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  const shownProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const openFormForAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const openFormForEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const handleFormSubmit = async (values: ProductFormValues) => {
    if (editProduct) {
      const updatedProduct: Product = {
        ...editProduct,
        title: values.title,
        price: Number(values.price),
        category: values.category,
        description: values.description,
        image: values.image || editProduct.image,
      };
      try {
        await updateProduct(updatedProduct);
        setProducts((prev) =>
          prev.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item,
          ),
        );
      } catch {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === updatedProduct.id ? updatedProduct : item,
          ),
        );
      }
    } else {
      const newProductObject: Product = {
        id: Date.now(),
        title: values.title,
        price: Number(values.price),
        category: values.category,
        description: values.description,
        image: values.image || "https://via.placeholder.com/150",
        rating: { rate: 0, count: 0 },
      };

      try {
        const created = await createProduct({
          title: newProductObject.title,
          price: newProductObject.price,
          category: newProductObject.category,
          description: newProductObject.description,
          image: newProductObject.image,
        });
        setProducts((prev) => [created, ...prev]);
      } catch {
        setProducts((prev) => [newProductObject, ...prev]);
      }
    }

    setShowForm(false);
    setEditProduct(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="app-root">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>🛍️ Product Management Dashboard</h1>
            <p>
              Track products, manage inventory, and monitor category analytics.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-primary" onClick={openFormForAdd}>
              ➕ Add New Product
            </button>
          </div>
        </div>
        <div className="summary-cards">
          <div className="summary-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
          <div className="summary-card">
            <span>Categories</span>
            <strong>{categories.length}</strong>
          </div>
          <div className="summary-card">
            <span>Filtered</span>
            <strong>{filteredProducts.length}</strong>
          </div>
        </div>
      </header>

      <div className="dashboard-main">
        <aside className="dashboard-left">
          <div className="panel">
            <div className="panel-header">
              <h2>🔍 Quick Search & Filter</h2>
            </div>
            <SearchFilter
              q={searchTerm}
              category={categoryFilter}
              categories={categories}
              onQueryChange={(value) =>
                updateURLParams(value, categoryFilter, 1)
              }
              onCategoryChange={(value) =>
                updateURLParams(searchTerm, value, 1)
              }
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>📊 Dashboard Charts</h2>
            </div>
            <DashboardCharts products={products} />
          </div>
        </aside>

        <section className="dashboard-right">
          {error && <div className="alert-error">⚠️ {error}</div>}
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading product data...</p>
            </div>
          ) : (
            <>
              <ProductTable
                products={shownProducts}
                onEdit={openFormForEdit}
                onDelete={handleDelete}
              />
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={(page) =>
                  updateURLParams(searchTerm, categoryFilter, page)
                }
              />
            </>
          )}
        </section>
      </div>

      <Modal
        isOpen={showForm}
        onClose={handleFormCancel}
        title={editProduct ? "✏️ Edit Product" : "➕ Add New Product"}
      >
        <ProductForm
          productToEdit={editProduct || undefined}
          onCancel={handleFormCancel}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
