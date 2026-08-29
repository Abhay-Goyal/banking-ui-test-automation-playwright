import dotenv from "dotenv"
import path from "path"


if (process.env.CI !== "true") {
    dotenv.config({
        path: path.resolve(import.meta.dirname, "../.env/default")
    })
}

function getEnvValue(name : string) : string{
    const envValue = process.env[name]

    if(!envValue){
        throw new Error(`Missing environment property : ${name}`)
    }

    return envValue
}


export const projectConfig = {
    BASE_URL : getEnvValue("BASE_URL"),
    USERNAME  : getEnvValue("USERNAME"),
    PASSWORD : getEnvValue("PASSWORD")
}