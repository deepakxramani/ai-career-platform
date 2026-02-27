import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    create(data: any) {
        return this.userModel.create(data);
    }

    findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
}
