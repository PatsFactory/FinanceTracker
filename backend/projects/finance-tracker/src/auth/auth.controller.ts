import { Body, Controller, HttpCode, HttpStatus, Logger, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { SignUpDto } from "./dto/signUp.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    public signIn(@Body() signInDto: SignInDto): Promise<unknown> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post("signUp")
    public signUp(@Body() signUpDto: SignUpDto, @Req() req: Request): Promise<unknown> {
        try {
            return this.authService.signUp(signUpDto.username, signUpDto.email, signUpDto.password);
        } catch (ex) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            Logger.error(ex, `AuthEndpoint SignUp Username: ${req["user"].username}`);
            throw ex;
        }
    }
}
