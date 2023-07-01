// // import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
// // import  { createTransport } from 'nodemailer';
 
// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }

//   // login(req: any): string {

//   //   const username = 'STARTUPTECH';
//   //   const password = 'WEKICKASS';

//   //   if(!req.body.username){ 
//   //     throw new BadRequestException();
//   //   }

//   //   if (req.body.username == username && req.body.password == password) {
//   //     return 'You are now logged in';
//   //   }

//   //   throw new UnauthorizedException();

//   // }

//   // async email(file:any, req : any) : Promise<any>{
    
//   //   console.log('something');
//   //   console.log(file);
  
//   //   console.log(req.body.firstName);

//   //   if(!req.body){
//   //     throw new BadRequestException('There is no request');
//   //   }

    

//   //   const data = req.body;

//   //   const transporter = createTransport({
//   //     service: "gmail",
//   //     host: "smtp.gmail.com",
//   //     // secure: false, // true for 465, false for other ports
//   //     auth: {
//   //       user: 'schad9280@gmail.com', // email user
//   //       pass: 'goqioudrmjmkxcfz', // email password
//   //     },
//   //   });
//   //  await transporter.sendMail({
//   //     from: `${data.email}`, // sender address
//   //     to: "ermiyastsegabu@gmail.com", // list of receivers
//   //     subject: "Idea submission", // Subject line
//   //     text: "This ia an email", 
//   //     attachments: file,
//   //     html: "<b>The submitted form is as follows <br> ?</b><br>"+
//   //     "startupName"+ data.name + "<br>" +
//   //     "stageOfDevelopment" + data.stageOfDevelopment + "<br>" +
//   //     "headquarterLocation" + data.headquarterLocation + "<br>" +
//   //     "productCategory" + data.productCategories + "<br>" +
//   //     "primaryOffering" + data.primaryOffering + "<br>" +
//   //     "productDescription" + data.description + "<br>" +
//   //     "levelOfFunding" + data.currentLevelOfFunding + "<br>" +
//   //     "sourceOfFunding" + data.sourceOfFunding + "<br>" +
//   //     "webSiteURL" + data.webSiteURL + "<br>" +
//   //     "firstName" + data.firstName + "<br>" +
//   //     "lastName" + data.lastName + "<br>" +
//   //     "email" + data.email + "<br>" +
//   //     "phone" + data.phone + "<br>" +
//   //     "position" + data.position + "<br>" +
//   //     "immediateBusinessNeeds" + data.immediateBusinessNeeds + "<br>" +
//   //     "programmes" + data.progrmmes 
//   //     // html body
//   //   }, (error, info) => {
//   //     if(error){
//   //       console.log(error);
//   //       return 'Check your internet connection';
//   //     }else{
//   //       console.log(info);
//   //       return 'sent';
//   //     }
//   //   });
//   // console.log('did it work?');
//   // }
// }
