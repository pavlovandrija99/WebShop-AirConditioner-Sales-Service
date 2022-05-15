import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { getRoleByIDFromDB } from '../services/roleService.js'

const protectRoute = asyncHandler(async(req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_STRING);

            req.user = await userModel.findById(decodedToken.id);

            let userRole = await getRoleByIDFromDB(req.user.role.valueOf());

            if(userRole.roleName === "Admin") {
                next();
            }  else if(userRole.roleName === "Customer" && (req.method === "GET" || req.method === "POST")) {
                next();
            }
            else {
                res.status(403).json({ message: "Not authorized to execute this action! Only Admins can execute given action."});
            }

        } catch (error){
            console.log(error);
            res.status(401);
            throw new Error('Token verification failed! Token value might be manipulated!');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized! No token provided!');
    }

})

export { protectRoute };