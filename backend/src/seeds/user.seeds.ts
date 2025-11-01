import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User.entity";
import * as bcrypt from "bcryptjs";

async function seedUsers(){
    await AppDataSource.initialize();
    console.log("Db connected ");
    
    const userRepo = AppDataSource.getRepository(User);

    const users = [];

    for(let i=1; i<=10; i++){
        const user = new User();
        user.name = `User${i}`;
        user.email= `user${i}@gmail.com`;
        user.password= await bcrypt.hash("password123",10);
        user.phone_number = `98765432${i.toString().padStart(2,"0")}`;
        user.role= UserRole.USER;

        users.push(user);
    }

    await userRepo.save(users);
    console.log("10 users seeded successfully");

}

seedUsers().catch((err) => {
    console.error("Error in seeding the users",err)
    process.exit(1);
});