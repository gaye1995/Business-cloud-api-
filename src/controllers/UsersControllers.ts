export class UsersControllers {
    
    static register = async(req: any, res: any) => {
        console.log('rtty');

        // const email : any = req.body.email;
        // const username : any = req.body.username;
        // const password : any = req.body.password;
        // const confirm : any = req.body.confirm;

        //  if (confirm !== password) {
             console.log('rtty');
            res.status(400).json({ error: 'Les mots de passe ne sont pas identiques' });
//   }
    }
}