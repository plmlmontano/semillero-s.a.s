import { config as dotenv } from "dotenv";
dotenv();

export const config = {
    MYSQL_ADDON_URI: process.env.MYSQL_ADDON_URI,
    PORT: process.env.PORT
};