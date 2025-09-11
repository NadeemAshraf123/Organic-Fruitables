import React, { useState, useEffect } from "react";
import styles from "./AddDashboardCategory.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const AddDashboardCategory = () => {
  const [productCategoryName, setProductCategoryName] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCategorized, setIsCategorized] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchCategoryName, setSearchCategoryName] = useState("");
  const [searchActiveStatus, setSearchActiveStatus] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const stored = JSON.parse(localStorage.getItem("categoryname") || "[]");
  //   setCategoryList(stored);
  // }, []);
  
  useEffect(() => {
  
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategoryList(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Could not load categories from server");
    }
  };

  fetchCategories();
}, []);




  // const handleCategorySubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   if (productImage) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const newCategory = {
  //         id: uuidv4(),
  //         name: productCategoryName,
  //         image: reader.result as string,
  //         isActive: isCategorized,
  //       };

  //       const existingCategories = [...categoryList, newCategory];
  //       localStorage.setItem("categoryname", JSON.stringify(existingCategories));
  //       setCategoryList(existingCategories);
  //       toast.success("Category Added");
  //       setShowAddModal(false);
  //       resetForm();
  //     };
  //     reader.readAsDataURL(productImage);
  //   }
  // };


const handleCategorySubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  if (productImage) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newCategory = {
        name: productCategoryName,
        image: reader.result as string,
        isActive: isCategorized,
      };

      try {
        const res = await fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        });

        if (!res.ok) throw new Error("Failed to add category");

        const savedCategory = await res.json();
        setCategoryList((prev) => [...prev, savedCategory]);
        toast.success("Category Added!");
        setShowAddModal(false);
        resetForm();
      } catch (err) {
        console.error("Add Category Error:", err);
        toast.error("Could not add category");
      }
    };
    reader.readAsDataURL(productImage);
  }
};

  const resetForm = () => {
    setProductCategoryName("");
    setProductImage(null);
    setIsCategorized(true);
    setErrors({});
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productCategoryName.trim()) newErrors.productCategoryName = "Category name is required";
    if (!productImage) newErrors.productImage = "Category image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSaveEditedCategory = () => {
  //   const updatedList = categoryList.map((cat) =>
  //     cat.id === editingCategory.id ? editingCategory : cat
  //   );
  //   localStorage.setItem("categoryname", JSON.stringify(updatedList));
  //   setCategoryList(updatedList);
  //   toast.success("Category updated!");
  //   setIsEditing(false);
  //   setEditingCategory(null);
  // };

  const handleSaveEditedCategory = async () => {
    if (!editingCategory) return;

    try {
      const res = await fetch(
        `http://localhost:3000/categories/${editingCategory.id}`,{
          method: "PUT" ,
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify(editingCategory),
        }
      );

      if (!res.ok) throw new Error("Failed to update category");

      const updated = await res.json();
      setCategoryList((prev)  => prev.map((cat) => (cat.id === updated.id ? updated : cat))
    );
    toast.success("Category updated:");
    setIsEditing(false);
    setEditingCategory(null);
    } catch (err) {
      console.error("Updated Error:", err);
      toast.error("COuld not update category");
    }
  };

  // const deleteCategory = (id: string) => {
  //   const confirmDelete = window.confirm("Are you sure you want to delete this category?");
  //   if (!confirmDelete) return;
    
  //   const filtered = categoryList.filter((cat) => cat.id !== id);
  //   localStorage.setItem("categoryname", JSON.stringify(filtered));
  //   setCategoryList(filtered);
  //   toast.success("Category deleted!");
  // };
const deleteCategory = async (id: string) => {
  const confirmDelete =window.confirm("Are you sure you want to delete this category");
  if (!confirmDelete) return;
  
  try {
    const res = await fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete category");

    setCategoryList((prev) => prev.filter((cat) => cat.id !== id));
    toast.success("Category deleted!");
  } catch (err) {
    console.error("Delete Error:", err);
    toast.error("COuld not delete category");
  }
};



  const filteredCategories = categoryList.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchCategoryName.toLowerCase());
    const statusMatch = searchActiveStatus === "" || 
      (searchActiveStatus === "true" && item.isActive) || 
      (searchActiveStatus === "false" && !item.isActive);
    return nameMatch && statusMatch;
  });

  const handleResetSearch = () => {
    setSearchCategoryName("");
    setSearchActiveStatus("");
    toast.success("Search filters reset");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <h2 className={styles.title}>Category Management</h2> */}
        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchCategoryName}
              onChange={(e) => setSearchCategoryName(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button 
            onClick={() => setShowAddModal(true)} 
            className={styles.addButton}
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.categoryTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className={styles.categoryImage}
                    />
                  ) : (
                    <span className={styles.noImage}>No image</span>
                  )}
                </td>
                <td>
                  <span className={item.isActive ? styles.activeYes : styles.activeNo}>
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <button
                      onClick={() => {
                        setEditingCategory(item);
                        setIsEditing(true);
                      }}
                      className={styles.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteCategory(item.id)}
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

      {filteredCategories.length === 0 && (
        <div className={styles.noCategories}>
          No categories found. Try adjusting your search or add a new category.
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
            <h3>Add New Category</h3>
            <form onSubmit={handleCategorySubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Category Name</label>
                <input
                  type="text"
                  value={productCategoryName}
                  onChange={(e) => setProductCategoryName(e.target.value)}
                />
                {errors.productCategoryName && (
                  <span className={styles.error}>{errors.productCategoryName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProductImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                {errors.productImage && (
                  <span className={styles.error}>{errors.productImage}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      checked={isCategorized}
                      onChange={() => setIsCategorized(true)}
                    />
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isActive"
                      checked={!isCategorized}
                      onChange={() => setIsCategorized(false)}
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  Add Cate
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

      {/* Edit Category Modal */}
      {isEditing && editingCategory && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              onClick={() => setIsEditing(false)} 
              className={styles.closeButton}
            >
              ×
            </button>
            <h3>Edit Category</h3>
            <form>
              <div className={styles.formGroup}>
                <label>Category Name</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className={styles.formGroup}>
                <label>Image</label>
                {editingCategory.image && (
                  <img
                    src={editingCategory.image}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditingCategory({
                          ...editingCategory,
                          image: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="editIsActive"
                      checked={editingCategory.isActive}
                      onChange={() =>
                        setEditingCategory({ ...editingCategory, isActive: true })
                      }
                    />
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="editIsActive"
                      checked={!editingCategory.isActive}
                      onChange={() =>
                        setEditingCategory({ ...editingCategory, isActive: false })
                      }
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleSaveEditedCategory}
                  className={styles.submitButton}
                >
                  Save
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
    </div>
  );
};

export default AddDashboardCategory;