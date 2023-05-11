import { SootiType, UserType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import usersList from "../../data/users.json";
import sootiesList from "../../data/sooties.json";
import fs from "fs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  type bodyType = {
    user: string;
    text: string;
    purpose: string;
    newUser: string;
  };
  try {
    const { user, text, purpose, newUser }: bodyType = body;

    const allPrevUsers: UserType[] = [...usersList];
    let newUsersList: any = [];

    const allPrevSooties: { [key: string]: SootiType[] } = { ...sootiesList };
    let newSootiesList: { [key: string]: SootiType[] } = {};

    const newSooti = {
      sid: v4(),
      text: text,
      purpose: purpose,
      createDateTime: new Date().toLocaleDateString(),
    };

    if (user === "newUser") {
      const newUserId = v4();
      const newPerson = {
        id: newUserId,
        name: newUser,
        sootiesCount: 1,
      };
      newUsersList = [...allPrevUsers, newPerson];
      newSootiesList = {
        ...allPrevSooties,
        [newUserId]: [newSooti],
      };
    } else {
      if (!allPrevSooties[user])
        return NextResponse.json({
          status: false,
          message: "کاربر یافت نشد",
        });
      newUsersList = allPrevUsers.map((p) => {
        if (p.id === user) {
          p.sootiesCount += 1;
        }
        return p;
      });
      newSootiesList = {
        ...allPrevSooties,
        [user]: [...allPrevSooties[user], newSooti],
      };
    }
    fs.writeFileSync("data/users.json", JSON.stringify(newUsersList));
    fs.writeFileSync("data/sooties.json", JSON.stringify(newSootiesList));
    return NextResponse.json({
      status: true,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({
      status: false,
      message: "خطا در انجام عملیات. لطفا دوباره تلاش کنید.",
    });
  }
}
