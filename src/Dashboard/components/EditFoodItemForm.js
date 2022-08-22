import React, { useState } from "react";
import "./EditFoodItemForm.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editFoodItemSchema } from "../../validations/EditFoodItem";
import { UpdateFoodItem } from "../menuActions";
import spinner from "../../assests/spinner.gif";

const EditFoodItemForm = ({ itemInfo, editItem, popUpMessage }) => {
  const [formState, setFormState] = useState({
    name: itemInfo.name,
    description: itemInfo.description,
    foodItemId: itemInfo._id,
    price: itemInfo.price,
    image: itemInfo.image,
  });
  const [preview, setPreview] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [loader, setLoader] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    let typedValue = value;
    if (!value) {
      typedValue = undefined;
    }
    setFormState({
      ...formState,
      [name]: typedValue,
    });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreview(reader.result);
    setRemoveImage(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileInput(e.target.value);
    previewFile(file);
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(editFoodItemSchema),
  });

  async function SubmitForm(e) {
    e.preventDefault();
    const validatedData = await editFoodItemSchema.validate(formState);
    try {
      setLoader(true);
      if (validatedData) {
        let dataToBesent = "";
        if (preview) {
          dataToBesent = {
            name: formState.name,
            description: formState.description,
            foodItemId: formState.foodItemId,
            price: formState.price,
            image: preview,
          };
        } else if (removeImage === true) {
          dataToBesent = {
            name: formState.name,
            description: formState.description,
            foodItemId: formState.foodItemId,
            price: formState.price,
            image: null,
          };
        } else {
          dataToBesent = {
            name: formState.name,
            description: formState.description,
            foodItemId: formState.foodItemId,
            price: formState.price,
          };
        }

        let response = await UpdateFoodItem(dataToBesent);
        console.log(response);
        setLoader(false);
        popUpMessage(response.data.message);
        editItem();
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  }
  return (
    <div className="EditFoodItemWrapper p-2">
      <div
        className="EditFoodItemBackBtn text-2xl cursor-pointer"
        onClick={() => {
          editItem();
        }}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="editFoodItemForm mt-5 ">
        <form
          className="flex justify-center"
          onSubmit={(e) => {
            SubmitForm(e);
          }}
        >
          <div className="editFoodItemInputWrapper md:w-1/2 w-5/6 pt-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Name"
              >
                Item Name
              </label>
              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Food item Name"
                value={formState.name}
                name="name"
                onInput={onChangeHandler}
                {...register("name")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.name ? { display: "block" } : {}}
              >
                {errors.name?.message}
              </div>
            </div>
            <div className="mt-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Description"
              >
                description
              </label>
              <textarea
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Food item Name"
                value={formState.description}
                name="description"
                onInput={onChangeHandler}
                {...register("description")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.description ? { display: "block" } : {}}
              >
                {errors.description?.message}
              </div>
            </div>
            <div className="mt-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Price"
              >
                Price
              </label>
              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Food item Name"
                value={formState.price}
                name="price"
                onInput={onChangeHandler}
                {...register("price")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.price ? { display: "block" } : {}}
              >
                {errors.price?.message}
              </div>
            </div>
            <div className="mt-2 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Image"
              >
                Image
              </label>
              <div className="foodItemImgContainter  md:flex  ">
                <>
                  {preview ? (
                    <img
                      className="foodItemImage w-40"
                      src={preview}
                      alt="FoodItemImage"
                    />
                  ) : (
                    <>
                      {formState.image ? (
                        <img
                          className="foodItemImage w-40"
                          src={formState.image}
                          alt="FoodItemImage"
                        />
                      ) : (
                        <div>
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADmElEQVR4nO2cS2sVMRSAv7ZyfYCLKi5Ei6hIhQp1Zd2IK3+J/gwXdScoPupK8A9UKwXxCW7duVPBjYI7obXYKoLQUhdzL5ZL7yQzmSQnyfngrNqcnORr5jaZOwOKoiiKYuYsMBa7iFK5BPwCHqISgjOY/O1+qISADE++SgjIqMlXCQEwTb5K8MwTzJM/iAeohM7pAc+wl6ArwQMqQQAqQQAqQQAqQQB7gZf4+e9oFlhtkFtS/AY+AveAc5bjbcUEcKthcaVIGMRmf8w9yzFbswd43rKo0iRsA2/pWMJNx4JKlLBgOV4jp4GtDgoqTcImMGM53lpud1hUaRLuWI61lvcdF1WShA+W46xlzUNhTfYJs8CKhxpCxIblGGsxdTKg1M2a7fwE6aA0CWMIEwBlSRApAMqRIFYAlCFBtADIX4J4AZC3hCQEQL4SkhEAfu8nuDIFLFFtnDaAZWDasm0yAkCmhCngxy59r/V/ZiIpASBPwlJN348NbZO6BO1EkoSNmn7XDW2TFQByJNQJ+Glom7QAkCFhuaa/RUPb5AVAfAnT7H7kvgocN7TNQgDElzBF9YG73o9FzJMPGQmANDdrWQmA9CRkJwDSkpClAEhHQrYCIA0J4xZ1ORNLAMiXkL0AkC2hCAEgV0IxAkCmhKIEgDwJ2Qi4RvUVeBskSchCwCzwp58rNQnJC5gEvgzlS0lC0gLGGX0CmoqEpAXMG/LOW+a5bFHjzujyKDtZAVeoHuEx5TathFPAd4s8vlZCkgJO0OyBi1ESDgOfG+TxISE5Afto98jTsIT9wLsWebqWkJyARxb5TBLGqf8uT0gJSQm4apHLFPPA3Q7yDEfbD+ZkBJzn/2ZLarRZCUkImAS+WuSREE0liBdQt9mSGk0uR2OYn2N2xkXADYv2EqPL55id8b7EAuHz2KJOgjO5CIA4EpzJSQCEl+BMbgIgrARnchQA4SQ4k6sACCPBmZwFgP+3QTqTuwCIf2etlrpnqEqOYBI+RRhcKrGAo4QJi985A1x06SRj5oCjwAufncxgd/+25Gi9EmxWwApwBLjQpoNCmKM6dn/jq4Me1et4Y/+lSY/7ePxg7lEtNb0c1Uejy5HNJWjAFvAKeAr8BQ4CB/DwpvDEmQMOAa9jF5IbojdrpaASBND07Oh6nDLzxnYlfANORqoxe0wSdPIDMEqCTn5AhiXo5EdgIEEnPyJ7gWOxi1AURVEURVEUC/4BS+cxh4rMvMYAAAAASUVORK5CYII="
                            alt="noImageAvaliable"
                          />
                          <p>Image not avaliable</p>
                        </div>
                      )}
                    </>
                  )}
                </>

                <div className="foodItemImgEditBtn mt-5 ml-5">
                  <div className="flex justify-center mb-4">
                    <input
                      type="file"
                      onChange={handleFileInputChange}
                      value={fileInput}
                      className="form-input"
                    />
                  </div>
                  <>
                    {preview ? (
                      <div
                        value="delete"
                        className="clearFoodItemImgBtn shadow-md mt-2  text-md md:text-base md:mt-4 lg:text-base"
                        onClick={() => {
                          setPreview("");
                        }}
                      >
                        Clear Image
                      </div>
                    ) : (
                      <>
                        {formState.image ? (
                          <div
                            value="delete"
                            className="removeFoodItemImgBtn shadow-md mt-2  text-lg md:text-base md:mt-4 lg:text-base"
                            onClick={() => {
                              setFormState({ ...formState, image: null });
                              setRemoveImage(true);
                            }}
                          >
                            Remove Image
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                </div>
              </div>
            </div>
            {loader ? (
              <div className="flex justify-center mt-1">
                <img className="w-12" src={spinner} alt="spinner" />
              </div>
            ) : (
              <div className="mt-2">
                <div className="flex justify-around pt-6 ">
                  <button
                    type="submit"
                    className="editFoodItemBtn shadow-md mt-2  text-lg md:text-xl md:mt-4 lg:text-xl"
                  >
                    Submit
                  </button>
                  <div
                    className="editFoodItemCancelBtn shadow-md mt-2 text-lg md:text-xl md:mt-4 lg:text-xl"
                    onClick={() => {
                      editItem();
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodItemForm;
