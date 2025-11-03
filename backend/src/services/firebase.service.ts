import { AppDataSource } from "../config/data-source"
import { FirebaseToken } from "../entities/FirebaseToken.Entity"

const firebaseRepo = AppDataSource.getRepository(FirebaseToken)

export const findToken = async (fcm_token: string) => {
    return await firebaseRepo.findOneBy({ fcm_token })
}

export const createToken = async (user_id: string, fcm_token: string) => {
    const token = firebaseRepo.create({
        user: {user_id},
        fcm_token: fcm_token
    })

    return await firebaseRepo.save(token);
}

export const findTokenByUser = async (user_id: string) => {
    console.log(user_id)
    return firebaseRepo.findOneBy({user: {user_id}});
}

export const deleteToken = async (fcm_token: string) => {
    await firebaseRepo.delete({ fcm_token });
}

export const deleteTokenByUserId = async (user_id: string) => {
    await firebaseRepo.delete({user: {user_id}});
}