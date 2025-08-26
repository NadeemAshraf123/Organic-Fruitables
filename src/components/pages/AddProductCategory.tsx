import React from "react";
import styles from "./AddProductCategory.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const AddProductCategory = () => {
  const [productCategoryName, setProductCategoryName] = React.useState("");
  const [productImage, setProductImage] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [isCategorized, setIsCategorized] = React.useState<boolean | null>(
    null
  );
  const [categoryList, setCategoryList] = React.useState<any[]>([]);
  const [editingCategory, setEditingCategory] = React.useState<any | null>(
    null
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();
  const [searchCategoryName, setSearchCategoryName] =
    React.useState<string>("");
  const [searchActiveStatus, setSearchActiveStatus] =
    React.useState<string>("");

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("categoryname") || "[]");
    setCategoryList(stored);
    console.log("extract by system useefect", stored);
  }, []);

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (productImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const newCategory = {
          id: uuidv4(),
          name: productCategoryName,
          image: reader.result as string,
          isActive: isCategorized,
        };

        const existingCategories = [...categoryList, newCategory];
        localStorage.setItem(
          "categoryname",
          JSON.stringify(existingCategories)
        );
        setCategoryList(existingCategories);

        toast.success("Category Added");
        setProductCategoryName("");
        setProductImage(null);
        setIsCategorized(false);
        setErrors({});
      };

      reader.readAsDataURL(productImage);
    }
  };

  const handleSaveEditedCategory = () => {
    const updatedList = categoryList.map((cat) =>
      cat.id === editingCategory.id ? editingCategory : cat
    );
    localStorage.setItem("categoryname", JSON.stringify(updatedList));
    setCategoryList(updatedList);
    toast.success("Category updated!");
    setIsEditing(false);
    setEditingCategory(null);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productCategoryName.trim()) {
      newErrors.productCategoryName = "Category name is required";
    }
    if (!productImage) {
      newErrors.productImage = "Category image is required";
    }
    if (isCategorized === null) {
      newErrors.isCategorized = "Please select Yes or No";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const BackToHome = () => {
    navigate("/");
  };

  const filteredCategories = categoryList.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchCategoryName.toLowerCase());

    const statusMatch = (() => {
      const normalized = searchActiveStatus.trim().toLowerCase();

      if (normalized === "") return true; 
      if (normalized === "true") return item.isActive === true;
      if (normalized === "false") return item.isActive === false;
      return false;
    })();

    return nameMatch && statusMatch;
  });

  console.log("normalized", searchActiveStatus);

  const HandleResetFunctionality = () => {

        if (!setSearchActiveStatus && !setSearchCategoryName) return ;
        
    toast.success("search feilds are reset");
    setSearchActiveStatus("");
    setSearchCategoryName("");

  }

  return (
    <>
      <h1 className={styles.categorypageheading} style={{fontSize:"40px" , fontFamily:"sans-serif", fontWeight:"bolder"}}>Product Category Page</h1>
      <form onSubmit={handleCategorySubmit}  className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Category Name:
            <input
              type="text"
              value={productCategoryName}
              onChange={(e) => setProductCategoryName(e.target.value)}
              className={styles.input}
            />
          </label>
          {errors.productCategoryName && (
            <div className={styles.errorText}>{errors.productCategoryName}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Product Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProductImage(e.target.files ? e.target.files[0] : null)
              }
              className={styles.input}
            />
          </label>
          {errors.productImage && (
            <div className={styles.errorText}>{errors.productImage}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Is Active:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="isCategorized"
                value="true"
                checked={isCategorized === true}
                onChange={() => setIsCategorized(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isCategorized"
                value="false"
                checked={isCategorized === false}
                onChange={() => setIsCategorized(false)}
              />
              No
            </label>
          </div>
          {errors.isCategorized && (
            <div className={styles.errorText}>{errors.isCategorized}</div>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Add
        </button>
        <button type="button" onClick={BackToHome} className={styles.button}>
          Home
        </button>
      </form>

      <h2 className={styles.categorypageheading}>Added Categories</h2>

      <div className={styles.categorypagesearchbars}>
        <input
          value={searchCategoryName}
          onChange={(e) => setSearchCategoryName(e.target.value)}
          className={styles.categorypagesearchinputfields}
          type="search"
          placeholder="search by category Name..."
        />

        <label className={styles.SearchActiveStatusLabel}>Is Active:
        <select
          value={searchActiveStatus}
          onChange={(e) => setSearchActiveStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        </label>

            <button className={styles.resetbutton} onClick={HandleResetFunctionality}> Reset </button>
      </div>


      {filteredCategories.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                    }}
                  />
                </td>
                <td>{item.isActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    style={{ marginRight: "8px" }}
                    className={styles.categoryeditbutton}
                    onClick={() => {
                      setEditingCategory(item);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.categoryeditbutton}
                    onClick={() => {
                      const filtered = categoryList.filter(
                        (cat) => cat.id !== item.id
                      );
                      localStorage.setItem(
                        "categoryname",
                        JSON.stringify(filtered)
                      );
                      setCategoryList(filtered);
                      toast.warn("Category deleted!");
                    }}
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
          No categories added yet.
        </h2>
      )}

      {isEditing && editingCategory && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3>Edit Category</h3>
            <label className={styles.label}>
              Category Name:
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                  })
                }
                className={styles.modalinput}
              />
            </label>
        

            <img
              src={editingCategory.image}
              alt="Preview"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                marginBottom: "0.5rem",
              }}
            />

            <label className={styles.label}>
              Category Image:
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
                className={styles.modalinput}
              />
            </label>

            <label className={styles.label}>Is Active:</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="isActive"
                  checked={editingCategory.isActive === true}
                  onChange={() =>
                    setEditingCategory({ ...editingCategory, isActive: true })
                  }
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isActive"
                  checked={editingCategory.isActive === false}
                  onChange={() =>
                    setEditingCategory({ ...editingCategory, isActive: false })
                  }
                />
                No
              </label>
            </div>

            <div className={styles.modalButton}>
              <button
                onClick={handleSaveEditedCategory}
                className={styles.modalsavebutton}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCategory(null);
                }}
                className={styles.modalcancelbutton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductCategory;