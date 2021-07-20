const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            unique: true,
            trim: true
        },
        picture: {
            type: String,
            default: "/images/pdp.jpg"
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        comments: {
            type: [
                {
                    postId: String,
                    commentId: String
                }
            ]
        },
        voiture: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

// userSchema.pre("save", async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })

userSchema.statics.login = async (email, password) => {
    const user = await userModel.findOne({ email });
    if (user) {
        const passwordVerified = await user.password === password
        if (passwordVerified)
            return user
        else
            return null
    } else {
        return null
    }

}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel