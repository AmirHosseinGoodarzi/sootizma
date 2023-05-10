import { UserType } from "@/utils/types";
import usersList from "../data/users.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white p-10">
      <div className="relative isolate pt-56">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ســوتــیــزمـا
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              سامانه آنلاین و سراسری سوتی های کهکشان
            </p>
          </div>
        </div>
        <div className="container py-12">
          <ul
            role="list"
            className="grid gap-8 grid-cols-1 sm:grid-cols-3 md:grdi-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {usersList.map((user: UserType) => (
              <li
                key={user.id}
                className="p-5 rounded-md bg-gray-100 shadow-md transition-all cursor-pointer hover:shadow-lg"
              >
                <Link href={`/view/${user.id}`}>
                  <div className="flex items-center gap-x-6">
                    <img src="/user.svg" alt="user" className="w-12 h-12" />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">
                        {user.sootiesCount}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
