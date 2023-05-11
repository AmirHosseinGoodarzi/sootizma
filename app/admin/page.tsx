"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import usersList from "../../data/users.json";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const loginHandler = loginHandleSubmit((data) => {
    if (
      data.username.toLowerCase() === "admin" &&
      data.password.toLowerCase() === "kahkeshan@1234"
    ) {
      setIsAdmin(true);
      localStorage.setItem("sootAdmin", "true");
    } else {
      Swal.fire({
        icon: "error",
        text: "نام کاربری یا رمز عبور صحیح نمیباشد",
      });
    }
  });
  const submitSooti = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/submitNewSooti", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status) {
        Swal.fire({
          icon: "success",
          text: "سوتی مورد نظر با موفقیت ثبت گردید.",
          allowOutsideClick: false,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          text:
            result.message ?? "خطا در ثبت سوتی جدید. لطفا دوباره امتحان کنید.",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        text: "خطا در ثبت سوتی جدید. لطفا دوباره امتحان کنید.",
      });
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    const sootAdmin = localStorage.getItem("sootAdmin");
    if (sootAdmin && sootAdmin === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="grid place-items-center min-h-screen relative bg-white px-6 py-24 sm:py-32 lg:px-8">
      {loading && (
        <div className="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-80 z-20">
          <h1 className="text-white text-4xl">در حال بارگذاری اطلاعات ...</h1>
        </div>
      )}
      <Link href="/" className="button absolute top-5 left-5 !w-fit">
        بازگشت به خانه
      </Link>
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
              {watch("user") === "newUser" ? (
                <div className="w-full">
                  <label className="input_label">سوتی دهنده</label>
                  <div className="flex gap-4 mt-2.5">
                    <input
                      {...register("newUser", { required: true })}
                      className="input_text"
                    />
                    <button
                      className="button !w-fit whitespace-nowrap"
                      onClick={() => {
                        setValue("user", "");
                      }}
                    >
                      &larr; بازگشت به لیست کاربران
                    </button>
                  </div>
                  {errors.newUser && (
                    <p className="error_message">
                      نام سوتی دهنده جدید نمیتواند خالی باشد
                    </p>
                  )}
                </div>
              ) : (
                <div className="w-full md:w-1/2">
                  <label className="input_label">سوتی دهنده</label>
                  <div className="mt-2.5">
                    <select
                      {...register("user", { required: true })}
                      className="input_text"
                    >
                      <option value="">-------</option>
                      <option value="newUser">افزودن کاربر جدید +</option>
                      {usersList.map((user) => (
                        <option value={user.id} key={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.user && (
                    <p className="error_message">
                      کاربر سوتی دهنده را انتخاب کنید
                    </p>
                  )}
                </div>
              )}

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
