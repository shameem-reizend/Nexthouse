import { AppDataSource } from "../config/data-source";
import { Invite } from "../entities/Invite.entity";

const inviteRepo = AppDataSource.getRepository(Invite);
export const createInvite = async (event, sender, reciever) => {
  const invite = await inviteRepo.create({
    event,
    sender,
    reciever,
  });
  return await inviteRepo.save(invite);
};
