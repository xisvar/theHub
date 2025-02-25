/* eslint-disable no-unused-vars */
/// The authorization routes.

const authModes = { 
    /**
     * Endpoint for signing up a user. Uses JWT
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
        "sign-up" : (req, res, next) => {

        },

    /**
     * Endpoint for signing in an existing user. Returns a 200 | Error. 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
        "sign-in" : (req, res, next) => {

        },
    
        /**
         * Endpoint for signing out a user.
         */
        "sign-out" : (req, res, next) => {
            
        }
};

export default authModes; 