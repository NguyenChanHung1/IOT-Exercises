import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    findAll() {
        return this.userModel.find().exec();
    }

    create(data: UserDto) {
        return this.userModel.create(data);
    }

    update(id: string, data: UserDto) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true });
    }

    delete(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}
