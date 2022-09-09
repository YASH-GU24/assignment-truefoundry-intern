import { Injectable } from '@nestjs/common';
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const sqlite3 = require("sqlite3").verbose();


//Please Enter Your Credentials Here
let CLIENT_ID = "<Client Id>";
let CLIENT_SECRET = "<Client Secret>";


//connecting to sql database
const db = new sqlite3.Database('./files.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("database successfully accessed!")
  }
})

@Injectable()
export class AppService {

  async create_repo(code) {

    //checking if code is passed or not, If not passed throwing error
    if (!code) {
      throw new Error("No code!");
    }

    //authorizing user with code recieved
    const auth = createOAuthAppAuth({
      clientType: "oauth-app",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });
    const userAuthenticationFromWebFlow = await auth({
      type: "oauth-user",
      code: code,
    })
    const octokit = new Octokit({
      auth: userAuthenticationFromWebFlow.token,
    });

    //Getting Information of the user
    const { data } = await octokit.request("/user");
    //Making repository with name "truefoundry_assignment"
    await octokit.rest.repos.createForAuthenticatedUser({
      name: "truefoundry_assignment",
    }).then(({ data }) => {
      return data
    })

    //Fetching all files from database
    let sql = `SELECT * FROM files`
    db.all(sql, [], (err, res) => {
      if (err) {
        console.log(err)
      }
      else {
        async function add_data(res) {
          for (const file of res) {
            const contents = await add_file(file)
            console.log(contents);
          }
        }
        //Adding each file in database to Github Repository
        add_data(res)
      }
    })

    //Function to add specific file object to repository  
    async function add_file(file) {
      let res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: data.login,
        repo: "truefoundry_assignment",
        path: file.file_name,
        message: "commited",
        content: Base64.encode(file.file_content),
        committer: {
          name: data.login,
          email: "yashgupta0524@gmail.com",
        },
        author: {
          name: data.login,
          email: "yashgupta0524@gmail.com",
        },
      }).then(data => {
        return data
      })
      return res;
    }
  }


}


