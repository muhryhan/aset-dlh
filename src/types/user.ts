interface UserData {
  id: number;
  username: string;
  password: string;
  role: "admin" | "superadmin";
}

export const users: UserData[] = [
  {
    id: 1,
    username: "uusaamaa",
    password: "$2b$10$xDfJ0KFXpWADElmXgl0CkeUqnyFnGRTGIypOOEAYn45wlbybPTlfi",
    role: "admin",
  },
  {
    id: 2,
    username: "admin",
    password: "$2b$10$cjl2KbxfR.xZKeTO2QoT/edHEpnTAEWqhO2yEFergdfDbl/wr5fPm",
    role: "superadmin",
  },
];
