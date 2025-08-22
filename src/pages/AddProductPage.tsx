import React, { useEffect } from "react";
import styles from "./AddProduct.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Category = { id: string; name: string; isActive: boolean };

const AddProductPage = () => {
  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productImages, setProductImages] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [productCategory, setProductCategory] = React.useState<string[]>([]);
  const [isFeatured, setIsFeatured] = React.useState<string>("false");
  const [tableProducts, setTableProducts] = React.useState<any[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
  const [usersCategories, setUsersCategories] = React.useState<Category[]>([]);

  const [searchName, setSearchName] = React.useState<string>("");
  const [searchCategory, setSearchCategory] = React.useState<string>("");
  const [searchFeatured, setSearchFeatured] = React.useState<string>("");
  const [productRating, setProductRating] = React.useState<number>(0);


  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    const Categories = JSON.parse(localStorage.getItem("categoryname") || "[]");

    console.log("Loaded products:", storedProducts);
    console.log("Loaded categories:", Categories);

    setTableProducts(storedProducts);
    setUsersCategories(Categories);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (productImages.length > 0) {
      const imagePromises = productImages.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((base64Images) => {
        const selectedCategoryObject = {
          id: productCategory?.id,
          name: productCategory?.name
        };

        const newProduct = {
          id: uuidv4(),
          name: productName,
          price: productPrice,
          images: base64Images,
          category: selectedCategoryObject,
          rating: productRating,
          isFeatured: isFeatured === "true"
        };

        const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
        existingProducts.push(newProduct);
        localStorage.setItem("products", JSON.stringify(existingProducts));
        setTableProducts(existingProducts);
        toast.success("Product added successfully with image(s)");

        setProductName("");
        setProductPrice("");
        setProductImages([]);
        setProductCategory(null); 
        setProductRating(0);
        setIsFeatured("false");
        setErrors({});
      });
    }
  };



  const handleImageChange = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setProductImages(filesArray);
    }
  };

  const BackToHome = () => {
    navigate("/");
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    const priceValue = Number(productPrice);
    if (!productPrice || isNaN(priceValue) || priceValue <= 0) {
      newErrors.productPrice = "Valid product price is required";
    }

    if (productImages.length === 0) {
      newErrors.productImage = "Product image is required";
    }

    if (!productCategory || productCategory.length === 0) {
      newErrors.productCategory = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEdit = (product: any) => {
    setEditingProduct({ ...product });
    setProductCategory(product.category);

    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsEditing(false);
  };
  

  const saveEditProduct = () => {
    const selectedCategory = usersCategories.find(
      (cat) => productCategory == cat.id
    );

    if (!selectedCategory) {
      toast.error("Selected category not found!");
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      category: {
        id: selectedCategory.id,
        name: selectedCategory.name
      }
    };

    const updatedList = tableProducts.map((p) =>
      p.id === editingProduct.id ? updatedProduct : p
    );

    localStorage.setItem("products", JSON.stringify(updatedList));
    setTableProducts(updatedList);
    setIsEditing(false);
    setEditingProduct(null);
    toast.success("Product updated successfully");
  };







  const deleteProduct = (id: string) => {
    const filtered = tableProducts.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(filtered));
    setTableProducts(filtered);

    toast.success("Product deleted successfully", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const checkFeaturedMatch = (
    itemIsFeatured: boolean,
    inputValue: string
  ): boolean => {
    const normalized = inputValue.trim().toLowerCase();
    if (normalized === "") return true;
    if (normalized === "true") return itemIsFeatured === true;
    if (normalized === "false") return itemIsFeatured === false;
    return false;
  };

  const filteredProducts = tableProducts.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const categoryMatch = searchCategory === "" ||
      (Array.isArray(item.category)
        ? item.category.some((catId: string) => {
          const category = usersCategories.find(c => c.id === catId);
          return category?.name.toLowerCase().includes(searchCategory.toLowerCase());
        })
        : (() => {
          const category = usersCategories.find(c => c.id === item.category);
          return category?.name.toLowerCase().includes(searchCategory.toLowerCase());
        })()
      );

    const featuredMatch = checkFeaturedMatch(item.isFeatured, searchFeatured);

    return nameMatch && categoryMatch && featuredMatch;
  });

  const handleResetFunctionality = () => {
    setSearchName("");
    setSearchCategory("");
    setSearchFeatured("");
  };

  return (
    <>
      {/* add product  */}
      <h3 style={{ textAlign: 'center', color: '#007BFF', marginTop:"180px", fontFamily:"sans-serif",fontSize:"35px",fontWeight:"bolder"}}>Add product & Display Table Form</h3>


      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={styles.input}
            />
          </label>
          {errors.productName && (
            <div className={styles.errorText}>{errors.productName}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Price:
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className={styles.input}
            />
          </label>
          {errors.productPrice && (
            <div className={styles.errorText}>{errors.productPrice}</div>
          )}
        </div>

        {/* <div className={styles.formGroup}>
          <label className={styles.label}>
            Category:
            <select
              multiple
              value={productCategory}
              onChange={(e) => {
                const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                setProductCategory(selectedValues);
              }}
              className={styles.input}
            >
              <option value="" disabled hidden>Select Category</option>
              {usersCategories
                .filter((category) => category.isActive === true)
                .map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
          {errors.productCategory && (
            <div className={styles.errorText}>{errors.productCategory}</div>
          )}
        </div> */}

        <select
          value={productCategory?.id || ""}
          onChange={(e) => {
            const selectedCat = usersCategories.find(cat => cat.id === e.target.value);
            setProductCategory(selectedCat);
          }}
          className={styles.input}
        >
          <option value="" disabled hidden>Select Category</option>
          {usersCategories
            .filter((category) => category.isActive)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>


        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Image:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className={styles.input}
            />
          </label>
          {errors.productImage && (
            <div className={styles.errorText}>{errors.productImage}</div>
          )}
        </div>

        <div className={styles.formGroup} >
          <label className={styles.label}>
            Product Rating:
            <div className={styles.ratingContainer} >
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`${styles.star} ${star <= productRating ? styles.filled : ''} `}
                  onClick={() => setProductRating(star)}>
                  *
                </span>

              ))}
            </div>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Is Featured:</label>
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

        <button type="submit" className={styles.button}>
          Add
        </button>
        <button type="button" onClick={BackToHome} className={styles.button}>
          Home
        </button>
      </form>

      {/* TABLE */}


      <h2 className={styles.AddProductstableheading}>Add Product Table</h2>

      <div className={styles.searchbars}>
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.ProductPageSearchInputfields}
          type="search"
          placeholder="Search by product name..."
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className={styles.ProductPageSearchInputfields}
        >
          <option value="">All Categories</option>
          {usersCategories
            .filter((category) => category.isActive === true)
            .map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>

        <label htmlFor="featuredSelect">
          Is Featured:
          <select
            value={searchFeatured}
            onChange={(e) => setSearchFeatured(e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <button
          onClick={handleResetFunctionality}
          className={styles.resetbutton}
        >
          Reset
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Product Image</th>
              <th>Rating</th>
              <th>Is Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                {/* <td>
                  {(() => {
                    if (!item.category || item.category.length === 0) return "-";

                    const categoriesToShow = Array.isArray(item.category)
                      ? item.category
                      : [item.category];

                    return (
                      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                        {categoriesToShow.map((catId: string) => {
                          const category = usersCategories.find(c => c.id === catId);
                          return category ? (
                            <li key={catId} style={{ margin: "4px", padding: "4px 0" }}>
                              {category.name} 
                            </li>
                          ) : null; 
                        }).filter(Boolean)} 
                      </ul>
                    );
                  })()}
                </td> */}

                {/* <td>
  {typeof item.category === "object" && item.category?.name
    ? <span>{item.category.name}</span>
    : "-"}
</td> */}
                <td>
                  {item.category?.name ? <span>{item.category.name}</span> : "-"}
                </td>



                <td>
                  {Array.isArray(item.images) ? (
                    item.images.map((imgSrc: string, i: number) => (
                      <img
                        key={i}
                        src={imgSrc}
                        alt={`${item.name}-${i}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          marginRight: "5px",
                          objectFit: "cover"
                        }}
                      />
                    ))
                  ) : item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        marginRight: "5px",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>

                <td>
                  {Array.from({ length: item.rating || 0 }).map((_, i) => (
                    <span key={i} style={{ color: 'gold',fontSize:'30px' }}> * </span>
                  ))}
                  {item.rating === 0 && <span>NO rating</span>}
                </td>




                <td>{item.isFeatured ? "Yes" : "No"}</td>
                <td>
                  <button
                    className={styles.Allbuttonsgeneralstyling}
                    style={{ marginRight: "8px" }}
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.Allbuttonsgeneralstyling}
                    onClick={() => deleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2 style={{ padding: "1rem", textAlign: "center" }}>
          No Products Found...
        </h2>
      )}



      {/* Edit Modal */}
      {isEditing && editingProduct && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>Edit Product</h3>

            <label className={styles.label}>
              Product Name:
              <input
                type="text"
                value={editingProduct.name || ""}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className={styles.modalinput}
              />
            </label>

            <label className={styles.label}>
              Product Price:
              <input
                type="number"
                value={editingProduct.price || ""}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                className={styles.modalinput}
              />
            </label>

            <label className={styles.label}>
              Product Category:
              <select
                multiple
                value={editingProduct.category || []}
                onChange={(e) => {
                  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                  setEditingProduct({
                    ...editingProduct,
                    category: selectedValues,
                  });
                }}
                className={styles.modalinput}
              >
                {usersCategories
                  .filter(category => category.isActive)
                  .map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className={styles.modalformGroup}>
              <label className={styles.label}>Product Images:</label>

              {editingProduct.images && Array.isArray(editingProduct.images) && (
                <div style={{ marginBottom: "1rem" }}>
                  {editingProduct.images.map((imgSrc: string, i: number) => (
                    <img
                      key={i}
                      src={imgSrc}
                      alt={`${editingProduct.name}-${i}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        marginRight: "5px",
                        objectFit: "cover"
                      }}
                    />
                  ))}
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const fileArray = Array.from(files);
                    const imagePromises = fileArray.map((file) => {
                      return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                      });
                    });

                    Promise.all(imagePromises).then((base64Images) => {
                      setEditingProduct({
                        ...editingProduct,
                        images: base64Images,
                      });
                    });
                  }
                }}
                className={styles.modalinput}
              />
            </div>

            <label className={styles.label}>
              Product Rating:
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${star <= editingProduct.rating ? styles.filled : ''}`}
                    onClick={() => setEditingProduct({
                      ...editingProduct,
                      rating: star
                    })}
                  >
                    *
                  </span>
                ))}
              </div>
            </label>

            <div className={styles.formGroup}>
              <label className={styles.label}>Is Featured:</label>
              <div className={styles.radioGroup}>
                <label>
                  <input
                    type="radio"
                    name="editFeatured"
                    value="true"
                    checked={editingProduct.isFeatured === true}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        isFeatured: e.target.value === "true",
                      })
                    }
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="editFeatured"
                    value="false"
                    checked={editingProduct.isFeatured === false}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        isFeatured: e.target.value === "true",
                      })
                    }
                  />
                  No
                </label>
              </div>
            </div>

            <div className={styles.modalButton}>
              <button
                onClick={saveEditProduct}
                className={styles.modalsavebutton}
              >
                Save
              </button>
              <button onClick={cancelEdit} className={styles.modalcancelbutton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default AddProductPage;