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
  async start_code(@Query() query: { code: string,path:string }): Promise<string> {
    const code = query.code;
      let data=await this.appService.create_repo(code).then(data=>{
        return "Repository And Files Succesfully Created!"
      })
      .catch(error=>{
        return "Error in Creating Repository, Maybe There is already an repository existing with that name"
      })
      return data;
      // return "Repository And Files Were Succesfully Added"
}
}
