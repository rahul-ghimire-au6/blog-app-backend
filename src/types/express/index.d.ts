import {UserModel} from '../../helper/authToken'

declare global {
    namespace Express {
        interface Request {
            currentUser: UserModel
        }
    }
}