module.exports = mongoose => {


    
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },


    //   role: {
    //     type: String,
    //     enum: roles,
    //     default: 'user',
    //   },
    },
    {
      timestamps: true,
    }
  );

    userSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const user = mongoose.model("user", userSchema);
    return user;
};