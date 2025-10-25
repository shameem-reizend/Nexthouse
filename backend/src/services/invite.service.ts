import { AppDataSource } from "../config/data-source";
import { Invite } from "../entities/Invite.entity";
import { ApiError } from "../utils/apiError";

const inviteRepo = AppDataSource.getRepository(Invite);
export const createInvite = async (event, sender, reciever) => {
  // checking whether reciever is already invited for event
  const existinginvite = await inviteRepo.findOne({
    where: {
      event: { event_id: event.event_id },
      reciever: { user_id: reciever.user_id },
    },
    relations: ["event", "sender", "reciever"],
  });

  if (existinginvite) {
    throw new ApiError("This Receiver has already invited for this event", 409);
  }

  const invite = inviteRepo.create({
    event,
    sender,
    reciever,
  });

  return await inviteRepo.save(invite);
};

export const getAllInvites = async () => {
  return await inviteRepo.find();
};

export const getAllInvitesByEvent = async (event_id: string) => {
  const invites = await inviteRepo.find({
    where: {
      event: { event_id },
    },
  });
  return invites;
};

export const getUserInvites = async (user_id: string) => {
  if (!user_id) {
    throw new ApiError("the user id cannot be empty ");
  }
  const invites = await inviteRepo
    .createQueryBuilder("invite")
    .leftJoinAndSelect("invite.event", "event")
    .leftJoin("invite.sender", "sender")
    .leftJoin("invite.reciever","reciever")
    .addSelect(["sender.user_id", "sender.name"])
    .where("reciever.user_id=:user_id", { user_id })
    .getMany();
  return invites;
};
