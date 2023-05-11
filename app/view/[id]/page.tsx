"use client";
import usersList from "../../../data/users.json";
import sootiesData from "../../../data/sooties.json";
import { SootiType, UserType } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function SootiesList({ params }: { params: { id: keyof typeof sootiesData } }) {
  const router = useRouter();
  if (!params.id) return router.push("/");
  const user = usersList.find((user: UserType) => user.id === params.id);
  if (!user) return router.push("/");
  const sooti_list: SootiType[] = sootiesData[params.id] ?? [];
  if (!sooti_list) return router.push("/");
  return (
    <div className="container p-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold lg:text-4xl text-gray-900">
          {user.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            لیست همه سوتی ها -{" "}
            <span>
              تعداد کل: <b>{user.sootiesCount}</b>
            </span>
          </p>
          <button className="button !w-fit" onClick={() => router.push("/")}>
            &rarr; بازگشت به لیست{" "}
          </button>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        {sooti_list.length > 0 ? (
          <dl className="divide-y divide-gray-100">
            {sooti_list.map((item, index) => {
              return (
                <div
                  key={item.sid}
                  className="px-4 py-6 flex flex-col md:flex-row items-center gap-16"
                >
                  <dt className="text-base lg:text-lg font-bold text-black">
                    {index + 1}- {item.text}
                  </dt>
                  <dd className="mt-1 text-base lg:text-lg  text-gray-700 sm:col-span-2 sm:mt-0">
                    {item.purpose}
                  </dd>
                  <dd className="mt-1 text-base text-gray-400 sm:col-span-2 sm:mt-0">
                    {item.createDateTime}
                  </dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p className="my-20 text-gray-400 text-center text-2xl">
            لیست سوتی های {user.name} خالی میباشد.
          </p>
        )}
      </div>
    </div>
  );
}
