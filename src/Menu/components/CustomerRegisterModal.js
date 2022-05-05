import React, { useState } from "react";
import "./CustomerRegisterModal.css";
import { guestRegisterSchema } from "../../validations/GuestRegisterValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { guestRegister } from "../MenuActrions";
import { useDispatch } from "react-redux";
import { signin_guest } from "../../Actions/guestActions";
import spinner from "../../assests/spinner.gif";

const CustomerRegisterModal = ({ businessInfo, closeModal }) => {
  console.log(businessInfo);
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(guestRegisterSchema),
  });
  const setModalCookie = () => {
    document.cookie = "ModMenus_Register_modal_shown=true";
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoader(true);

    try {
      if (data) {
        let registerationData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          businessId: businessInfo.menuData.businessId,
        };
        let response = await guestRegister(registerationData);
        if (response) {
          console.log(response.guest);
          console.log(data.table);

          const guest = { ...response.guest, table: data.table };
          dispatch(signin_guest(guest));
          setModalCookie();
          setLoader(false);
          closeModal();
        }
      }
    } catch (err) {
      setLoader(false);
      setRegisterError(err.message);
      closeModal();
    }
  };
  return (
    <div className="customerRegisterModalWrapper flex justify-center">
      <div className="customerRegisterModalContent rounded w-full lg:w-3/12 h-max ml-4 mr-4 lg:m-0 ">
        {/* <div className="customerRegisterModalCloseBtn text-right">
          <i
            className="fa-solid fa-xmark mr-3 mt-3 cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          ></i>
        </div> */}
        <div className="customerRegisterModalTitle text-center mt-6 text-lg font-semibold">
          Guest Register
        </div>
        <div className="customerRegisterModalForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="customerRegisterModalLabelAndInputs p-8">
              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Your full name"
                {...register("name")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.name ? { display: "block" } : {}}
              >
                {errors.name?.message}
              </div>
              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline mt-5"
                id="phone"
                type="text"
                placeholder="Your number"
                {...register("phone")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.phone ? { display: "block" } : {}}
              >
                {errors.phone?.message}
              </div>
              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline mt-5"
                id="email"
                type="text"
                placeholder="Your Email"
                {...register("email")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.email ? { display: "block" } : {}}
              >
                {errors.email?.message}
              </div>

              <input
                className=" appearance-none border 
            rounded w-full py-2 px-3 text-gray-700 
            leading-tight focus:outline-none
             focus:shadow-outline mt-5"
                id="table"
                type="text"
                placeholder="Table number "
                {...register("table")}
              />
              <div
                className="invalid-feedback  text-red-500 text-xs px-2 pt-1"
                style={errors.table ? { display: "block" } : {}}
              >
                {errors.table?.message}
              </div>

              {loader ? (
                <div className="flex justify-center mt-1">
                  <img className="w-12" src={spinner} alt="spinner" />
                </div>
              ) : (
                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="customerRegisterModalRegisterBtn shadow-md mt-2  
           text-lg   md:text-xl md:mt-4  lg:text-xl"
                  >
                    Register and close
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterModal;
