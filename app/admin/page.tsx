"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginHandler = loginHandleSubmit((data) => {
    if (
      data.username.toLowerCase() === "admin" &&
      data.password.toLowerCase() === "kahkeshan@1234"
    ) {
      setIsAdmin(true);
    } else {
      Swal.fire({
        icon: "error",
        text: "نام کاربری یا رمز عبور صحیح نمیباشد",
      });
    }
  });
  const submitSooti = handleSubmit((data) => {
    console.log({ data });
  });
  return (
    <div className="grid place-items-center min-h-screen relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {isAdmin ? (
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              سوتی جدید
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              اطلاعات سوتی جدید را در فرم زیر وارد نمایید.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <div className="flex flex-col gap-6">
              <div className="w-full md:w-1/2">
                <label className="input_label">سوتی دهنده</label>
                <div className="mt-2.5">
                  <select
                    {...register("user", { required: true })}
                    className="input_text"
                  >
                    <option value="">-------</option>
                    <option>کاربر تستی</option>
                    <option>کاربر تستی</option>
                    <option>کاربر تستی</option>
                    <option>کاربر تستی</option>
                    <option>کاربر تستی</option>
                  </select>
                </div>
                {errors.user && (
                  <p className="error_message">
                    کاربر سوتی دهنده را انتخاب کنید
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="input_label">متن سوتی</label>
                <div className="mt-2.5">
                  <input
                    {...register("text", { required: true })}
                    className="input_text"
                  />
                </div>
                {errors.text && (
                  <p className="error_message">متن سوتی نمیتواند خالی باشد</p>
                )}
              </div>
              <div className="w-full">
                <label className="input_label">هدف؟</label>
                <div className="mt-2.5">
                  <input
                    {...register("purpose", { required: true })}
                    className="input_text"
                  />
                  {errors.purpose && (
                    <p className="error_message">هدف نمیتواند خالی باشد</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button className="button" onClick={submitSooti}>
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ورود ادمین
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              برای ثبت سوتی جدید ابتدا وارد شوید.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mx-auto mt-8 max-w-xl">
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <div className="w-full md:w-1/2">
                <label className="input_label">نام کاربری</label>
                <div className="mt-2.5">
                  <input
                    className="input_text"
                    {...loginRegister("username", { required: true })}
                  />
                </div>
                {loginErrors.username && (
                  <p className="error_message">نام کاربری نمیتواند خالی باشد</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="input_label">رمز عبور</label>
                <div className="mt-2.5">
                  <input
                    className="input_text"
                    type="password"
                    {...loginRegister("password", { required: true })}
                  />
                </div>
                {loginErrors.password && (
                  <p className="error_message">رمز عبور نمیتواند خالی باشد</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 max-auto mt-10">
              <button className="button" onClick={loginHandler}>
                ورود
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
