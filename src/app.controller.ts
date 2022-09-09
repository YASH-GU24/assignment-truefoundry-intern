import { Controller, Get, Query,Request, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //rendering home page
  @Get()
  @Render('index.ejs')
  async root() {
    return {}
  }

  // making route for "/api/auth/github" where we will recieve the code as query
  @Get("/api/auth/github")
  start_code(@Query() query: { code: string,path:string }): string{
    const code = query.code;
    this.appService.create_repo(code)
    return "Repository And Files Were Succesfully Added"
}
}
