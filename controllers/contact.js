const nodeMailer= require('nodemailer');
const sendGridTransport= require('nodemailer-sendgrid-transport');

const transporter=nodeMailer.createTransport(sendGridTransport({
auth:{
  api_key:'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'
}
}));



exports.getContactMessage=async (req, res, next)=>{
    res.render('contact', { req });
  }
exports.sendContactMessage=async(req,res,next)=>{
    try {
        const data =req.body;
        const {
            fullName,
            email,
            phoneNumber,
            subject,
            message
          } = data;
        
           res.redirect('/homepage');
           await transporter.sendMail({
            to:'majeddakkour@live.com',
            from:email,
            subject:`${fullName}`,
            html:`<h1>${subject,email,phoneNumber}</h1>
            <p>${message}</p>`
           });
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        }
};