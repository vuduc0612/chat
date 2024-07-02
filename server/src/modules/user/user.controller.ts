import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserInterceptor } from './interceptor/user.interceptor';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { GetUser } from './decorator/user.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    getMe(@GetUser('') user: User) {
        //console.log(user);
        return user;
    }
    @Get(':id')
    async getUser(@Param('id') id: string) {
        console.log('Fetching user with id: ', id);
        return this.userService.getUserById(Number(id));
    }
    @UseInterceptors(UserInterceptor, CacheInterceptor)
    @Get('all')
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
