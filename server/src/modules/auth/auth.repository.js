
const prisma = require('../../config/prismadatabase.js');
const { UserSchema } = require('../../models/auth/userSchema.js');
const pagination = require('../../utils/pagination.js');
const BaseRepository = require('../base/base.repository.js');
const moment = require("moment-timezone");


class AuthRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

   async createUser(payload) {
    const { name, email, phone, password } = payload;
    if (!name || !phone || !password) {
      throw new Error('name, phone and password are required');
    }
        const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password: password
      }
    });
    return newUser;
  }

  async getUser() {
    //  get all user postgreSQL prisma  rirect find 
    const user = await prisma.User.findMany({
    });
    return user;
  }
  async getUserById(id) {
    return await this.#model.findById(id).select('-password').exec();

  }
  async updateUserPassword(userId, password) {
    const user = await this.#model.findByIdAndUpdate(userId, { password }, { new: true });
    return user;
  }

  async getAuthByEmail(email) {
    return await this.#model.findOne({ email }).exec();
  }
  async setUserOTP(id, OTP) {
    const user = await this.#model.findByIdAndUpdate(id, { otp: OTP, otpTime: moment.tz("Asia/Dhaka").toDate() }, { new: true });
    return user;
  }
  async getAuthByPhone(phone) {
    return await this.#model.findOne({ phone }).exec();
  }

  async getAuthByEmailOrPhone(email, phone) {
    const query = { $or: [] };
    if (email) {
      query.$or.push({ email });
    }

    if (phone) {
      query.$or.push({ phone });
    }

    if (query.$or.length === 0) {
      return null;
    }

    const user = await this.#model.findOne(query).populate('roleRef').populate('warehouseRef').exec();
    return user;
  }


  async authUserSingUp(payload, session) {
    const { name, email, phone, password, roleRef , userId} = payload;
    const signingUpObject = {
      name,
      email,
      password,
      phone,
      roleRef,
      userId,
    }
    const user = await this.#model.create([signingUpObject], { session });

    return user;
  }

  async getAllUser(payload) {

    const users = await this.#model.find({
    }).sort({ createdAt: -1 }).select("-password -otp")

    return users

  }

  async createUserPayment(id, amount, session) {
    // findby id and update 
    const user = await this.#model.findByIdAndUpdate(id,
      {
        $inc: {
          receivedAmount: amount,
          amount: -amount
        },
      }, { new: true, session });

    return user;
  }


}

module.exports = new AuthRepository(UserSchema);

