import { Controller, Get, Headers, Res } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Get()
  async get(@Headers() headers: any, @Res() res: any) {
    const redirectUri = this.loginService.get(headers.host);
    res.status(302).redirect(redirectUri);
  }
}
