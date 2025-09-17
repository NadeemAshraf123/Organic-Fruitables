import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Style.module.css";

type Category = { id: string; name: string; isActive: boolean };

const AddDashboardProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [productCategory, setProductCategory] = useState<any>(null);
  const [isFeatured, setIsFeatured] = useState<string>("false");
  const [tableProducts, setTableProducts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [usersCategories, setUsersCategories] = useState<Category[]>([]);
  const [searchName, setSearchName] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");
  const [searchFeatured, setSearchFeatured] = useState<string>("");
  const [productRating, setProductRating] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("http://localhost:3000/products"),
        fetch("http://localhost:3000/categories"),
      ]);
      const products = await productsRes.json();
      const categories = await categoriesRes.json();
      setTableProducts(products);
      setUsersCategories(categories);
    } catch (err) {
      toast.error("Failed to fetch data from server");
      console.error(err);
    }
  };
  fetchData();
}, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    
    const imagePromises = productImages.map((imageFile) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    });

    const base64Images = await Promise.all(imagePromises);

    const newProduct = {
      id: uuidv4(),
      name: productName,
      price: productPrice,
      images: base64Images,
      category: productCategory,
      rating: productRating,
      isFeatured: isFeatured === "true",
    };


    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) throw new Error("Failed to save product");

    const savedProduct = await res.json();

    setTableProducts((prev) => [...prev, savedProduct]);

    toast.success("Product added successfully!");
    setShowAddModal(false);
    resetForm();
  } catch (err) {
    console.error("Error while saving product:", err);
    toast.error("Could not save product. Try again!");
  }
};


  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductImages([]);
    setProductCategory(null);
    setProductRating(0);
    setIsFeatured("false");
    setErrors({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setProductImages(filesArray);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productName.trim()) newErrors.productName = "Product name is required";
    if (!productPrice || isNaN(Number(productPrice)) || Number(productPrice) <= 0) 
      newErrors.productPrice = "Valid price is required";
    if (productImages.length === 0) newErrors.productImage = "Image is required";
    if (!productCategory) newErrors.productCategory = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (product: any) => {
    setEditingProduct({ ...product });
    setProductCategory(product.category);
    setIsEditing(true);
  };

const saveEditProduct = async () => {
  if (!editingProduct) return;

  const updatedProduct = {
    ...editingProduct,
    category: productCategory,
  };

  try {
    const res = await fetch(`http://localhost:3000/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) throw new Error("Failed to update product");

    const savedProduct = await res.json();


    setTableProducts((prev) =>
      prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
    );

    setIsEditing(false);
    setEditingProduct(null);
    toast.success("Product updated successfully!");
  } catch (err) {
    console.error("Update Error:", err);
    toast.error("Could not update product");
  }
};


  const deleteProduct = async (id: string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete product");

  
    setTableProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully!");
  } catch (err) {
    console.error("Delete Error:", err);
    toast.error("Could not delete product");
  }
};




  const filteredProducts = tableProducts.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchName.toLowerCase());
    const categoryMatch = searchCategory === "" || 
      (item.category?.name?.toLowerCase().includes(searchCategory.toLowerCase()));
    const featuredMatch = searchFeatured === "" || 
      (searchFeatured === "true" && item.isFeatured) || 
      (searchFeatured === "false" && !item.isFeatured);
    return nameMatch && categoryMatch && featuredMatch;
  });
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)} 
            className={styles.addButton}
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category?.name || "-"}</td>
                <td>
                  {item.images?.[0] ? (
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      className={styles.productImage}
                    />
                  ) : (
                    <span className={styles.noImage}>No image</span>
                  )}
                </td>
                <td>
                  <div className={styles.rating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={`${styles.star} ${
                          star <= item.rating ? styles.filled : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={item.isFeatured ? styles.featuredYes : styles.featuredNo}>
                    {item.isFeatured ? "Yes" : "No"}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => startEdit(item)}
                      className={styles.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className={styles.noProducts}>
          No products found. Try adjusting your search or add a new product.
        </div>
      )}




      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => setShowAddModal(false)} 
              className={styles.closeButton}
            >
              ×
            </button>
            <h3 style={{fontSize:"20px", fontWeight:"bold"}}>Add New Product</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {errors.productName && <span className={styles.error}>{errors.productName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Price</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
                {errors.productPrice && <span className={styles.error}>{errors.productPrice}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={productCategory?.id || ""}
                  onChange={(e) => {
                    const selectedCat = usersCategories.find(cat => cat.id === e.target.value);
                    setProductCategory(selectedCat);
                  }}
                >
                  <option value="" disabled>Select Category</option>
                  {usersCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.productCategory && <span className={styles.error}>{errors.productCategory}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {errors.productImage && <span className={styles.error}>{errors.productImage}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${styles.starSelect} ${
                        star <= productRating ? styles.selected : ""
                      }`}
                      onClick={() => setProductRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Featured</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="featured"
                      value="true"
                      checked={isFeatured === "true"}
                      onChange={(e) => setIsFeatured(e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="featured"
                      value="false"
                      checked={isFeatured === "false"}
                      onChange={(e) => setIsFeatured(e.target.value)}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditing && editingProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => setIsEditing(false)} 
              className={styles.closeButton}
            >
              ×
            </button>
            <h3 style={{fontSize:"16px",fontWeight:"bold"}}>Edit Product</h3>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Price</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={editingProduct.category?.id || ""}
                  onChange={(e) => {
                    const selectedCat = usersCategories.find(cat => cat.id === e.target.value);
                    setEditingProduct({
                      ...editingProduct,
                      category: selectedCat
                    });
                  }}
                >
                  <option value="" disabled   className={styles.categoriesoptionSelection} style={{width: "50px"}}>Select Category</option>
                  {usersCategories.map((category) => (
                    <option key={category.id} value={category.id}  style={{width: "50px"}}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${styles.starSelect} ${
                        star <= editingProduct.rating ? styles.selected : ""
                      }`}
                      onClick={() =>
                        setEditingProduct({
                          ...editingProduct,
                          rating: star
                        })
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Featured</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="editFeatured"
                      checked={editingProduct.isFeatured}
                      onChange={() =>
                        setEditingProduct({
                          ...editingProduct,
                          isFeatured: true
                        })
                      }
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="editFeatured"
                      checked={!editingProduct.isFeatured}
                      onChange={() =>
                        setEditingProduct({
                          ...editingProduct,
                          isFeatured: false
                        })
                      }
                    />
                    No
                  </label>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={saveEditProduct}
                  className={styles.submitButton}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddDashboardProduct;