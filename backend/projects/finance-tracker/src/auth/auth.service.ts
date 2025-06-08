import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Utils } from "src/shared/utils";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    public async signIn(email: string, password: string): Promise<unknown> {
        const user = await this.usersService.findOne(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await Utils.comparePassword(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, email: user.email, sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    public async signUp(username: string, email: string, pass: string): Promise<unknown> {
        const user = await this.usersService.findOne(username);
        if (user) {
            throw new ConflictException("Username already exists");
        }
        if (username.replace(/\s/g, "").length === 0) {
            throw new BadRequestException("Username must not be empty");
        }
        if (username.length > 50) {
            throw new BadRequestException("Username must not be longer than 50 characters");
        }
        if (pass.length < 8 || RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/).test(pass) === false) {
            throw new BadRequestException(
                `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase
                 letter and one number or special character`
            );
        }
        const createdUser = await this.usersService.create(username, email, pass);
        const payload = { username: createdUser.username, sub: createdUser.id };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
