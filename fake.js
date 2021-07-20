const faker = require("faker/locale/fr")
const userModel = require("./models/userModel")
const voitureModel = require("./models/voitureModel")


const generateName = faker.name.findName
const generatePdp = faker.image.people
const generateEmail = faker.internet.email
const generateUserName = faker.internet.userName
const generateVoitureName = faker.vehicle.vehicle
const generateVoitureModel = faker.vehicle.model
const generateVoitureImage = faker.random.image
const generateComment = faker.lorem.words

// console.log(generatePdp())
// const rand = parseInt(Math.random(500, 1000) * 100000)

var Images = [
    '/images/voiture1.jpg',
    '/images/voiture2.png',
    '/images/voiture4.jpg',
    '/images/voiture5.png',
    '/images/voiture6.png',
    '/images/voiture7.jpg',
    '/images/voiture8.png',
    '/images/voiture9.png'
]


// const getAllUser = async (req,res) => {
//     try {
//         const users = await userModel.find().select("-password")
//         return res.status(201).json(users)
//     } catch (error) {
//         return res.stats(200).json(error)
//     }
// }

// console.log(getAllUser())
const UserExplode = async () => {
    for (let i = 0; i < 50; i++) {
        const pseudo = generateUserName()
        const email = generateEmail()
        const password = "123456789"
        const picture = generatePdp()

        try {
            const user = await userModel.create({ pseudo, email, password, picture })

            
            for (let j = 0; j < parseInt(Math.random(0, 10) * 10); j++) {
                const randonImage = faker.datatype.number({ min: 0, max: 6 })
                const image = Images[randonImage]
                const newVoiture = await new voitureModel({
                    name: generateVoitureName(),
                    types: generateVoitureModel(),
                    price: parseInt(Math.random(500, 1000) * 100000),
                    picture: image,
                    userId: user._id
                })

                userModel.findByIdAndUpdate(
                    user._id,
                    {
                        $addToSet: {
                            voiture: newVoiture._id
                        }
                    },
                    (err, docs) => {
                        if (err) return console.log(err)
                    }
                )

                await newVoiture.save();
            }
        } catch (error) {
            return console.log(error)
        }

    }
}

UserExplode();