import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    fakeUser = [{
        id: 1,
        name: "Paul",
        password: "123456789"
    }]

    constructor(
        private jwtSerive: JwtService
    ) {

    }
    validateUser({ username, password }: AuthUserDto) {
        const findUser = this.fakeUser.find((user) => user.name === username)
        if (!findUser) {
            Logger.warn("Unknown user")
            return null
        }
        else {
            if (findUser.password === password) {
                const { password, ...user } = findUser
                return this.jwtSerive.sign(user)
            }
        }

    }

}
